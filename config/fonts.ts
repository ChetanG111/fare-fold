import { Fraunces, Manrope, Geist_Mono } from 'next/font/google'

/**
 * Configure your fonts here.
 * The exported fonts are applied in the locale root layout.
 */

const manrope = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

const fraunces = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
  axes: ['opsz'],
})

export const fontSans = manrope
export const fontMono = geistMono
export const fontHeading = fraunces
