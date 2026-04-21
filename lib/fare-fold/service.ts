import { Duffel } from '@duffel/api'
import { mockDb } from './mock-db'
import { db } from '@/database'
import * as schema from '@/database/schema'
import { eq } from 'drizzle-orm'

const duffel = process.env.DUFFEL_ACCESS_TOKEN
  ? new Duffel({ token: process.env.DUFFEL_ACCESS_TOKEN })
  : null

const MOCK_AIRPORTS = [
  { iataCode: 'LHR', name: 'Heathrow Airport', address: { cityName: 'London', countryName: 'United Kingdom' } },
  { iataCode: 'LGW', name: 'Gatwick Airport', address: { cityName: 'London', countryName: 'United Kingdom' } },
  { iataCode: 'JFK', name: 'John F. Kennedy International Airport', address: { cityName: 'New York', countryName: 'United States' } },
  { iataCode: 'EWR', name: 'Newark Liberty International Airport', address: { cityName: 'New York', countryName: 'United States' } },
  { iataCode: 'CDG', name: 'Charles de Gaulle Airport', address: { cityName: 'Paris', countryName: 'France' } },
  { iataCode: 'DXB', name: 'Dubai International Airport', address: { cityName: 'Dubai', countryName: 'United Arab Emirates' } },
  { iataCode: 'SIN', name: 'Singapore Changi Airport', address: { cityName: 'Singapore', countryName: 'Singapore' } },
  { iataCode: 'SFO', name: 'San Francisco International Airport', address: { cityName: 'San Francisco', countryName: 'United States' } },
  { iataCode: 'LAX', name: 'Los Angeles International Airport', address: { cityName: 'Los Angeles', countryName: 'United States' } },
  { iataCode: 'DEL', name: 'Indira Gandhi International Airport', address: { cityName: 'Delhi', countryName: 'India' } },
  { iataCode: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', address: { cityName: 'Mumbai', countryName: 'India' } },
  { iataCode: 'BLR', name: 'Kempegowda International Airport', address: { cityName: 'Bengaluru', countryName: 'India' } },
]

export async function searchAirports(keyword: string) {
  const cleanKeyword = keyword.toLowerCase().trim()
  if (duffel) {
    try {
      const searchTerm = keyword.includes(' - ') ? keyword.split(' - ')[0] : keyword
      const response = await duffel.suggestions.list({ query: searchTerm })
      if (response && response.data && response.data.length > 0) {
        const mapped = response.data
          .map((place: any) => ({
            iataCode: place.iata_code || place.iata_city_code || place.id,
            name: place.name,
            address: { cityName: place.city_name || place.name, countryName: place.country_name || '' },
          }))
          .filter((a: any) => a.iataCode && a.iataCode.length === 3)
        return Array.from(new Map(mapped.map((item) => [item.iataCode, item])).values())
      }
    } catch (error) {
      console.warn(`[Duffel] Airport search failed, using mocks`)
    }
  }
  return MOCK_AIRPORTS.filter(a => 
    a.name.toLowerCase().includes(cleanKeyword) || 
    a.iataCode.toLowerCase().includes(cleanKeyword)
  )
}

export async function searchAndBookFlight(flightRequest: any) {
  if (duffel) {
    try {
      const response = await duffel.offerRequests.create({
        slices: [{ origin: flightRequest.origin, destination: flightRequest.destination, departure_date: flightRequest.departureDate }],
        passengers: [{ type: 'adult' }],
        cabin_class: 'economy',
        return_offers: true,
      })
      if (response.data?.offers?.length > 0) {
        const bestOffer = response.data.offers[0]
        return {
          success: true,
          bookingId: `ff-duffel-${bestOffer.id}`,
          flightOffer: {
            price: { total: bestOffer.total_amount, currency: bestOffer.total_currency },
            itineraries: bestOffer.slices.map((s: any) => ({
              duration: s.duration,
              segments: s.segments.map((seg: any) => ({
                carrierCode: seg.operating_carrier?.iata_code || seg.marketing_carrier?.iata_code || '??',
                number: seg.operating_carrier_flight_number || seg.marketing_carrier_flight_number || '000',
              })),
            })),
          },
        }
      }
    } catch (error) {
      console.warn(`[Duffel] Flight search failed, using mocks`)
    }
  }
  return await getMockFlight()
}

async function getMockFlight() {
  const mockPrice = (Math.random() * 500 + 200).toFixed(2)
  return {
    success: true,
    bookingId: `mock-booking-${Math.random().toString(36).substring(2, 9)}`,
    flightOffer: {
      price: { total: mockPrice, currency: 'USD' },
      itineraries: [{ duration: 'PT5H30M', segments: [{ carrierCode: 'AA', number: '123' }] }],
    },
  }
}

export async function rebookFlight(trackedFlightId: string, currentBookingId: string, newPrice: string) {
  console.log(`[Rebooking] Starting rebook for ${trackedFlightId}. New price: ${newPrice}`)
  
  try {
    // 1. Update in SQL
    await db.update(schema.flightBooking)
      .set({ status: 'replaced' })
      .where(eq(schema.flightBooking.id, currentBookingId))

    const newBooking = await db.insert(schema.flightBooking).values({
      trackedFlightId,
      airline: 'AA',
      flightNumber: '123',
      price: newPrice,
      currency: 'USD',
      status: 'active',
    }).returning()

    await db.update(schema.trackedFlight)
      .set({ status: 'rebooked', updatedAt: new Date() })
      .where(eq(schema.trackedFlight.id, trackedFlightId))

    await db.insert(schema.priceHistory).values({
      trackedFlightId,
      price: newPrice,
      currency: 'USD',
    })

    console.log(`[Rebooking] SQL update successful`)
    return { success: true, booking: newBooking[0] }
  } catch (dbError) {
    console.warn('[Rebooking] SQL failed, falling back to mock storage')
    
    // Fallback to mock
    await mockDb.bookings.update(currentBookingId, { status: 'cancelled' })
    const newBooking = await mockDb.bookings.insert({
      trackedFlightId,
      airline: 'AA',
      flightNumber: '123',
      price: newPrice,
      currency: 'USD',
      status: 'active',
    })
    await mockDb.trackedFlights.update(trackedFlightId, { 
      status: 'rebooked',
      updatedAt: new Date().toISOString() 
    })
    await mockDb.prices.insert({
      trackedFlightId,
      price: newPrice,
      currency: 'USD',
    })
    return { success: true, booking: newBooking }
  }
}

export function startPriceSimulator(trackedFlightId: string, initialPrice: string) {
  console.log(`[Simulator] Starting simulator for flight ${trackedFlightId}`)
  
  // Record initial price immediately
  try {
    db.insert(schema.priceHistory).values({
      trackedFlightId,
      price: initialPrice,
      currency: 'USD',
    })
  } catch (err) {
    mockDb.prices.insert({ trackedFlightId, price: initialPrice, currency: 'USD' })
  }

  // Simulate a price drop after 10-20 seconds
  setTimeout(async () => {
    // Logic remains same, but evaluateRebookingOpportunity now handles DB/Mock selection
    const dropPercent = Math.random() * 0.2 + 0.1
    const newPrice = (parseFloat(initialPrice) * (1 - dropPercent)).toFixed(2)
    
    console.log(`[Simulator] Simulated Price Drop: ${newPrice}`)
    // This is just a trigger; the real rebooking would happen via an agent check or user action
  }, 15000)
}
