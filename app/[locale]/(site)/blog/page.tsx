import Footer from '../footer'
import { GridLayout } from '../grid-layout'
import Navbar from '../navbar'
import { Link } from '@/i18n/navigation'
import { getAllMDX } from '@/lib/mdx'

export async function generateMetadata() {
  return {
    title: 'Blog - FareFold',
    description: 'Travel pricing notes from FareFold.',
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' | 'es' }>
}) {
  const { locale } = await params
  const posts = await getAllMDX('blog')

  return (
    <GridLayout>
      <Navbar />
      <main className='py-20 md:py-24'>
        <div className='farefold-shell max-w-5xl'>
          <p className='text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#8f2f24]'>
            Notes
          </p>
          <h1 className='farefold-heading mt-4 text-[46px] font-bold leading-[0.96] md:text-[72px]'>
            Blog
          </h1>
          <p className='mt-5 max-w-2xl text-lg text-[#6d6259]'>
            Fare tracking lessons, refundable ticket strategy, and product updates from the FareFold
            team.
          </p>

          <div className='mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className='farefold-card group flex min-h-[260px] flex-col p-6 transition hover:-translate-y-0.5 hover:bg-[#fffdf8]'
              >
                <time className='text-xs font-bold text-[#6d6259]' dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className='mt-5 text-xl font-bold tracking-tight text-[#3b332d] group-hover:text-[#8f2f24]'>
                  {post.meta.title}
                </h2>
                <p className='mt-4 line-clamp-4 text-sm text-[#6d6259]'>{post.meta.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </GridLayout>
  )
}
