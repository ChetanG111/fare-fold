import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import '@/app/_styles/globals.css'
import { QueryProvider } from '@/app/_providers/query-provider'
import { ToastProvider } from '@/components/ui/toast'
import { ThemeProvider } from '@/components/branding/theme-provider'
import { fontHeading, fontMono, fontSans } from '@/config/fonts'
import { generateMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'FareFold - Flight Prices, Renegotiated',
    description:
      'FareFold books flexible flights, tracks fare drops, and rebooks automatically so travelers keep the savings.',
    imageAlt: 'FareFold mobile app showing a fare drop, automatic rebooking, and savings details.',
    isRootLayout: true,
  }),
  icons: {
    icon: '/image.png',
    shortcut: '/image.png',
    apple: '/image.png',
  },
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <ToastProvider>{children}</ToastProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
