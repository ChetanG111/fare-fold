import { mockDb } from './mock-db'
import { rebookFlight } from './service'
import { db } from '@/database'
import * as schema from '@/database/schema'
import { eq } from 'drizzle-orm'

export interface RebookingThreshold {
  minSavings: number // USD
  minSavingsPercent: number // 0.05 = 5%
}

const DEFAULT_THRESHOLD: RebookingThreshold = {
  minSavings: 20,
  minSavingsPercent: 0.05
}

/**
 * The Fare-Fold Agent evaluates whether a price drop is worth a rebooking.
 */
export async function evaluateRebookingOpportunity(
  trackedFlightId: string, 
  newPrice: string,
  threshold: RebookingThreshold = DEFAULT_THRESHOLD
) {
  // Try real DB first
  let flight: any;
  let activeBooking: any;

  try {
    flight = await db.query.trackedFlight.findFirst({
      where: (table: any, { eq }: any) => eq(table.id, trackedFlightId),
      with: {
        bookings: true
      }
    });

    if (flight) {
      activeBooking = flight.bookings.find((b: any) => b.status === 'active');
    }
  } catch (err) {
    console.warn('[Agent] DB failed, falling back to mock storage for evaluation');
    flight = await mockDb.trackedFlights.findById(trackedFlightId);
    if (flight) {
      const userFlights = await mockDb.trackedFlights.findMany(flight.userId);
      const trackedFlightWithBookings = userFlights.find(f => f.id === trackedFlightId);
      activeBooking = trackedFlightWithBookings?.bookings.find((b: any) => b.status === 'active');
    }
  }

  if (!flight) return { shouldRebook: false, reason: 'Flight not found' };
  if (!activeBooking) return { shouldRebook: false, reason: 'No active booking found' };

  const currentPrice = parseFloat(activeBooking.price);
  const proposedPrice = parseFloat(newPrice);
  const savings = currentPrice - proposedPrice;
  const savingsPercent = savings / currentPrice;

  console.log(`[Agent] Evaluating: Current ${currentPrice}, Proposed ${proposedPrice}, Savings ${savings.toFixed(2)} (${(savingsPercent * 100).toFixed(1)}%)`);

  if (savings >= threshold.minSavings && savingsPercent >= threshold.minSavingsPercent) {
    return { 
      shouldRebook: true, 
      reason: `Savings of $${savings.toFixed(2)} meets threshold.`,
      savings,
      activeBookingId: activeBooking.id
    };
  }

  return { 
    shouldRebook: false, 
    reason: `Savings of $${savings.toFixed(2)} (${(savingsPercent * 100).toFixed(1)}%) is below threshold ($${threshold.minSavings} / ${(threshold.minSavingsPercent * 100).toFixed(1)}%).` 
  };
}

/**
 * Triggers an agent-led rebooking if thresholds are met.
 */
export async function runAgentRecheck(trackedFlightId: string, simulatedPrice?: string) {
  let priceToCheck = simulatedPrice;
  
  if (!priceToCheck) {
    // Try to get history from real DB or mock
    try {
      const history = await db.query.priceHistory.findMany({
        where: (table: any, { eq }: any) => eq(table.trackedFlightId, trackedFlightId),
        orderBy: (table: any, { desc }: any) => [desc(table.checkedAt)],
        limit: 1
      });
      const lastPrice = history.length > 0 ? parseFloat(history[0].price) : 500;
      const movement = (Math.random() * 0.1 - 0.05);
      priceToCheck = (lastPrice * (1 + movement)).toFixed(2);
    } catch (err) {
      const history = await mockDb.prices.findMany(trackedFlightId);
      const lastPrice = history.length > 0 ? parseFloat(history[history.length - 1].price) : 500;
      const movement = (Math.random() * 0.1 - 0.05);
      priceToCheck = (lastPrice * (1 + movement)).toFixed(2);
    }
  }

  const evaluation = await evaluateRebookingOpportunity(trackedFlightId, priceToCheck);

  if (evaluation.shouldRebook && evaluation.activeBookingId) {
    console.log(`[Agent] ACTION: Rebooking flight ${trackedFlightId}`);
    return await rebookFlight(trackedFlightId, evaluation.activeBookingId, priceToCheck);
  } else {
    console.log(`[Agent] PASS: ${evaluation.reason}`);
    
    // Still record the price in history (try real, fallback to mock)
    try {
      await db.insert(schema.priceHistory).values({
        trackedFlightId,
        price: priceToCheck,
        currency: 'USD',
      });
    } catch (err) {
      await mockDb.prices.insert({
        trackedFlightId,
        price: priceToCheck,
        currency: 'USD',
      });
    }
    
    return { success: false, reason: evaluation.reason };
  }
}
