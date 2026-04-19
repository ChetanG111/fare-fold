import { NextResponse } from 'next/server'
import { searchAirports } from '@/lib/fare-fold/service'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  try {
    const airports = await searchAirports(query)
    return NextResponse.json(airports)
  } catch (error) {
    console.error('Error searching airports:', error)
    return NextResponse.json({ error: 'Failed to search airports' }, { status: 500 })
  }
}
