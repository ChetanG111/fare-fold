import { Link } from '@/i18n/navigation'

const plans = [
  {
    name: 'Free Watch',
    description: 'For one trip when you want proof that your fare is still fair.',
    price: '$0',
    suffix: '/ trip',
    features: [
      'Track one refundable itinerary',
      'Daily fare-drop digest',
      'Manual rebook instructions',
      'Refund window reminders',
    ],
    cta: 'Try free',
    featured: false,
  },
  {
    name: 'Personal',
    description: 'For frequent personal travel and automatic rebooking within your rules.',
    price: '$9',
    suffix: '/ month',
    features: [
      'Unlimited active trips',
      'Automatic eligible rebooking',
      'Seat and cabin guardrails',
      'Refund and credit tracking',
      'Priority drop alerts',
    ],
    cta: 'Start Personal',
    featured: true,
  },
  {
    name: 'Family',
    description: 'For households coordinating several travelers, school breaks, and visits home.',
    price: '$16',
    suffix: '/ month',
    features: [
      'Six traveler profiles',
      'Group-seat protection',
      'Shared digest and approvals',
      'Family refund timeline',
      'Concierge policy review',
    ],
    cta: 'Choose Family',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id='pricing' className='py-20 md:py-24'>
      <div className='farefold-shell'>
        <div className='mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end'>
          <h2 className='farefold-heading max-w-[780px] text-[38px] font-bold leading-[0.96] text-[#211b17] md:text-[64px]'>
            Start free, pay when the habit gets useful.
          </h2>
          <p className='max-w-[440px] text-[17px] text-[#6d6259]'>
            A consumer-friendly model that makes sense before your first saved dollar and scales for
            families.
          </p>
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`farefold-card relative flex min-h-[456px] flex-col p-7 ${
                plan.featured ? 'farefold-shadow border-[#8f2f24]/50' : ''
              }`}
            >
              {plan.featured && (
                <span className='absolute right-5 top-5 rounded-full bg-[#8f2f24] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#fff8ee]'>
                  Recommended
                </span>
              )}
              <h3 className='pr-24 text-[19px] font-bold leading-tight text-[#3b332d]'>
                {plan.name}
              </h3>
              <p className='mt-3 text-[#6d6259]'>{plan.description}</p>
              <div className='farefold-heading mt-6 text-5xl leading-none'>
                {plan.price}{' '}
                <span className='font-sans text-sm font-extrabold text-[#6d6259]'>
                  {plan.suffix}
                </span>
              </div>
              <ul className='my-7 grid gap-2.5 text-[#6d6259]'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex gap-2 font-semibold'>
                    <span className='pt-1 text-[11px] font-black text-[#246b50]'>OK</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href='/dashboard'
                className={`mt-auto inline-flex min-h-12 w-full items-center justify-center rounded-[8px] px-5 font-extrabold transition hover:-translate-y-0.5 ${
                  plan.featured
                    ? 'bg-[#8f2f24] text-[#fff8ee] shadow-[0_12px_28px_rgba(143,47,36,0.2)]'
                    : 'border border-[#ded3c5] bg-[#fffdf8]/75 text-[#211b17] hover:bg-[#fffdf8]'
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
