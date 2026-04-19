const faqs = [
  [
    'Does FareFold book the first ticket?',
    'Yes, when you choose a refundable fare through FareFold. You can also forward an eligible booking email to start tracking.',
  ],
  [
    'Will it change my seat or cabin?',
    'Only inside the guardrails you set. If a lower fare risks your cabin, seat, or group, FareFold asks first.',
  ],
  [
    'What if the airline gives credit instead of cash?',
    'The refund tracker shows the expected return method before rebooking so you can decide if the savings are worth it.',
  ],
  [
    'How does FareFold make money?',
    'Premium subscriptions. FareFold does not hide fees inside the fare or push flights that are worse for you.',
  ],
  [
    'Can it guarantee savings?',
    'No. It guarantees disciplined watching and eligible action. When fares do drop, it helps you move before the window closes.',
  ],
]

export default function FAQ() {
  return (
    <section id='faq' className='py-20 md:py-24'>
      <div className='farefold-shell'>
        <div className='mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end'>
          <h2 className='farefold-heading max-w-[780px] text-[38px] font-bold leading-[0.96] text-[#211b17] md:text-[64px]'>
            Questions worth asking before you let an app rebook.
          </h2>
          <p className='max-w-[440px] text-[17px] text-[#6d6259]'>
            Short answers to the practical concerns that matter most.
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
          {faqs.map(([question, answer]) => (
            <article key={question} className='farefold-card min-h-[232px] p-6'>
              <h3 className='text-[19px] font-bold leading-tight text-[#3b332d]'>{question}</h3>
              <p className='mt-3 text-[#6d6259]'>{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
