import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import Footer from '../(site)/footer'
import { GridLayout } from '../(site)/grid-layout'
import Navbar from '../(site)/navbar'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for FareFold.',
  canonical: '/terms',
})

const sections = [
  [
    '1. using FareFold',
    'Use FareFold only for lawful travel planning and account activity. You are responsible for the bookings, preferences, payment details, and approvals you connect to the service.',
  ],
  [
    '2. accounts',
    'Keep your account secure and contact chetangonuguntla0@gmail.com if you suspect unauthorized access. We may pause activity when we need to protect your account or investigate misuse.',
  ],
  [
    '3. rebooking rules',
    'FareFold acts only inside the guardrails you configure. Lower fares, refund timing, seat availability, and airline policies can change quickly, so savings are never guaranteed.',
  ],
  [
    '4. payment and refunds',
    'Subscription fees cover FareFold software and support. Airline refunds, credits, fees, and fare changes remain controlled by the airline or travel provider.',
  ],
  [
    '5. liability',
    'FareFold is provided as is. We are not liable for airline schedule changes, fare availability, missed rebooking windows, provider outages, or indirect losses.',
  ],
  [
    '6. updates to terms',
    'We may update these terms as the product changes. Continued use means you accept the latest version.',
  ],
]

export default function TermsPage() {
  return (
    <GridLayout>
      <Navbar />
      <main className='py-20 md:py-24'>
        <div className='farefold-shell max-w-4xl'>
          <p className='text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#8f2f24]'>
            Legal
          </p>
          <h1 className='farefold-heading mt-4 text-[46px] font-bold leading-[0.96] md:text-[72px]'>
            Terms of Service
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
