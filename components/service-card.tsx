import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Service {
  id: string
  title: string
  desc: string
  bg: string
  image: string
  icon: ReactNode
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className={`${service.bg} rounded-xl overflow-hidden flex flex-col hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.05)] hover:border-primary/20 transition-all duration-500 group border border-white/40 block h-full`}
    >
      <div className="h-[220px] relative overflow-hidden">
        <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011632]/30 to-transparent" />
        <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.04)] group-hover:rotate-12 transition-all duration-500">
          {service.icon}
        </div>
      </div>

      <div className="p-8 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-3">
          <h3 className="text-xl font-black text-[#011632] leading-tight">
            {service.title}
          </h3>
          <p className="text-[13px] text-[#64748b] leading-relaxed font-medium opacity-90">
            {service.desc}
          </p>
        </div>
        <div className="text-[13px] font-black text-primary flex items-center gap-1 w-fit group-hover:translate-x-1.5 transition-transform">
          Explore Service Details
        </div>
      </div>
    </Link>
  )
}
