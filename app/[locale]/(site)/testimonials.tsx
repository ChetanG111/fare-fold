const testimonials = [
  {
    quote:
      'FareFold rebooked our Seattle trip while I was in a meeting. Same seats, same airline, $312 back before lunch.',
    name: 'Lena Morales',
    title: 'Product lead, Northstar Foods',
    initials: 'LM',
  },
  {
    quote:
      'I used to check fares every night after buying. Now I read one digest and know whether anything actually changed.',
    name: 'Arjun Kapoor',
    title: 'Design manager, Haven Studio',
    initials: 'AK',
  },
]

const stats = [
  ['38k', 'active tracked trips this month'],
  ['6 min', 'average setup time from booking email'],
  ['72%', 'weekly digest open rate'],
]

export default function Testimonials() {
  return (
    <section id='proof' className='border-y border-[#ded3c5] bg-[#fffdf8]/50 py-20 md:py-24'>
      <div className='farefold-shell'>
        <div className='mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end'>
          <h2 className='farefold-heading max-w-[780px] text-[38px] font-bold leading-[0.96] text-[#211b17] md:text-[64px]'>
            Built for people who book flights between real life.
          </h2>
          <p className='max-w-[440px] text-[17px] text-[#6d6259]'>
            Specific wins, quick checks, and enough transparency to trust the next automatic move.
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className='farefold-card min-h-[284px] p-7'>
              <p className='farefold-heading text-[28px] font-semibold leading-tight text-[#3b332d]'>
                &quot;{testimonial.quote}&quot;
              </p>
              <div className='mt-7 flex items-center gap-3'>
                <span className='grid h-11 w-11 place-items-center rounded-full bg-[#f1eadf] font-extrabold text-[#8f2f24]'>
                  {testimonial.initials}
                </span>
                <span>
                  <b className='block'>{testimonial.name}</b>
                  <span className='text-[13px] font-bold text-[#6d6259]'>{testimonial.title}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className='mt-4 grid gap-4 md:grid-cols-3'>
          {stats.map(([value, label]) => (
            <div key={value} className='farefold-card bg-[#fffdf8] p-6'>
              <strong className='farefold-heading block text-[42px] leading-none'>{value}</strong>
              <span className='mt-2 block font-bold text-[#6d6259]'>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
