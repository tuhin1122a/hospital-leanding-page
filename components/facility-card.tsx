import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Facility {
  id: string
  name: string
  tech: string
  desc: string
  image: string
  icon: ReactNode
}

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link href={`/facilities/${facility.id}`} className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-700 group flex flex-col md:flex-row block h-full">
      <div className="md:w-1/2 min-h-[300px] relative overflow-hidden">
        <Image src={facility.image} alt={facility.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b4d]/40 to-transparent" />
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-[#1a4bde]/10 transition-colors">
          {facility.icon}
        </div>
        <div>
           <h4 className="text-[10px] font-black text-[#1a4bde] uppercase tracking-[0.2em] mb-1">{facility.tech}</h4>
           <h3 className="text-2xl font-black text-[#0a1b4d] tracking-tight leading-none">{facility.name}</h3>
        </div>
        <p className="text-sm text-[#64748b] leading-relaxed font-medium">
          {facility.desc}
        </p>
        <div className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.1em] border-b-2 border-[#1a4bde]/20 group-hover:border-[#1a4bde] transition-all w-fit cursor-pointer translate-y-2">
          Learn about Tech
        </div>
      </div>
    </Link>
  )
}
