import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import Footer from '../(site)/footer'
import { GridLayout } from '../(site)/grid-layout'
import Navbar from '../(site)/navbar'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Licenses',
  description: 'License information for FareFold.',
  canonical: '/licenses',
})

const sections = [
  [
    '1. FareFold application',
    'FareFold product code, brand assets, interface copy, and proprietary service logic are owned by FareFold or licensed to FareFold.',
  ],
  [
    '2. open-source components',
    'FareFold uses open-source libraries under their own licenses. You must follow those license terms when using or modifying dependency code.',
  ],
  [
    '3. customer data',
    'You keep rights to the travel information, preferences, and account data you provide to FareFold.',
  ],
  [
    '4. restrictions',
    'Do not copy, resell, reverse engineer, or redistribute FareFold service code or branded assets without written permission.',
  ],
]

export default function LicensesPage() {
  return (
    <GridLayout>
      <Navbar />
      <main className='py-20 md:py-24'>
        <div className='farefold-shell max-w-4xl'>
          <p className='text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#8f2f24]'>
            Legal
          </p>
          <h1 className='farefold-heading mt-4 text-[46px] font-bold leading-[0.96] md:text-[72px]'>
            Licenses
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
