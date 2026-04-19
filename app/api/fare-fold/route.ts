import { NextResponse } from 'next/server'
import { searchAndBookFlight } from '@/lib/fare-fold/service'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Fare-Fold API received request:', body)

    const { origin, destination, departureDate } = body;

    if (!origin || !destination || !departureDate) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 })
    }

    const result = await searchAndBookFlight({ origin, destination, departureDate })

    if (result.success) {
      return NextResponse.json({ message: 'Flight booked successfully', bookingId: result.bookingId, flightOffer: result.flightOffer })
    } else {
      return NextResponse.json({ message: 'Failed to book flight', error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in Fare-Fold API:', error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}
