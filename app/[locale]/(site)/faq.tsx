'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQ() {
  const faqs = [
    {
      question: "What's included in the free version?",
      answer:
        "Everything you need to build: a full Next.js boilerplate with auth, payments, UI, SEO, and transactional emails. It's free forever under the MIT license.",
    },
    {
      question: "What's in the pro version?",
      answer:
        'Pro adds one-click deploys, a CLI tool, advanced auth (roles & invites), automated emails, analytics hooks, lifetime updates, and priority support — built for founders who want to launch fast.',
    },
    {
      question: "Do I lose access to the free version if I don't upgrade?",
      answer:
        'Nope. The free version stays open source and always available. Pro just saves you time and setup pain.',
    },
    {
      question: 'Is it really a one-time payment?',
      answer: 'Yep. $90 lifetime access. No subscriptions, no renewal fees, ever.',
    },
    {
      question: 'Can I use it for commercial products?',
      answer: 'Yes — both free and pro can be used to build and sell your own projects.',
    },
    {
      question: 'What if I find a bug or issue?',
      answer:
        'Open an issue on GitHub or drop it in the Discord — we fix bugs fast, and pro users get priority patches + updates.',
    },
    {
      question: 'Can I upgrade later?',
      answer:
        "Absolutely. You can start free, and when you're ready to go pro, your setup stays compatible.",
    },
    {
      question: 'How often do you ship updates?',
      answer:
        'Bug fixes and small updates drop regularly; pro users get early access to new templates and features.',
    },
    {
      question: 'What support does pro include?',
      answer:
        "Private Discord, priority replies, and lifetime updates. You'll never be stuck figuring things out alone.",
    },
  ]

  return (
    <section id='faq' className='py-12 md:py-24 border-t border-b border-[#E4E4E7] bg-[#F4F4F5]'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <h2
          className='text-center text-sm font-medium text-muted-foreground mb-8'
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          FAQ
        </h2>
        <div className='flex flex-col items-center gap-8 max-w-2xl mx-auto'>
          {/* Header Section */}
          <div className='text-center'>
            <h2 className='text-3xl font-semibold tracking-tight mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-base text-muted-foreground'>
              Have another question? Contact us on{' '}
              <Link
                href='https://x.com/kyronhq'
                target='_blank'
                rel='noopener noreferrer'
                className='text-foreground underline underline-offset-4 hover:text-primary transition-colors'
              >
                Twitter
              </Link>
              .
            </p>
          </div>

          {/* FAQ Items */}
          <div className='w-full'>
            <Accordion className='space-y-0'>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} className='border-b border-[#E4E4E7] last:border-b-0'>
                  <AccordionTrigger className='text-left py-4 text-base font-medium hover:no-underline'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionPanel className='text-muted-foreground text-sm pb-4'>
                    {faq.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
