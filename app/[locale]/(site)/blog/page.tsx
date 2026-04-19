
import { getAllMDX } from '@/lib/mdx'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Blog' })

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const posts = await getAllMDX('blog')

    return (
        <div className="container mx-auto max-w-4xl py-24">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
                <p className="mt-4 text-lg text-muted-foreground">Latest updates and stories from our team.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="aspect-video w-full bg-muted object-cover transition-colors group-hover:bg-muted/80" />
                        <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                                <time dateTime={post.meta.date}>
                                    {new Date(post.meta.date).toLocaleDateString(locale, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                            <h2 className="mt-4 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                                {post.meta.title}
                            </h2>
                            <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                                {post.meta.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
