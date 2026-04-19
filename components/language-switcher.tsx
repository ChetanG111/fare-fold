'use client'

import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

type Locale = (typeof routing.locales)[number]

const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Francais',
  es: 'Espanol',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm font-medium text-muted-foreground'>Language:</span>
      <select
        aria-label='Select language'
        className='rounded-md border border-[#E4E4E7] bg-white px-3 py-1.5 font-medium text-foreground text-sm transition-colors duration-200 ease-in-out hover:border-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        onChange={(event) => handleLocaleChange(event.target.value as Locale)}
        value={locale}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  )
}
