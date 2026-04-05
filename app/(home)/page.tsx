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

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Services />
      <MedicalFacilities />
      <SpecialistSection />
      <AboutServices />
      <SharedCommitment />
      <Stats />
      <Testimonials />
      {/* <FAQ /> */}
      <ScheduleSection />
      <LocationMap />
    </main>
  )
}
