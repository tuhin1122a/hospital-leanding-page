import Image from 'next/image'
import { Button } from './ui/button'

export default function AboutServices() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#011632] tracking-tight leading-tight">
                About Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Optimizing healthcare through cutting-edge medical technology and a human-centric approach. Trusted by millions for over 25 years. This service is dedicated to providing high-quality care for every patient.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Healthcare through cutting-edge medical technology and a human-centric approach. Trusted by millions for over 25 years.
              </p>
            </div>

            <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-10 py-6 transition-all shadow-lg shadow-secondary/20">
              Discover More
            </Button>
          </div>

          {/* Right Images (Overlapping like in design) */}
          <div className="relative">
             <div className="relative z-10 w-4/5 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-8 border-white">
                <Image src="/medical-team-1.png" alt="Medical Team" fill className="object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-3/5 aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-20">
                <Image src="/medical-team-2.png" alt="Doctors" fill className="object-cover" />
             </div>
             {/* Decorative UI element */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
