import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import process from 'node:process'
import postgres from 'postgres'
import { user } from '../database/schema'

config()

const isProd = process.env.NODE_ENV === 'production'
const connectionString = isProd ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL

if (!connectionString) {
    throw new Error(`${isProd ? 'PROD_DATABASE_URL' : 'DATABASE_URL'} is not set`)
}

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client)

async function main() {
    const email = process.argv[2]
    if (!email) {
        console.error('Usage: npm run seed:admin <email>')
        process.exit(1)
    }

    console.log(`Promoting ${email} to admin...`)

    const result = await db.update(user)
        .set({ role: 'admin' })
        .where(eq(user.email, email))
        .returning({ id: user.id, name: user.name, role: user.role })

    if (result.length === 0) {
        console.error(`User with email ${email} not found. Please sign up first.`)
        process.exit(1)
    }

    console.log(`Success! User ${result[0].name} (${result[0].id}) is now an admin.`)
}

main()
    .catch((err) => {
        console.error('Error:', err)
        process.exit(1)
    })
    .finally(() => {
        client.end()
    })
