import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'
import { db } from '@/database'
import * as schema from '@/database/schema'
import { searchAndBookFlight } from '@/lib/fare-fold/service'

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

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
      // Save to database
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

      return NextResponse.json({ 
        message: 'Flight tracked successfully', 
        bookingId: result.bookingId, 
        flightOffer: result.flightOffer,
        trackedFlightId: newTrackedFlight.id
      })
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
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

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
  } catch (error) {
    console.error('Error fetching tracked flights:', error);
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
