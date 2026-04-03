import Link from 'next/link'
import { DoctorCard } from './doctor-card'

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
    },
    {
       id: 'nusrat-jahan',
       name: 'Dr. Nusrat Jahan',
       role: 'Consultant Specialist',
       specialty: 'Gynecology & Obs',
       image: '/hero-doctor.png'
    }
  ]

  return (
    <section id="specialists" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20 space-y-4">
           <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]">Our Medical Team</h4>
           <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tighter">
              Meet Our <span className="text-[#1a4bde] italic">Specialist Doctors</span>
           </h2>
           <p className="text-[#64748b] font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              Our team of highly qualified consultants and medical professionals are dedicated to providing world-class healthcare at Nurjahan Hospital-2.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, i) => (
            <DoctorCard key={i} doctor={doc} />
          ))}
        </div>

        <div className="mt-20 text-center">
           <Link href="/doctors">
              <button className="px-10 h-[64px] rounded-xl bg-[#0a1b4d] text-white font-bold shadow-[0_12px_30px_rgba(10,27,77,0.15)] border-0 text-[16px] hover:bg-[#1a4bde] hover:scale-102 active:scale-95 transition-all cursor-pointer">
                 Explore Full Specialist Panel
              </button>
           </Link>
        </div>
      </div>
    </section>
  )
}

