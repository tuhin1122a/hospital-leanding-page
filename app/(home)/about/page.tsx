import Header from '@/components/header'
import Footer from '@/components/footer'
import AboutServices from '@/components/features'
import Stats from '@/components/stats'
import TrustedBy from '@/components/trusted-by'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-16 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-[#0a1b4d] tracking-tight mb-6">
            Our <span className="text-[#1a4bde]">Story</span>
          </h1>
          <p className="text-[#64748b] text-xl font-medium max-w-3xl mx-auto">
            Learn about the journey of Nurjahan Private Hospital & Diagnostic Center - 2 and our unwavering commitment to the health of our community.
          </p>
        </div>
      </div>
      
      <AboutServices />
      <Stats />
      
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-8">
           <h2 className="text-4xl font-black text-[#0a1b4d]">Integrity · Compassion · Excellence</h2>
           <p className="text-[#64748b] text-lg leading-relaxed font-medium">
             Our values represent our promise to every patient who walks through our doors. We believe that professional healthcare should be accessible, high-tech, and deeply human. 
           </p>
        </div>
      </section>

      <TrustedBy />
      <Footer />
    </main>
  )
}
