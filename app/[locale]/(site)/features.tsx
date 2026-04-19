const signals = [
  ['Daily fare swings', 'Popular routes can change several times between booking and departure.'],
  [
    'Flexible fares are mainstream',
    'Travelers already pay more for optionality but rarely use it to their advantage.',
  ],
  [
    'People want fewer tabs',
    'FareFold replaces manual checks with a single digest and automatic action.',
  ],
]

const leaks = [
  [
    '01',
    'You book early, then wonder if you overpaid.',
    'FareFold watches the exact route, cabin, and fare rules after checkout, then alerts or rebooks when the math is real.',
  ],
  [
    '02',
    'Refundable fares feel useful but expensive.',
    'The app turns flexibility into a working asset by using it to move you into a lower eligible fare.',
  ],
  [
    '03',
    'Airline policies are too fiddly to babysit.',
    'FareFold checks cancellation windows, fare classes, payment returns, and seat impact before it acts.',
  ],
]

const features = [
  [
    'pulse',
    'Fare heartbeat',
    'Continuous scans compare your booked fare against live refundable inventory on the same route.',
  ],
  [
    'refresh',
    'Auto rebook guardrails',
    'Set minimum savings, seat preferences, cabin rules, and refund timing before FareFold moves.',
  ],
  [
    'flag',
    'Policy-aware checks',
    'The app reads fare terms before action so a lower sticker price does not create a worse trip.',
  ],
  [
    'refund',
    'Refund tracker',
    'See when money, credits, or holds should land so savings do not disappear into vague airline language.',
  ],
  [
    'calendar',
    'Daily digest',
    'A compact morning view shows what changed, what FareFold did, and what still needs your approval.',
  ],
  [
    'family',
    'Family trip mode',
    'Track multiple travelers together and avoid rebooking one seat in a way that splits the group.',
  ],
]

export default function Features() {
  return (
    <>
      <section id='why' className='py-20 md:py-24'>
        <div className='farefold-shell'>
          <SectionHead
            title='Flights change price. Your booking should keep negotiating.'
            copy='Flexible fares, volatile demand, and app fatigue have created a simple opening: travelers want the savings without turning vacation planning into a daily chore.'
          />
          <div className='grid gap-4 lg:grid-cols-[1.15fr_0.85fr]'>
            <div className='farefold-card bg-[#fffdf8] p-6 md:p-8'>
              <p className='farefold-heading text-[28px] font-semibold leading-[1.08] text-[#3b332d] md:text-[44px]'>
                FareFold turns airfare watching into a quiet habit: book refundable, set the
                guardrails, and let the service move when the same trip gets cheaper.
              </p>
            </div>
            <div className='grid gap-3'>
              {signals.map(([title, copy]) => (
                <article key={title} className='farefold-card min-h-28 p-5'>
                  <strong className='block text-2xl leading-tight'>{title}</strong>
                  <span className='mt-2 block text-sm font-bold text-[#6d6259]'>{copy}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id='how' className='py-20 md:py-24'>
        <div className='farefold-shell'>
          <SectionHead
            title='The old way leaks money in three familiar places.'
            copy='FareFold is built for the person who already knows fares move, but does not want another travel chore.'
          />
          <div className='grid gap-4 md:grid-cols-3'>
            {leaks.map(([index, title, copy]) => (
              <article key={index} className='farefold-card min-h-[248px] p-6'>
                <span className='mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#ded3c5] text-[13px] font-extrabold text-[#8f2f24]'>
                  {index}
                </span>
                <h3 className='text-[19px] font-bold leading-tight text-[#3b332d]'>{title}</h3>
                <p className='mt-3 text-[#6d6259]'>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='features' className='py-20 md:py-24'>
        <div className='farefold-shell'>
          <SectionHead
            title='A personal savings loop for every trip.'
            copy='Each feature is designed to make the next good move obvious, quiet, and reversible.'
          />
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {features.map(([icon, title, copy]) => (
              <article key={title} className='farefold-card min-h-[248px] p-6'>
                <FeatureIcon name={icon} />
                <h3 className='text-[19px] font-bold leading-tight text-[#3b332d]'>{title}</h3>
                <p className='mt-3 text-[#6d6259]'>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function SectionHead({ title, copy }: { title: string; copy: string }) {
  return (
    <div className='mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end'>
      <h2 className='farefold-heading max-w-[780px] text-[38px] font-bold leading-[0.96] text-[#211b17] md:text-[64px]'>
        {title}
      </h2>
      <p className='max-w-[440px] text-[17px] text-[#6d6259]'>{copy}</p>
    </div>
  )
}

function FeatureIcon({ name }: { name: string }) {
  const shared = 'mb-6 h-7 w-7 text-[#8f2f24]'

  return (
    <svg
      className={shared}
      viewBox='0 0 24 24'
      aria-hidden='true'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.8'
    >
      {name === 'pulse' && <path d='M3 12h4l3 8 4-16 3 8h4' />}
      {name === 'refresh' && <path d='M21 12a9 9 0 1 1-3-6.7M21 3v6h-6' />}
      {name === 'flag' && <path d='M4 19V5M4 7h11l-1 4 1 4H4' />}
      {name === 'refund' && <path d='M3 7h18M6 7v13h12V7M9 7V4h6v3' />}
      {name === 'calendar' && <path d='M8 2v4M16 2v4M3 10h18M5 4h14v18H5z' />}
      {name === 'family' && (
        <path d='M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
      )}
    </svg>
  )
}
