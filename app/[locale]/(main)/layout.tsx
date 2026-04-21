import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { adminAuth } from '@/lib/firebase/admin'
import { AppHeader } from '@/components/app-header'
import { FeedbackWidget } from '@/components/feedback/feedback-widget'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Also check for Firebase session
  const cookieStore = await cookies()
  const firebaseSession = cookieStore.get('firebase-session')?.value
  let isFirebaseAuthenticated = false
  let user = session?.user || null

  if (firebaseSession) {
    try {
      const decodedToken = await adminAuth.verifySessionCookie(firebaseSession, true)
      isFirebaseAuthenticated = true
      
      if (!user) {
        user = {
          name: decodedToken.name || decodedToken.email?.split('@')[0] || 'User',
          email: decodedToken.email,
          image: decodedToken.picture,
        }
      }
    } catch (error) {
      console.error('Firebase session verification failed:', error)
    }
  }

  if (!session && !isFirebaseAuthenticated) {
    if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' && process.env.NODE_ENV === 'development') {
      // Mock session bypass
    } else {
      redirect('/login')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader user={user} />
      <main className="flex-1">
        {children}
      </main>
      <FeedbackWidget />
    </div>
  )
}
