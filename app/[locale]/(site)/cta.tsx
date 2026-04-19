import { Link } from '@/i18n/navigation'
import { ArrowUpRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id='final' className='bg-[#211b17] py-20 text-[#fff8ee] md:py-[88px]'>
      <div className='farefold-shell grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]'>
        <div>
          <h2 className='farefold-heading max-w-[780px] text-[38px] font-bold leading-[0.96] md:text-[64px]'>
            Let your next flight keep earning after checkout.
          </h2>
          <p className='mt-5 max-w-[600px] text-lg text-[#fff8ee]/75'>
            Start with one refundable itinerary and see every price move without refreshing another
            booking site.
          </p>
        </div>
        <Link
          href='/dashboard'
          className='inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#fff8ee] px-5 font-extrabold text-[#211b17] transition hover:-translate-y-0.5 max-sm:w-full'
        >
          Start tracking
          <ArrowUpRight className='h-5 w-5' />
        </Link>
      </div>
    </section>
  )
}
