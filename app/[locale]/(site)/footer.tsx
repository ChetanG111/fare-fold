import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'

export default function Footer() {
  return (
    <footer className='border-t border-[#fff8ee]/15 bg-[#211b17] py-7 text-[13px] font-bold text-[#fff8ee]/70'>
      <div className='farefold-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center'>
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
          <span>(c) 2026 FareFold. Flight prices, renegotiated.</span>
          <Link href='/privacy' className='hover:text-[#fff8ee]'>
            Privacy
          </Link>
          <Link href='/terms' className='hover:text-[#fff8ee]'>
            Terms
          </Link>
          <Link href='/licenses' className='hover:text-[#fff8ee]'>
            Licenses
          </Link>
        </div>
        <div className='flex flex-wrap items-center gap-4 md:justify-end'>
          <span>Built for refundable fares, clear rules, and fewer travel chores.</span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
