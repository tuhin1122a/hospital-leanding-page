import Image from 'next/image'
import Link from 'next/link'

export default function SpecialistSection() {
  const doctors = [
    {
      id: 'shamim-ahmed',
      name: 'Dr. Shamim Ahmed',
      role: 'Senior Consultant & proprietor',
      specialty: 'Medical Specialist',
      image: '/doctor-1.jpg'
    },
    {
       id: 'sarah-rahman',
       name: 'Dr. Sarah Rahman',
       role: 'Consultant',
       specialty: 'Cardiology Specialist',
       image: '/medical-team-1.png'
    },
    {
       id: 'faisal-karim',
       name: 'Dr. Faisal Karim',
       role: 'Consultant Surgeons',
       specialty: 'Orthopedic Surgery',
       image: '/medical-team-2.png'
    }
  ]

  return (
    <section id="specialists" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20 space-y-4">
           <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]">Our Medical Team</h4>
           <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tight">
              Meet Our <span className="text-[#1a4bde]">Specialist Doctors</span>
           </h2>
           <p className="text-[#64748b] font-medium max-w-2xl mx-auto">
              Our team of highly qualified consultants and medical professionals are dedicated to providing world-class healthcare at Nurjahan Hospital-2.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.map((doc, i) => (
            <Link key={i} href={`/doctors/${doc.id}`} className="group relative block">
               <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-4">
                  <Image src={doc.image} alt={doc.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b4d]/90 via-[#0a1b4d]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Content Card */}
                  <div className="absolute inset-x-6 bottom-8 p-6 bg-white/10 backdrop-blur-2xl rounded-[24px] border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                     <p className="text-[10px] font-bold text-[#1a4bde] bg-white px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-wider">{doc.specialty}</p>
                     <h3 className="text-2xl font-bold text-white mb-1">{doc.name}</h3>
                     <p className="text-sm text-white/70 font-medium">{doc.role}</p>
                  </div>
               </div>

               {/* Hover Ring effect */}
               <div className="absolute -inset-2 border-2 border-[#1a4bde]/0 rounded-[45px] transition-all duration-700 group-hover:border-[#1a4bde]/20 opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
           <Link href="/doctors">
              <button className="px-10 h-[60px] rounded-2xl bg-[#0a1b4d] text-white font-bold shadow-xl shadow-[#0a1b4d]/20 hover:bg-[#1a4bde] hover:scale-105 active:scale-95 transition-all cursor-pointer">
                 View All Specialist
              </button>
           </Link>
        </div>
      </div>
    </section>
  )
}

