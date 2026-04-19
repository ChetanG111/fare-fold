
'use server'

import { db } from '@/database'
import { feedback, notification } from '@/database/schema'
import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function submitFeedback(prevState: any, formData: FormData) {
    const message = formData.get('message') as string
    const type = formData.get('type') as string

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!message) {
        return { success: false, message: 'Message is required' }
    }

    try {
        await db.insert(feedback).values({
            message,
            type: type || 'general',
            userId: session?.user?.id || null, // Allow anonymous feedback if session is null (or handle specific logic)
        })

        return { success: true, message: 'Feedback received!' }
    } catch (error) {
        console.error('Feedback error:', error)
        return { success: false, message: 'Failed to submit feedback' }
    }
}

export async function markNotificationRead(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) return { success: false }

    try {
        await db.update(notification)
            .set({ read: true })
            .where(eq(notification.id, id))

        revalidatePath('/')
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}
