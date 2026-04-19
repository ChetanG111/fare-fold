import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { AppHeader } from '@/components/app-header'
import { FeedbackWidget } from '@/components/feedback/feedback-widget'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' && process.env.NODE_ENV === 'development') {
      // Mock session
      // We can just proceed, but we need to ensure 'session' variable is populated if used later.
      // However, this layout just renders children.
      // But wait, does it pass session down? No.
      // But children (page.tsx) might call getSession again?
      // If page.tsx calls getSession, it will be null again.
      // So simply skipping redirect here is NOT enough if child components fetch data based on user ID.
      // HOWEVER, for a simple "view UI" check, this prevents the redirect.
      // The user asked to "test the app w/ ease".
      // If the app relies on DB data for the user, it will crash.
      // But most pages in (main) use the session.
      // To do this *properly*, we'd need to mock the `auth.api.getSession` call itself or `headers()`.
      // Since we cannot easily mock the library internal call in a specific file without Jest/ViTest...
      // We accept that "Bypass" means "Don't redirect", but data fetching might fail or need empty states.
      // OR we rely on the fact that we are mocking it here at layout level?
      // Actually `MainLayout` variable `session` is unused except for the check.
      // So stopping redirect is enough for THIS file.
      // We need to do the same in `app/[locale]/(main)/layout.tsx`.
    } else {
      redirect('/login')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
      <FeedbackWidget />
    </div>
  )
}
