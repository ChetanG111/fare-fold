
import { getMDXData, getMDXFiles } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export async function generateStaticParams() {
    const files = await getMDXFiles('blog')
    // We assume default locale structure or handle per-locale content?
    // For simplicity, content is language-agnostic (English only) for now.
    // Or we need separate folder per locale.
    // I will assume English content for all locales for MVP.
    return files.map((file) => ({
        slug: file.replace(/\.mdx$/, ''),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    try {
        const post = await getMDXData('blog', slug)
        return {
            title: post.meta.title,
            description: post.meta.description,
        }
    } catch {
        return {
            title: 'Blog Post Not Found',
        }
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let post
    try {
        post = await getMDXData('blog', slug)
    } catch {
        notFound()
    }

    return (
        <article className="container mx-auto max-w-3xl py-24">
            <Link
                href="/blog"
                className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Blog
            </Link>
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.meta.title}</h1>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <time dateTime={post.meta.date}>
                        {new Date(post.meta.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    {post.meta.author && <span>by {post.meta.author}</span>}
                </div>
            </div>
            <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none">
                <MDXRemote source={post.content} />
            </div>
        </article>
    )
}
