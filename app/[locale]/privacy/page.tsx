import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import Footer from '../(site)/footer'
import { GridLayout } from '../(site)/grid-layout'
import Navbar from '../(site)/navbar'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for FareFold.',
  canonical: '/privacy',
})

const sections = [
  [
    '1. data we collect',
    'We collect account details, trip information you provide or forward, fare preferences, payment status, and basic product usage data.',
  ],
  [
    '2. how we use it',
    'We use this data to track eligible fares, apply your rebooking guardrails, send digests, support your account, and improve reliability.',
  ],
  [
    '3. booking providers',
    'Airlines, payment processors, email providers, analytics tools, and hosting platforms may process data needed to operate FareFold.',
  ],
  [
    '4. cookies',
    'We use cookies and similar storage to keep you signed in, remember preferences, and understand product performance.',
  ],
  [
    '5. security',
    'We take reasonable steps to protect your information, but no online service can promise perfect security.',
  ],
  [
    '6. your choices',
    'You can request deletion, correction, or export of your data by contacting chetangonuguntla0@gmail.com.',
  ],
]

export default function PrivacyPage() {
  return (
    <GridLayout>
      <Navbar />
      <main className='py-20 md:py-24'>
        <div className='farefold-shell max-w-4xl'>
          <p className='text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#8f2f24]'>
            Legal
          </p>
          <h1 className='farefold-heading mt-4 text-[46px] font-bold leading-[0.96] md:text-[72px]'>
            Privacy Policy
          </h1>
          <p className='mt-4 text-sm font-bold text-[#6d6259]'>Last updated: Jan 17, 2026</p>

          <div className='mt-12 grid gap-4'>
            {sections.map(([title, copy]) => (
              <section key={title} className='farefold-card p-6'>
                <h2 className='text-xl font-bold text-[#3b332d]'>{title}</h2>
                <p className='mt-3 text-[#6d6259]'>{copy}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </GridLayout>
  )
}
