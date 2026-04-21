import { NextResponse } from 'next/server'
import { db } from '@/database'
import * as schema from '@/database/schema'
import { searchAndBookFlight, startPriceSimulator } from '@/lib/fare-fold/service'
import { mockDb } from '@/lib/fare-fold/mock-db'
import { getUnifiedSession } from '@/lib/auth/unified-session'

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

export async function POST(request: Request) {
  try {
    const session = await getUnifiedSession()

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { origin, destination, departureDate } = body;

    if (!origin || !destination || !departureDate) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 })
    }

    const result = await searchAndBookFlight({ origin, destination, departureDate })

    if (result.success) {
      // Save to database (try real, fallback to mock)
      try {
        const [newTrackedFlight] = await db.insert(schema.trackedFlight).values({
          userId: session.user.id,
          origin,
          destination,
          departureDate: new Date(departureDate),
          status: 'tracking',
        }).returning();

        if (result.flightOffer) {
          await db.insert(schema.flightBooking).values({
            trackedFlightId: newTrackedFlight.id,
            airline: result.flightOffer.itineraries[0].segments[0].carrierCode,
            flightNumber: result.flightOffer.itineraries[0].segments[0].number,
            price: result.flightOffer.price.total,
            currency: result.flightOffer.price.currency,
            status: 'active',
          });
        }

        // Start Price Simulator for the demo
        startPriceSimulator(newTrackedFlight.id, result.flightOffer.price.total)

        return NextResponse.json({ 
          message: 'Flight tracked successfully', 
          bookingId: result.bookingId, 
          flightOffer: result.flightOffer,
          trackedFlightId: newTrackedFlight.id
        })
      } catch (dbError) {
        console.warn('Database failed, using mock storage:', dbError)
        const [newTrackedFlight] = await mockDb.trackedFlights.insert({
          userId: session.user.id,
          origin,
          destination,
          departureDate: new Date(departureDate).toISOString(),
          status: 'tracking',
        });

        if (result.flightOffer) {
          await mockDb.bookings.insert({
            trackedFlightId: newTrackedFlight.id,
            airline: result.flightOffer.itineraries[0].segments[0].carrierCode,
            flightNumber: result.flightOffer.itineraries[0].segments[0].number,
            price: result.flightOffer.price.total,
            currency: result.flightOffer.price.currency,
            status: 'active',
          });

          // Start Price Simulator for the demo
          startPriceSimulator(newTrackedFlight.id, result.flightOffer.price.total)
        }

        return NextResponse.json({ 
          message: 'Flight tracked successfully (Mock)', 
          bookingId: result.bookingId, 
          flightOffer: result.flightOffer,
          trackedFlightId: newTrackedFlight.id
        })
      }
    } else {
      return NextResponse.json({ message: 'Failed to find/book flight', error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in Fare-Fold API:', error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getUnifiedSession()

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Try real DB first, fallback to Mock
    try {
      const trackedFlights = await db.query.trackedFlight.findMany({
        where: (table, { eq }) => eq(table.userId, session.user.id),
        with: {
          bookings: {
            where: (table, { eq }) => eq(table.status, 'active'),
          },
        },
        orderBy: (table, { desc }) => [desc(table.createdAt)],
      });

      return NextResponse.json({ trackedFlights });
    } catch (dbError) {
      console.warn('Database failed, fetching from mock storage')
      const trackedFlights = await mockDb.trackedFlights.findMany(session.user.id);
      return NextResponse.json({ trackedFlights });
    }
  } catch (error) {
    console.error('Error fetching tracked flights:', error);
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
