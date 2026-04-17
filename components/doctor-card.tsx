import Image from 'next/image'
import Link from 'next/link'

export function DoctorCard({ doctor }: { doctor: any }) {
  const profile = doctor.doctorProfile || {}
  const image = doctor.profilePic || `/doctor-1.jpg`

  return (
    <Link href={`/doctors/${doctor.id}`} className="group relative block">
      <div className="relative aspect-[3/4] rounded-[12px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.07)] border border-gray-100/50 transition-all duration-700 group-hover:-translate-y-4">
        <Image src={image} alt={doctor.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b4d]/85 via-[#0a1b4d]/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Floating Content Card */}
        <div className="absolute inset-x-5 bottom-6 p-5 bg-white/10 backdrop-blur-3xl rounded-[8px] border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
          <p className="text-[10px] font-bold text-[#1a4bde] bg-white px-3 py-1 rounded-full w-fit mb-2.5 uppercase tracking-wider">{profile.specialty || 'General'}</p>
          <h3 className="text-xl font-bold text-white mb-0.5">{doctor.name}</h3>
          <p className="text-[13px] text-white/70 font-medium">{profile.department || 'Medical Specialist'}</p>
        </div>
      </div>

      {/* Hover Ring effect */}
      <div className="absolute -inset-1.5 border-2 border-[#1a4bde]/0 rounded-[16px] transition-all duration-700 group-hover:border-[#1a4bde]/15 opacity-0 group-hover:opacity-100" />
    </Link>
  )
}

