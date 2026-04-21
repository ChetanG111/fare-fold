import { auth } from '@/lib/auth/auth'
import { headers, cookies } from 'next/headers'
import { adminAuth } from '@/lib/firebase/admin'

export async function getUnifiedSession() {
  // 1. Check Mock Mode
  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
    return { 
      user: { 
        id: 'mock-user-123', 
        email: 'mock@example.com', 
        name: 'Mock User',
        image: null
      } 
    }
  }

  // 2. Check Better-Auth Session
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    return session
  }

  // 3. Check Firebase Session
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('firebase-session')?.value

  if (sessionCookie && adminAuth) {
    try {
      const decodedToken = await adminAuth.verifySessionCookie(sessionCookie)
      return {
        user: {
          id: decodedToken.uid,
          name: decodedToken.name || 'Firebase User',
          email: decodedToken.email,
          image: decodedToken.picture || null,
        }
      }
    } catch (error) {
      console.error('Firebase session verification failed:', error)
    }
  }

  return null
}
