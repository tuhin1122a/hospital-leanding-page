import Header from '@/components/header'
import Footer from '@/components/footer'
import SpecialistSection from '@/components/doctors'

export default function DoctorsDirectoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-16 bg-[#f8faff] text-center">
        <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] tracking-tight mb-6">
           Our <span className="text-[#1a4bde]">Specialists</span>
        </h1>
        <p className="text-[#64748b] text-xl font-medium max-w-3xl mx-auto">
          Access the best medical minds in Kumarkhali. From senior consultants to modern surgeons, our team is ready to serve you.
        </p>
      </div>

      <SpecialistSection />

      <Footer />
    </main>
  )
}
