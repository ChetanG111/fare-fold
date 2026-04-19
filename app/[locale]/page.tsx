import CTA from './(site)/cta'
import FAQ from './(site)/faq'
import Features from './(site)/features'
import Footer from './(site)/footer'
import Hero from './(site)/hero'
import { GridLayout } from './(site)/grid-layout'
import Navbar from './(site)/navbar'
import Pricing from './(site)/pricing'
import Testimonials from './(site)/testimonials'

export default function Page() {
  return (
    <GridLayout>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </GridLayout>
  )
}
