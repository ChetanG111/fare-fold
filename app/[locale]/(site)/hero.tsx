import { Link } from '@/i18n/navigation'
import { ArrowUpRight } from 'lucide-react'

const proofTiles = [
  ['$184', 'average saved on trips with a drop'],
  ['4.7 days', 'typical first reprice window'],
  ['91%', 'of users keep tracking after trip one'],
]

export default function Hero() {
  return (
    <main id='hero' className='overflow-hidden border-b border-[#ded3c5] py-16 md:py-20'>
      <section className='farefold-shell grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-16'>
        <div>
          <p className='inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#8f2f24] before:h-px before:w-7 before:bg-current before:content-[""]'>
            Personal fare renegotiation
          </p>
          <h1 className='farefold-heading mt-5 max-w-[730px] text-balance text-[52px] font-bold leading-[0.96] text-[#211b17] sm:text-6xl lg:text-[98px]'>
            FareFold gets your flight price down after you book.
          </h1>
          <p className='mt-6 max-w-[650px] text-lg leading-[1.62] text-[#6d6259] md:text-xl'>
            Book a flexible fare once. FareFold watches the route, catches eligible price drops, and
            rebooks the refundable ticket automatically so everyday travelers keep the difference
            without living in airline tabs.
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <Link
              href='/#pricing'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#8f2f24] px-5 font-extrabold text-[#fff8ee] shadow-[0_12px_28px_rgba(143,47,36,0.2)] transition hover:-translate-y-0.5 max-sm:w-full'
            >
              Start tracking a trip
              <ArrowUpRight className='h-5 w-5' />
            </Link>
            <Link
              href='/#how'
              className='inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[#ded3c5] bg-[#fffdf8]/75 px-5 font-extrabold text-[#211b17] transition hover:-translate-y-0.5 hover:bg-[#fffdf8] max-sm:w-full'
            >
              See how it rebooks
            </Link>
          </div>
          <div className='mt-10 grid max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-3'>
            {proofTiles.map(([value, label]) => (
              <div key={value} className='farefold-card min-h-24 p-4'>
                <strong className='block text-[21px] leading-tight'>{value}</strong>
                <span className='mt-2 block text-[13px] font-bold leading-snug text-[#6d6259]'>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className='relative min-h-[588px] md:min-h-[624px]'
          aria-label='FareFold mobile product preview'
        >
          <div className='farefold-shadow absolute right-2 top-14 hidden w-[284px] rotate-[5deg] rounded-[8px] border border-[#ded3c5] bg-[#fffaf2] before:absolute before:left-5 before:right-5 before:top-[86px] before:h-px before:bg-[repeating-linear-gradient(90deg,#ded3c5_0_8px,transparent_8px_14px)] before:content-[""] after:absolute after:bottom-[72px] after:left-5 after:right-5 after:h-px after:bg-[repeating-linear-gradient(90deg,#ded3c5_0_8px,transparent_8px_14px)] after:content-[""] md:block lg:right-2'>
            <div className='flex justify-between p-5 text-xs font-extrabold uppercase tracking-[0.08em]'>
              <span>Refundable</span>
              <span>Seat 18A</span>
            </div>
            <div className='px-5 pb-[92px] pt-6'>
              <b className='farefold-heading block text-[54px] leading-[0.9]'>SFO</b>
              <span className='text-[13px] font-bold text-[#6d6259]'>San Francisco</span>
              <b className='farefold-heading mt-5 block text-[54px] leading-[0.9]'>JFK</b>
              <span className='text-[13px] font-bold text-[#6d6259]'>New York</span>
            </div>
          </div>

          <div className='absolute left-1/2 w-[min(336px,calc(100vw-44px))] -translate-x-1/2 rounded-[34px] border border-[#2b211d] bg-[#211b17] p-3 shadow-[0_34px_80px_rgba(41,25,15,0.24)] [--phone-x:-50%] [animation:farefold-settle_700ms_cubic-bezier(0.2,0.8,0.2,1)_both] lg:left-auto lg:right-[88px] lg:w-[336px] lg:translate-x-0 lg:[--phone-x:0]'>
            <div className='min-h-[560px] overflow-hidden rounded-[24px] bg-[#fffdf8] md:min-h-[580px]'>
              <div className='flex items-center justify-between px-5 pb-4 pt-6'>
                <span className='text-[13px] font-extrabold'>FareFold Digest</span>
                <span className='inline-flex min-h-7 items-center rounded-full border border-[#246b50]/30 bg-[#246b50]/10 px-3 text-xs font-extrabold text-[#246b50]'>
                  Auto-rebook on
                </span>
              </div>

              <div className='mx-4 rounded-[8px] border border-[#ded3c5] bg-[#fff7ec]'>
                <div className='border-b border-[#ded3c5] p-[18px]'>
                  <span className='text-xs font-extrabold uppercase tracking-[0.08em] text-[#6d6259]'>
                    Price drop found
                  </span>
                  <strong className='farefold-heading mt-2 block text-[42px] leading-none'>
                    Save $216
                  </strong>
                  <p className='mt-2 text-[13px] font-semibold leading-snug text-[#6d6259]'>
                    SFO to JFK is now lower on your refundable fare class. Rebooking window closes
                    in 42 minutes.
                  </p>
                </div>
                <div className='flex items-center justify-between border-b border-[#ded3c5] px-[18px] py-3.5 [animation:farefold-fare-pulse_2200ms_ease-in-out_infinite]'>
                  <small className='font-bold text-[#6d6259]'>Original fare</small>
                  <b className='text-[15px] text-[#8f2f24]'>$642</b>
                </div>
                <div className='flex items-center justify-between px-[18px] py-3.5 [animation:farefold-fare-pulse_2200ms_ease-in-out_600ms_infinite]'>
                  <small className='font-bold text-[#6d6259]'>New refundable fare</small>
                  <b className='text-[15px] text-[#8f2f24]'>$426</b>
                </div>
              </div>

              <div className='grid gap-3 p-4 pt-[18px]'>
                <ItineraryCard
                  label='Spring visit'
                  detail='Apr 24, nonstop'
                  value='$426'
                  icon='plane'
                />
                <ItineraryCard
                  label='Refund status'
                  detail='Credit returned to card'
                  value='$216'
                  icon='refund'
                />
                <ItineraryCard
                  label='Next scan'
                  detail='Watching same cabin'
                  value='11:30'
                  icon='trend'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ItineraryCard({
  label,
  detail,
  value,
  icon,
}: {
  label: string
  detail: string
  value: string
  icon: 'plane' | 'refund' | 'trend'
}) {
  return (
    <div className='grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 rounded-[8px] border border-[#ded3c5] bg-[#fffdf8] p-3'>
      <span className='grid h-[42px] w-[42px] place-items-center rounded-[8px] bg-[#f1eadf] text-[#8f2f24]'>
        {icon === 'plane' && (
          <svg width='22' height='22' viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M2 16l20-8-8 13-3-7-9 2z' fill='currentColor' opacity='.18' />
            <path
              d='M2 16l20-8-8 13-3-7-9 2z'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.8'
            />
          </svg>
        )}
        {icon === 'refund' && (
          <svg width='22' height='22' viewBox='0 0 24 24' aria-hidden='true'>
            <path
              d='M12 3v18M5 10h14M7 21h10M7 3h10'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.8'
            />
          </svg>
        )}
        {icon === 'trend' && (
          <svg width='22' height='22' viewBox='0 0 24 24' aria-hidden='true'>
            <path
              d='M20 7l-8 10-4-4-4 5M15 7h5v5'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.8'
            />
          </svg>
        )}
      </span>
      <span>
        <b className='block text-sm'>{label}</b>
        <span className='text-xs font-bold text-[#6d6259]'>{detail}</span>
      </span>
      <span className='font-extrabold'>{value}</span>
    </div>
  )
}
