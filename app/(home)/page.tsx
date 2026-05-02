
import SpecialistSection from '@/components/doctors'; // Re-purposed
import FAQ from '@/components/faq';
import AboutServices from '@/components/features'; // Re-purposed as About
import Hero from '@/components/hero';
import SharedCommitment from '@/components/how-it-works'; // Re-purposed
import LocationMap from '@/components/location-map';
import ScrollReveal from '@/components/scroll-reveal'; // Added ScrollReveal
import Services from '@/components/services';
import Testimonials from '@/components/testimonials';
import PhotoGallery from '@/components/gallery';
import Management from '@/components/management';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ScrollReveal>
        <Services />
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
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <Management />
      </ScrollReveal>
      <ScrollReveal>
        <PhotoGallery previewOnly={true} />
      </ScrollReveal>
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>

      <ScrollReveal>
        <div id="location">
          <LocationMap />
        </div>
      </ScrollReveal>
    </main>
  )
}
