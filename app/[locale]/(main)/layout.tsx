import { getUnifiedSession } from '@/lib/auth/unified-session'
import { redirect } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { FeedbackWidget } from '@/components/feedback/feedback-widget'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getUnifiedSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader user={session.user} />
      <main className="flex-1">
        {children}
      </main>
      <FeedbackWidget />
    </div>
  )
}
