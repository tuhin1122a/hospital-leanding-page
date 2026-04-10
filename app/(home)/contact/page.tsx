import ContactSection from '@/components/contact'
import Header from '@/components/header'
import LocationMap from '@/components/location-map'

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-16 bg-[#f8faff] text-center">
        <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] tracking-tight mb-6">
           Contact <span className="text-[#1a4bde]">Us</span>
        </h1>
        <p className="text-[#64748b] text-xl font-medium max-w-2xl mx-auto">
          We’re here to help you around the clock. Contact us for any query, emergency, or medical consultation request.
        </p>
      </div>

      <ContactSection />
      <LocationMap />
    </main>
  )
}
