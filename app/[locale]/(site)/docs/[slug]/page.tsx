
import { getMDXData, getMDXFiles } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export async function generateStaticParams() {
    const files = await getMDXFiles('docs')
    return files.map((file) => ({
        slug: file.replace(/\.mdx$/, ''),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    try {
        const doc = await getMDXData('docs', slug)
        return {
            title: doc.meta.title,
            description: doc.meta.description,
        }
    } catch {
        return {
            title: 'Document Not Found',
        }
    }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let doc
    try {
        doc = await getMDXData('docs', slug)
    } catch {
        notFound()
    }

    return (
        <div className="container mx-auto max-w-4xl py-24 flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 shrink-0 hidden md:block border-r pr-6">
                <div className="sticky top-24">
                    <Link
                        href="/docs"
                        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Wait, Back to Index
                    </Link>
                    <h3 className="font-semibold mb-2">Guides</h3>
                    {/* Ideally we list all docs here for navigation. But for now, simple back link. 
                 If I want a proper sidebar, I should fetch all docs here too.
                 Let's keep it simple for MVP. 
             */}
                    <p className="text-sm text-muted-foreground">
                        Visit the index for more guides.
                    </p>
                </div>
            </aside>
            <article className="flex-1 min-w-0">
                <Link
                    href="/docs"
                    className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground md:hidden"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Docs
                </Link>
                <div className="mb-8 border-b pb-8">
                    <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{doc.meta.title}</h1>
                    <p className="mt-4 text-lg text-muted-foreground">{doc.meta.description}</p>
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MDXRemote source={doc.content} />
                </div>
            </article>
        </div>
    )
}
