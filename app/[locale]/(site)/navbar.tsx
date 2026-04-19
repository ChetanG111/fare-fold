'use client'

import { Link } from '@/i18n/navigation'
import { X, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className='fixed inset-x-0 top-0 z-30 border-b border-[#E4E4E7] bg-[#F4F4F5]'>
        <div className='mx-auto max-w-7xl flex h-14 items-center justify-between gap-8 px-4 sm:px-6'>
          <div className='flex items-center gap-3'>
            <Link href='/' className='flex items-center gap-2'>
              <img src='/image.png' alt='KyronHQ Logo' className='h-6 w-6 object-contain' />
              <span
                className='text-base font-semibold text-foreground'
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                KyronHQ
              </span>
            </Link>
          </div>

          <div className='flex-1' />

          <div className='flex items-center gap-6'>
            <div className='hidden items-center gap-6 md:flex'>
              <Link
                href='/#features'
                className='text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground'
              >
                Features
              </Link>
              <Link
                href='/#pricing'
                className='text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground'
              >
                Pricing
              </Link>
              <Link
                href='/#wall-of-love'
                className='text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground'
              >
                Wall of love
              </Link>
              <Link
                href='/#faq'
                className='text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground'
              >
                FAQ
              </Link>
            </div>





            <Button
              className='hidden md:flex font-semibold text-white'
              asChild
            >
              <Link href='/#pricing'>Get Started</Link>
            </Button>

            <button
              type='button'
              onClick={toggleMenu}
              className='inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden'
            >
              <span className='sr-only'>Toggle menu</span>
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='border-t border-border md:hidden'>
            <div className='mx-auto max-w-6xl space-y-1 px-4 sm:px-6 pb-3 pt-2'>
              <Link
                href='#features'
                className='block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground'
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                href='#pricing'
                className='block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground'
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link
                href='#wall-of-love'
                className='block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground'
                onClick={toggleMenu}
              >
                Wall of love
              </Link>
              <Link
                href='#faq'
                className='block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground'
                onClick={toggleMenu}
              >
                FAQ
              </Link>

              <Button
                className='w-full font-semibold text-white'
                asChild
              >
                <Link href='/#pricing' onClick={toggleMenu}>
                  Get Started
                </Link>
              </Button>


            </div>
          </div>
        )}
      </nav>
    </>
  )
}
