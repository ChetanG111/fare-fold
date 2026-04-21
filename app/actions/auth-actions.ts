'use server'

import { cookies } from 'next/headers'
import { adminAuth } from '@/lib/firebase/admin'

export async function setFirebaseSession(idToken: string) {
    if (!adminAuth) {
      console.warn('Firebase Admin Auth is not initialized');
      return { success: false, error: 'Auth not available' }
    }
    
    try {
      // Verify the token just to be sure it's valid
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    
    if (decodedToken) {
      // Set the session cookie. We can use the ID token directly for simplicity, 
      // or create a session cookie. Session cookies are more secure.
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
      const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
      
      const cookieStore = await cookies()
      cookieStore.set('firebase-session', sessionCookie, {
        maxAge: expiresIn / 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
      
      return { success: true }
    }
  } catch (error) {
    console.error('Error setting firebase session:', error)
    return { success: false, error: 'Failed to set session' }
  }
  
  return { success: false }
}

export async function removeFirebaseSession() {
  const cookieStore = await cookies()
  cookieStore.delete('firebase-session')
}
