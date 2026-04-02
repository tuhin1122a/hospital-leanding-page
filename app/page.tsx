import Header from '@/components/header'
import Hero from '@/components/hero'
import AboutServices from '@/components/features' // Re-purposed as About
import SharedCommitment from '@/components/how-it-works' // Re-purposed
import Services from '@/components/services'
import MedicalFacilities from '@/components/facilities'
import Stats from '@/components/stats'
import Testimonials from '@/components/testimonials'
import FAQ from '@/components/faq'
import SpecialistSection from '@/components/doctors' // Re-purposed
import ScheduleSection from '@/components/contact' // Re-purposed
import LocationMap from '@/components/location-map'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AboutServices />
      <SharedCommitment />
      <Services />
      <MedicalFacilities />
      <Stats />
      <Testimonials />
      <FAQ />
      <SpecialistSection />
      <ScheduleSection />
      <LocationMap />
      <Footer />
    </main>
  )
}
