import { Duffel } from '@duffel/api'
import { mockDb } from './mock-db'

const duffel = process.env.DUFFEL_ACCESS_TOKEN
  ? new Duffel({ token: process.env.DUFFEL_ACCESS_TOKEN })
  : null

const MOCK_AIRPORTS = [
  {
    iataCode: 'LHR',
    name: 'Heathrow Airport',
    address: { cityName: 'London', countryName: 'United Kingdom' },
  },
  {
    iataCode: 'LGW',
    name: 'Gatwick Airport',
    address: { cityName: 'London', countryName: 'United Kingdom' },
  },
  {
    iataCode: 'JFK',
    name: 'John F. Kennedy International Airport',
    address: { cityName: 'New York', countryName: 'United States' },
  },
  {
    iataCode: 'EWR',
    name: 'Newark Liberty International Airport',
    address: { cityName: 'New York', countryName: 'United States' },
  },
  {
    iataCode: 'CDG',
    name: 'Charles de Gaulle Airport',
    address: { cityName: 'Paris', countryName: 'France' },
  },
  {
    iataCode: 'DXB',
    name: 'Dubai International Airport',
    address: { cityName: 'Dubai', countryName: 'United Arab Emirates' },
  },
  {
    iataCode: 'SIN',
    name: 'Singapore Changi Airport',
    address: { cityName: 'Singapore', countryName: 'Singapore' },
  },
  {
    iataCode: 'SFO',
    name: 'San Francisco International Airport',
    address: { cityName: 'San Francisco', countryName: 'United States' },
  },
  {
    iataCode: 'LAX',
    name: 'Los Angeles International Airport',
    address: { cityName: 'Los Angeles', countryName: 'United States' },
  },
  {
    iataCode: 'DEL',
    name: 'Indira Gandhi International Airport',
    address: { cityName: 'Delhi', countryName: 'India' },
  },
  {
    iataCode: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    address: { cityName: 'Mumbai', countryName: 'India' },
  },
  {
    iataCode: 'BLR',
    name: 'Kempegowda International Airport',
    address: { cityName: 'Bengaluru', countryName: 'India' },
  },
  {
    iataCode: 'MAA',
    name: 'Chennai International Airport',
    address: { cityName: 'Chennai', countryName: 'India' },
  },
  {
    iataCode: 'HYD',
    name: 'Rajiv Gandhi International Airport',
    address: { cityName: 'Hyderabad', countryName: 'India' },
  },
]

export async function searchAirports(keyword: string) {
  const cleanKeyword = keyword.toLowerCase().trim()

  // 1. Try Duffel if available
  if (duffel) {
    try {
      // If keyword looks like "HYD - Name", extract "HYD"
      const searchTerm = keyword.includes(' - ') ? keyword.split(' - ')[0] : keyword
      
      console.log(`[Duffel] Searching for: "${searchTerm}"`)
      const response = await duffel.suggestions.list({ query: searchTerm })
      
      if (response && response.data) {
        console.log(`[Duffel] Total raw results: ${response.data.length}`)

        if (response.data.length > 0) {
          const mapped = response.data
            .map((place: any) => {
              const iataCode = place.iata_code || place.iata_city_code || place.id
              return {
                iataCode: iataCode,
                name: place.name,
                address: {
                  cityName: place.city_name || place.name,
                  countryName: place.country_name || '',
                },
              }
            })
            .filter((a: any) => a.iataCode && a.iataCode.length === 3)

          const uniqueMapped = Array.from(
            new Map(mapped.map((item) => [item.iataCode, item])).values()
          )

          console.log(`[Duffel] Unique results: ${uniqueMapped.length}`)
          if (uniqueMapped.length > 0) {
            return uniqueMapped
          }
        }
      }
    } catch (error: any) {
      console.error('[Duffel] API Error Full Object:', error)
      if (error.errors) {
        console.error('[Duffel] API Errors List:', JSON.stringify(error.errors, null, 2))
      }
      const errorMessage = (error.errors && error.errors[0]?.message) || error.message || 'Unknown Duffel Error'
      console.warn(`[Duffel] Falling back to Mock Airports due to error: ${errorMessage}`)
    }
  }

  // 2. Fallback to Mock Data
  return MOCK_AIRPORTS.filter(
    (a) =>
      a.name.toLowerCase().includes(cleanKeyword) ||
      a.iataCode.toLowerCase().includes(cleanKeyword) ||
      a.address.cityName.toLowerCase().includes(cleanKeyword)
  )
}

