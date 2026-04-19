
import { Inter, Roboto_Mono, Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google'

/**
 * Configure your fonts here.
 * The exported fonts will be automatically applied to the application in the root layout.
 * To change fonts, uncomment the desired font and export it as `fontSans` or `fontMono`.
 */

// --- Sans Serif Fonts ---

// 1. Geist Sans (Default)
const geistSans = Geist({
    variable: '--font-sans',
    subsets: ['latin'],
})

// 2. Inter
const inter = Inter({
    variable: '--font-sans',
    subsets: ['latin'],
})

// --- Mono Fonts ---

// 1. Geist Mono (Default)
const geistMono = Geist_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
})

// 2. Roboto Mono
const robotoMono = Roboto_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
})

// --- Heading/Display Fonts ---

const bricolageGrotesque = Bricolage_Grotesque({
    variable: '--font-heading',
    subsets: ['latin'],
})

// EXPORT THE ACTIVE FONTS
// Change the variable assigned to fontSans, fontMono, etc. to switch fonts.

export const fontSans = geistSans
export const fontMono = geistMono
export const fontHeading = bricolageGrotesque
