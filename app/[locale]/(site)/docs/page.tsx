import Footer from '../footer'
import { GridLayout } from '../grid-layout'
import Navbar from '../navbar'
import { Link } from '@/i18n/navigation'
import { getAllMDX } from '@/lib/mdx'

export async function generateMetadata() {
  return {
    title: 'Documentation - FareFold',
    description: 'Learn how FareFold works.',
  }
}

export default async function DocsPage() {
  const docs = await getAllMDX('docs')

  return (
    <GridLayout>
      <Navbar />
      <main className='py-20 md:py-24'>
        <div className='farefold-shell max-w-4xl'>
          <p className='text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#8f2f24]'>
            Guides
          </p>
          <h1 className='farefold-heading mt-4 text-[46px] font-bold leading-[0.96] md:text-[72px]'>
            Documentation
          </h1>
          <p className='mt-5 max-w-2xl text-lg text-[#6d6259]'>
            Everything you need to understand refundable fare tracking, rebooking guardrails, and
            trip savings workflows.
          </p>

          <div className='mt-12 grid gap-4 md:grid-cols-2'>
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className='farefold-card group p-6 transition hover:-translate-y-0.5 hover:bg-[#fffdf8]'
              >
                <h2 className='text-xl font-bold tracking-tight text-[#3b332d] group-hover:text-[#8f2f24]'>
                  {doc.meta.title}
                </h2>
                <p className='mt-2 text-sm text-[#6d6259]'>{doc.meta.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </GridLayout>
  )
}
