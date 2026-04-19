'use client'

import { useBrandConfig } from '@/config/branding'
import { useEffect } from 'react'

/**
 * This component applies the theme configuration from `config/branding.ts`
 * to the CSS variables used by Tailwind and the application.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const brandConfig = useBrandConfig()
    const { theme } = brandConfig

    useEffect(() => {
        const root = document.documentElement

        if (theme?.colors) {
            // Apply colors
            Object.entries(theme.colors).forEach(([key, value]) => {
                if (value) {
                    // Check for dark mode overrides if implemented, currently just setting base
                    // This maps keys like 'primary' to '--primary'
                    // We assume hex values are provided, but for OKLCH variables in globals.css,
                    // simply setting the variable might break opacity modifiers if not careful.
                    // However, for simplicity, we override the variable directly.

                    // To support opacity modifiers with hex in Tailwind v4, we might need 
                    // to set the color property, not just the variable component.
                    // But since globals.css uses `var(--primary)`, overriding it works 
                    // for the color value itself.

                    root.style.setProperty(`--${key}`, value)
                }
            })
        }

        if (theme?.radius) {
            root.style.setProperty('--radius', theme.radius)
        }

    }, [theme])

    return <>{children}</>
}