export async function searchAndBookFlight(flightRequest: any) {
  // 1. Try Duffel if available
  if (duffel) {
    console.log('Searching for flight with Duffel:', flightRequest)
    try {
      const response = await duffel.offerRequests.create({
        slices: [
          {
            origin: flightRequest.origin,
            destination: flightRequest.destination,
            departure_date: flightRequest.departureDate,
          },
        ],
        passengers: [{ type: 'adult' }],
        cabin_class: 'economy',
        return_offers: true,
      })

      if (!response.data || response.data.offers.length === 0) {
        return { success: false, error: 'No flights found with Duffel.' }
      }

      const bestOffer = response.data.offers[0]
      
      return {
        success: true,
        bookingId: `ff-duffel-${bestOffer.id}`,
        flightOffer: {
          price: {
            total: bestOffer.total_amount,
            currency: bestOffer.total_currency,
          },
          itineraries: bestOffer.slices.map((s: any) => ({
            duration: s.duration,
            segments: s.segments.map((seg: any) => ({
              carrierCode: seg.operating_carrier?.iata_code || seg.marketing_carrier?.iata_code || '??',
              number: seg.operating_carrier_flight_number || seg.marketing_carrier_flight_number || '000',
            })),
          })),
        },
      }
    } catch (error: any) {
      console.error('Error searching with Duffel Full Object:', error)
      if (error.errors) {
        console.error('Duffel API Errors:', JSON.stringify(error.errors, null, 2))
      }
      const errorMessage = (error.errors && error.errors[0]?.message) || error.message || 'Unknown Duffel Error'
      
      // If Duffel fails (permissions, invalid token, etc.), fallback to Mock for the demo
      console.warn(`[Duffel] Falling back to Mock due to error: ${errorMessage}`)
      return await getMockFlight()
    }
  }

  return await getMockFlight()
}

async function getMockFlight() {
  console.log('Using Mock Flight for demo')
  const mockPrice = (Math.random() * 500 + 200).toFixed(2)
  return {
    success: true,
    bookingId: `mock-booking-${Math.random().toString(36).substring(2, 9)}`,
    flightOffer: {
      price: {
        total: mockPrice,
        currency: 'USD',
      },
      itineraries: [
        {
          duration: 'PT5H30M',
          segments: [
            {
              carrierCode: 'AA',
              number: '123',
            },
          ],
        },
      ],
    },
  }
}

export async function rebookFlight(trackedFlightId: string, currentBookingId: string, newPrice: string) {
  console.log(`[Rebooking] Starting rebook for ${trackedFlightId}. New price: ${newPrice}`)
  
  // 1. Cancel old booking (status -> cancelled)
  await mockDb.bookings.update(currentBookingId, { status: 'cancelled' })
  
  // 2. Create new booking (status -> active)
  const trackedFlight = await mockDb.trackedFlights.findById(trackedFlightId)
  if (!trackedFlight) return { success: false, error: 'Flight not found' }

  const newBooking = await mockDb.bookings.insert({
    trackedFlightId,
    airline: 'AA', // Mock airline
    flightNumber: '123', // Mock flight
    price: newPrice,
    currency: 'USD',
    status: 'active',
  })

  // 3. Update tracked flight status and updated timestamp
  await mockDb.trackedFlights.update(trackedFlightId, { 
    status: 'rebooked',
    updatedAt: new Date().toISOString() 
  })

  // 4. Record new price in history
  await mockDb.prices.insert({
    trackedFlightId,
    price: newPrice,
    currency: 'USD',
  })

  console.log(`[Rebooking] Successfully rebooked. Saved: ${newPrice}`)
  return { success: true, booking: newBooking }
}

export function startPriceSimulator(trackedFlightId: string, initialPrice: string) {
  console.log(`[Simulator] Starting simulator for flight ${trackedFlightId}. Initial price: ${initialPrice}`)
  
  // Record initial price immediately
  mockDb.prices.insert({
    trackedFlightId,
    price: initialPrice,
    currency: 'USD',
  })

  // Simulate a price drop after 10-20 seconds
  const delay = Math.floor(Math.random() * 10000) + 10000
  
  setTimeout(async () => {
    const flight = await mockDb.trackedFlights.findById(trackedFlightId)
    if (!flight) return

    // Calculate a price drop (10% to 30% off)
    const dropPercent = Math.random() * 0.2 + 0.1
    const newPrice = (parseFloat(initialPrice) * (1 - dropPercent)).toFixed(2)

    console.log(`[Simulator] PRICE DROP DETECTED! Old: ${initialPrice}, New: ${newPrice}`)

    // Find the current active booking
    const db = await mockDb.trackedFlights.findMany(flight.userId)
    const trackedFlightWithBookings = db.find(f => f.id === trackedFlightId)
    const activeBooking = trackedFlightWithBookings?.bookings.find((b: any) => b.status === 'active')

    if (activeBooking) {
      await rebookFlight(trackedFlightId, activeBooking.id, newPrice)
    }
  }, delay)
}
