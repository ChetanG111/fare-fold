import { mockDb } from './mock-db'
import { rebookFlight } from './service'

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
 * It considers rebooking fees (simulated as 0 for now) and user thresholds.
 */
export async function evaluateRebookingOpportunity(
  trackedFlightId: string, 
  newPrice: string,
  threshold: RebookingThreshold = DEFAULT_THRESHOLD
) {
  const flight = await mockDb.trackedFlights.findById(trackedFlightId)
  if (!flight) return { shouldRebook: false, reason: 'Flight not found' }

  // Get current active booking
  const userFlights = await mockDb.trackedFlights.findMany(flight.userId)
  const trackedFlightWithBookings = userFlights.find(f => f.id === trackedFlightId)
  const activeBooking = trackedFlightWithBookings?.bookings.find((b: any) => b.status === 'active')

  if (!activeBooking) return { shouldRebook: false, reason: 'No active booking found' }

  const currentPrice = parseFloat(activeBooking.price)
  const proposedPrice = parseFloat(newPrice)
  const savings = currentPrice - proposedPrice
  const savingsPercent = savings / currentPrice

  console.log(`[Agent] Evaluating: Current ${currentPrice}, Proposed ${proposedPrice}, Savings ${savings.toFixed(2)} (${(savingsPercent * 100).toFixed(1)}%)`)

  if (savings >= threshold.minSavings && savingsPercent >= threshold.minSavingsPercent) {
    return { 
      shouldRebook: true, 
      reason: `Savings of $${savings.toFixed(2)} meets threshold.`,
      savings,
      activeBookingId: activeBooking.id
    }
  }

  return { 
    shouldRebook: false, 
    reason: `Savings of $${savings.toFixed(2)} (${(savingsPercent * 100).toFixed(1)}%) is below threshold ($${threshold.minSavings} / ${(threshold.minSavingsPercent * 100).toFixed(1)}%).` 
  }
}

/**
 * Triggers an agent-led rebooking if thresholds are met.
 */
export async function runAgentRecheck(trackedFlightId: string, simulatedPrice?: string) {
  // If no simulated price, generate a random one (simulated check)
  let priceToCheck = simulatedPrice
  if (!priceToCheck) {
    const history = await mockDb.prices.findMany(trackedFlightId)
    const lastPrice = history.length > 0 ? parseFloat(history[history.length - 1].price) : 500
    // Simulate a random price movement
    const movement = (Math.random() * 0.1 - 0.05) // -5% to +5%
    priceToCheck = (lastPrice * (1 + movement)).toFixed(2)
  }

  const evaluation = await evaluateRebookingOpportunity(trackedFlightId, priceToCheck)

  if (evaluation.shouldRebook && evaluation.activeBookingId) {
    console.log(`[Agent] ACTION: Rebooking flight ${trackedFlightId}`)
    return await rebookFlight(trackedFlightId, evaluation.activeBookingId, priceToCheck)
  } else {
    console.log(`[Agent] PASS: ${evaluation.reason}`)
    // Still record the price in history even if we don't rebook
    await mockDb.prices.insert({
      trackedFlightId,
      price: priceToCheck,
      currency: 'USD',
    })
    return { success: false, reason: evaluation.reason }
  }
}
