import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { adminAuth } from '@/lib/firebase/admin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Settings } from '@/components/dashboard/settings'

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  let user = session?.user

  // If no Better-Auth session, check Firebase session
  if (!user) {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('firebase-session')?.value

    if (sessionCookie) {
      try {
        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie)
        user = {
          id: decodedToken.uid,
          name: decodedToken.name || 'Firebase User',
          email: decodedToken.email,
          image: decodedToken.picture || null,
        } as any
      } catch (error) {
        console.error('Firebase session verification failed:', error)
      }
    }
  }

  if (!user) {
    redirect('/login')
  }

  return <Settings user={user} />
}
