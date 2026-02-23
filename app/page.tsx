import Contact from '@/components/contact'
import Departments from '@/components/departments'
import Doctors from '@/components/doctors'
import FAQ from '@/components/faq'
import Features from '@/components/features'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import Services from '@/components/services'
import Stats from '@/components/stats'
import Testimonials from '@/components/testimonials'
import TrustedBy from '@/components/trusted-by'
import WhyChooseUs from '@/components/why-choose-us'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Departments />
      <Doctors />
      <TrustedBy />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
