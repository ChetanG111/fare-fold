import { Duffel } from '@duffel/api'

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
      console.log(`[Duffel] Searching for: "${keyword}"`)
      const response = await duffel.suggestions.list({ query: keyword })
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
    } catch (error: any) {
      console.error('[Duffel] API Error:', error.message)
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
      const response = await duffel.offers.create({
        slices: [
          {
            origin: flightRequest.origin,
            destination: flightRequest.destination,
            departure_date: flightRequest.departureDate,
          },
        ],
        passengers: [{ type: 'adult' }],
        cabin_class: 'economy',
      })

      if (!response.data || response.data.offers.length === 0) {
        return { success: false, error: 'No flights found with Duffel.' }
      }

      const bestOffer = response.data.offers[0]
      
      // Map to a consistent structure
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
      console.error('Error searching with Duffel:', error.message)
      return { success: false, error: error.message }
    }
  }

  return { success: false, error: 'Duffel is not configured.' }
}

