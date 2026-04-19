import fs from 'node:fs'
import path from 'node:path'

const MOCK_DB_PATH = path.join(process.cwd(), 'scratch', 'mock-db.json')

// Ensure directory exists
const dir = path.dirname(MOCK_DB_PATH)
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

interface MockData {
  trackedFlights: any[]
  bookings: any[]
  prices: any[]
}

function readDb(): MockData {
  if (!fs.existsSync(MOCK_DB_PATH)) {
    return { trackedFlights: [], bookings: [], prices: [] }
  }
  try {
    const data = JSON.parse(fs.readFileSync(MOCK_DB_PATH, 'utf-8'))
    return {
      trackedFlights: data.trackedFlights || [],
      bookings: data.bookings || [],
      prices: data.prices || [],
    }
  } catch {
    return { trackedFlights: [], bookings: [], prices: [] }
  }
}

function writeDb(data: MockData) {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2))
}

export const mockDb = {
  trackedFlights: {
    findMany: async (userId: string) => {
      const db = readDb()
      return db.trackedFlights
        .filter((f) => f.userId === userId)
        .map((f) => ({
          ...f,
          bookings: db.bookings.filter((b) => b.trackedFlightId === f.id),
          priceHistory: db.prices
            .filter((p) => p.trackedFlightId === f.id)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    },
    findById: async (id: string) => {
      const db = readDb()
      return db.trackedFlights.find((f) => f.id === id)
    },
    insert: async (data: any) => {
      const db = readDb()
      const newFlight = {
        ...data,
        id: `mock-flight-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      db.trackedFlights.push(newFlight)
      writeDb(db)
      return [newFlight]
    },
    update: async (id: string, data: any) => {
      const db = readDb()
      const index = db.trackedFlights.findIndex((f) => f.id === id)
      if (index !== -1) {
        db.trackedFlights[index] = { ...db.trackedFlights[index], ...data, updatedAt: new Date().toISOString() }
        writeDb(db)
        return db.trackedFlights[index]
      }
      return null
    },
  },
  bookings: {
    insert: async (data: any) => {
      const db = readDb()
      const newBooking = {
        ...data,
        id: `mock-booking-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
      }
      db.bookings.push(newBooking)
      writeDb(db)
      return [newBooking]
    },
    update: async (id: string, data: any) => {
      const db = readDb()
      const index = db.bookings.findIndex((b) => b.id === id)
      if (index !== -1) {
        db.bookings[index] = { ...db.bookings[index], ...data }
        writeDb(db)
        return db.bookings[index]
      }
      return null
    },
  },
  prices: {
    insert: async (data: any) => {
      const db = readDb()
      const newPrice = {
        ...data,
        id: `mock-price-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString(),
      }
      db.prices.push(newPrice)
      writeDb(db)
      return [newPrice]
    },
    findMany: async (trackedFlightId: string) => {
      const db = readDb()
      return db.prices
        .filter((p) => p.trackedFlightId === trackedFlightId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    },
  },
}
