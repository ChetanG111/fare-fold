'use client'

import { Link } from '@/i18n/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/#why', label: 'Why now' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='sticky inset-x-0 top-0 z-30 border-b border-[#ded3c5]/75 bg-[#fbf7f0]/90 backdrop-blur-2xl'>
      <nav className='farefold-shell flex min-h-[72px] items-center justify-between gap-6'>
        <Link
          href='/'
          className='inline-flex items-center gap-3 font-extrabold'
          aria-label='FareFold home'
        >
          <span className='farefold-heading grid h-9 w-9 place-items-center rounded-[8px] border border-[#2e2621] bg-[#211b17] text-xl text-[#fff8ee]'>
            F
          </span>
          <span>FareFold</span>
        </Link>

        <div className='hidden items-center gap-6 text-sm font-bold text-[#6d6259] md:flex'>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='transition-colors hover:text-[#211b17]'
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <Link
            href='/#pricing'
            className='hidden min-h-12 items-center justify-center rounded-[8px] border border-[#ded3c5] bg-[#fffdf8]/75 px-5 text-sm font-extrabold transition hover:-translate-y-0.5 hover:bg-[#fffdf8] md:inline-flex'
          >
            Start free
          </Link>
          <button
            type='button'
            onClick={() => setIsMenuOpen((open) => !open)}
            className='inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#ded3c5] bg-[#fffdf8]/80 text-[#211b17] md:hidden'
            aria-expanded={isMenuOpen}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className='border-t border-[#ded3c5] bg-[#fbf7f0] md:hidden'>
          <div className='farefold-shell grid gap-1 py-3'>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className='rounded-[8px] px-3 py-3 text-sm font-bold text-[#6d6259] hover:bg-[#f1eadf] hover:text-[#211b17]'
              >
                {item.label}
              </Link>
            ))}
            <Link
              href='/#pricing'
              onClick={() => setIsMenuOpen(false)}
              className='mt-2 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[#8f2f24] px-5 font-extrabold text-[#fff8ee]'
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
