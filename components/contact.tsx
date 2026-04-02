import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function ScheduleSection() {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Doctor Image with Opening Time */}
          <div className="relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src="/masked-doctor.png" alt="Schedule doctor" fill className="object-cover" />
              
              {/* Opening Time Overlay */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
                <h4 className="text-xl font-bold text-primary mb-4">Opening time</h4>
                <div className="space-y-2 text-sm font-semibold text-[#011632]">
                  <div className="flex justify-between border-b pb-2">
                    <span>Sunday</span>
                    <span>08:00 am - 10:00 pm</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span>Friday</span>
                    <span>08:00 am - 04:00 pm</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0"></div>
          </div>

          {/* Right: Contact Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#011632] tracking-tight leading-tight">
                Schedule <span className="text-primary">A Call With Us</span> <br />
                Convincing <span className="text-primary">Slogan</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Optimizing healthcare through cutting-edge medical technology and a human-centric approach. Trusted by millions for over 25 years.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" className="h-14 bg-[#F9FAFB] border-none rounded-xl" />
                <Input placeholder="Last Name" className="h-14 bg-[#F9FAFB] border-none rounded-xl" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Phone Number" className="h-14 bg-[#F9FAFB] border-none rounded-xl" />
                <Input placeholder="Email" className="h-14 bg-[#F9FAFB] border-none rounded-xl" />
              </div>
              <Input placeholder="Messages" className="h-24 bg-[#F9FAFB] border-none rounded-xl align-top pt-4" />
              
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-12 py-7 transition-all shadow-lg shadow-secondary/20">
                Discover More
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
