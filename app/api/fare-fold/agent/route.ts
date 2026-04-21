import { NextResponse } from 'next/server'
import { getUnifiedSession } from '@/lib/auth/unified-session'
import { runAgentRecheck } from '@/lib/fare-fold/agent'

export async function POST(req: Request) {
  const session = await getUnifiedSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { trackedFlightId } = await req.json()
  if (!trackedFlightId) {
    return NextResponse.json({ error: 'Missing trackedFlightId' }, { status: 400 })
  }

  const result = await runAgentRecheck(trackedFlightId)
  return NextResponse.json(result)
}
