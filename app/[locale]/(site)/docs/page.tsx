
import { getAllMDX } from '@/lib/mdx'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Docs' })

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    }
}

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const docs = await getAllMDX('docs')

    return (
        <div className="container mx-auto max-w-4xl py-24">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Documentation</h1>
                <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about KyronHQ.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {docs.map((doc) => (
                    <Link
                        key={doc.slug}
                        href={`/docs/${doc.slug}`}
                        className="group flex flex-col rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary"
                    >
                        <h2 className="text-xl font-bold tracking-tight group-hover:text-primary">
                            {doc.meta.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {doc.meta.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
