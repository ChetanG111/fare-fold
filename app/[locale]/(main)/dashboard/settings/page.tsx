import { getUnifiedSession } from '@/lib/auth/unified-session'
import { redirect } from 'next/navigation'
import { Settings } from '@/components/dashboard/settings'

export default async function SettingsPage() {
  const session = await getUnifiedSession()

  if (!session) {
    redirect('/login')
  }

  return <Settings user={session.user} />
}
