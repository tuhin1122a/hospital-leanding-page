import ScheduleSection from '@/components/contact'; // Re-purposed
import SpecialistSection from '@/components/doctors'; // Re-purposed
import MedicalFacilities from '@/components/facilities';
import AboutServices from '@/components/features'; // Re-purposed as About
import Hero from '@/components/hero';
import SharedCommitment from '@/components/how-it-works'; // Re-purposed
import LocationMap from '@/components/location-map';
import Services from '@/components/services';
import Stats from '@/components/stats';
import Testimonials from '@/components/testimonials';
import ScrollReveal from '@/components/scroll-reveal'; // Added ScrollReveal

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <MedicalFacilities />
      </ScrollReveal>
      <ScrollReveal>
        <SpecialistSection />
      </ScrollReveal>
      <ScrollReveal>
        <AboutServices />
      </ScrollReveal>
      <ScrollReveal>
        <SharedCommitment />
      </ScrollReveal>
      <ScrollReveal>
        <Stats />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      {/* <FAQ /> */}
      <ScrollReveal>
        <ScheduleSection />
      </ScrollReveal>
      <ScrollReveal>
        <LocationMap />
      </ScrollReveal>
    </main>
  )
}
