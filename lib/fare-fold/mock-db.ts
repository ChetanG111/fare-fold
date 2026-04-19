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
}

function readDb(): MockData {
  if (!fs.existsSync(MOCK_DB_PATH)) {
    return { trackedFlights: [], bookings: [] }
  }
  try {
    return JSON.parse(fs.readFileSync(MOCK_DB_PATH, 'utf-8'))
  } catch {
    return { trackedFlights: [], bookings: [] }
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
          bookings: db.bookings.filter((b) => b.trackedFlightId === f.id && b.status === 'active'),
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
  },
}
