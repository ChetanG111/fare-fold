import type { MetadataRoute } from 'next'
import { getBrandConfig } from '@/config/branding'

export default function manifest(): MetadataRoute.Manifest {
  const brand = getBrandConfig()

  return {
    name: brand.name,
    short_name: brand.name,
    description:
      'FareFold books flexible flights, tracks fare drops, and rebooks automatically so travelers keep the savings.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fbf7f0',
    theme_color: '#8f2f24',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/image.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/image.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['travel', 'finance', 'productivity'],
    shortcuts: [
      {
        name: 'Open dashboard',
        short_name: 'Dashboard',
        description: 'Go to your FareFold dashboard',
        url: '/dashboard',
      },
    ],
    lang: 'en-US',
    dir: 'ltr',
  }
}
