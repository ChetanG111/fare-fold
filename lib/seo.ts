import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/utils'
import { getBrandConfig } from '@/config/branding'

const brandConfig = getBrandConfig()

export const siteConfig = {
  name: brandConfig.name,
  description:
    'FareFold books flexible flights, tracks fare drops, and rebooks automatically so travelers keep the savings.',
  url: getBaseUrl(),
  twitterHandle: '@farefold',
  creator: 'FareFold',
  keywords: [
    'FareFold',
    'flight price tracking',
    'refundable flights',
    'automatic flight rebooking',
    'fare drop alerts',
    'travel savings',
    'airfare tracking',
    'flight refund tracker',
  ],
} as const

export type SEOOptions = {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
  isRootLayout?: boolean
  allowCanonicalQuery?: boolean
}

const getAbsoluteUrl = (path: string): string => {
  const trimmed = path.trim()
  const isAbsolute = /^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')

  if (isAbsolute) {
    return trimmed
  }

  const baseUrl = getBaseUrl().replace(/\/$/, '')
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  return `${baseUrl}${cleanPath}`
}

const normalizeCanonicalPath = (canonicalPath?: string, allowQuery?: boolean) => {
  if (!canonicalPath) {
    return canonicalPath
  }

  const [withoutHash] = canonicalPath.split('#')

  if (allowQuery) {
    return withoutHash
  }

  const [withoutQuery] = withoutHash.split('?')

  return withoutQuery
}

const getOpenGraph = (options: SEOOptions) => {
  const imageUrl = options.image || '/opengraph-image.png'

  return {
    type: options.type || 'website',
    url: options.canonical ? getAbsoluteUrl(options.canonical) : siteConfig.url,
    title: options.title || siteConfig.name,
    description: options.description || siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: imageUrl,
        ...(options.imageAlt && { alt: options.imageAlt }),
      },
    ],
    ...(options.publishedTime && { publishedTime: options.publishedTime }),
    ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    ...(options.authors && { authors: options.authors }),
  }
}

const getTwitterCard = (options: SEOOptions) => {
  const imageUrl = options.image || '/twitter-image.png'

  return {
    card: 'summary_large_image' as const,
    title: options.title || siteConfig.name,
    description: options.description || siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [imageUrl],
  }
}

export const generateMetadata = (options: SEOOptions = {}): Metadata => {
  const description = options.description || siteConfig.description
  const keywords = options.keywords || siteConfig.keywords
  const normalizedCanonicalPath = normalizeCanonicalPath(
    options.canonical,
    options.allowCanonicalQuery
  )
  const canonicalUrl = normalizedCanonicalPath
    ? getAbsoluteUrl(normalizedCanonicalPath)
    : siteConfig.url

  const titleMetadata = options.isRootLayout
    ? {
        absolute: options.title || siteConfig.name,
        template: `%s - ${siteConfig.name}`,
      }
    : options.title || siteConfig.name

  return {
    title: titleMetadata,
    description,
    keywords: keywords.join(', '),
    authors: options.authors
      ? options.authors.map((author) => ({ name: author }))
      : [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: getOpenGraph({
      ...options,
      canonical: normalizedCanonicalPath,
    }),
    twitter: getTwitterCard({
      ...options,
      canonical: normalizedCanonicalPath,
    }),
    robots: {
      index: !options.noindex,
      follow: !options.nofollow,
      googleBot: {
        index: !options.noindex,
        follow: !options.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(options.publishedTime && {
      publicationDate: options.publishedTime,
    }),
    ...(options.modifiedTime && {
      modificationDate: options.modifiedTime,
    }),
  }
}

export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: getAbsoluteUrl('/image.png'),
    sameAs: [],
  }
}

export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  }
}

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  }
}

export const getArticleSchema = (options: {
  title: string
  description: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  author?: string
  url: string
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    datePublished: options.publishedTime,
    ...(options.modifiedTime && { dateModified: options.modifiedTime }),
    author: {
      '@type': 'Person',
      name: options.author || siteConfig.creator,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/image.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getAbsoluteUrl(options.url),
    },
  }
}

export const getBlogSchema = (options: {
  name: string
  description: string
  url: string
  posts: Array<{
    title: string
    url: string
    datePublished: string
    author?: string
  }>
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: options.name,
    description: options.description,
    url: getAbsoluteUrl(options.url),
    blogPost: options.posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: getAbsoluteUrl(post.url),
      datePublished: post.datePublished,
      ...(post.author && {
        author: {
          '@type': 'Person',
          name: post.author,
        },
      }),
    })),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/image.png'),
      },
    },
  }
}
