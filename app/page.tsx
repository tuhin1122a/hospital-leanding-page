import Contact from '@/components/contact'
import Departments from '@/components/departments'
import Doctors from '@/components/doctors'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Testimonials from '@/components/testimonials'
import WhyChooseUs from '@/components/why-choose-us'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Departments />
      <Doctors />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
