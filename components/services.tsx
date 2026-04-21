'use client'

import { Activity, HeartPulse, Layers, Mic, ShieldCheck, Target } from 'lucide-react'
import Link from 'next/link'
import { ServiceCard } from './service-card'
import { Button } from './ui/button'

export default function Services() {
  const services = [
    {
      id: 'emergency-mbbs',
      title: '২৪ ঘণ্টা এমবিবিএস ডাক্তার',
      desc: 'হাসপাতালে ২৪ ঘণ্টা এমবিবিএস ডাক্তার এবং ইমার্জেন্সি চিকিৎসার সুব্যবস্থা রয়েছে।',
      bg: 'bg-[#F2F5FF]',
      image: '/icu-monitor.png',
      icon: <Activity className="text-primary w-5 h-5" />
    },
    {
      id: 'nursing-care',
      title: 'সার্বক্ষনিক নার্স',
      desc: 'রোগীদের সঠিক যত্ন ও সেবা নিশ্চিত করতে আমাদের রয়েছে সার্বক্ষণিক দক্ষ নার্সিং টিম।',
      bg: 'bg-[#F7F2FF]',
      image: '/specialist-doctors.png',
      icon: <ShieldCheck className="text-purple-500 w-5 h-5" />
    },
    {
      id: 'surgery-dept',
      title: 'অভিজ্ঞ সার্জন দ্বারা অপারেশন',
      desc: 'সাফল্যের সাথে সিজার, অ্যাপেনডিস, জরায়ু, ভেজাইনাল ও পিত্তথলিতে পাথরসহ যাবতীয় অপারেশন।',
      bg: 'bg-[#F2F9FF]',
      image: '/medical-team-2.png',
      icon: <Mic className="text-blue-400 w-5 h-5" />
    },
    {
      id: 'pathology-lab',
      title: 'ডিজিটাল প্যাথলজি ল্যাব',
      desc: 'ডায়বেটিস, হরমন, ভিটামিন-ডি সহ রক্তের যাবতীয় টেস্ট ডিজিটাল মেশিনের মাধ্যমে করা হয়।',
      bg: 'bg-[#F9F2FF]',
      image: '/mri-machine.png',
      icon: <Layers className="text-indigo-400 w-5 h-5" />
    },
    {
      id: 'diagnostic-imaging',
      title: 'ডিজিটাল ইমেজিং ও আলট্রা',
      desc: 'আমাদের এখানে ডিজিটাল এক্স-রে এবং ডিজিটাল আলট্রা মেশিনের মাধ্যমে নিখুঁত রিপোর্ট দেওয়া হয়।',
      bg: 'bg-[#F2F2FF]',
      image: '/medical-team-1.png',
      icon: <HeartPulse className="text-blue-600 w-5 h-5" />
    },
    {
      id: 'heart-checkup',
      title: 'ইসিজি ও ইকো সেন্টার',
      desc: 'আধুনিক মেশিনের সাহায্যে ইসিজি ও ইকো পরীক্ষার মাধ্যমে হার্টের সঠিক অবস্থা নির্ণয় করা হয়।',
      bg: 'bg-[#F2FBFF]',
      image: '/hero-doctor.png',
      icon: <Target className="text-cyan-500 w-5 h-5" />
    }
  ]

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#011632] tracking-tighter" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              আমাদের<span className="text-primary"> সেবা সমূহ</span>
            </h2>
            <Link href="/contact">
              <Button className="mt-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl px-10 py-6 transition-all shadow-[0_12px_25px_rgba(255,107,53,0.25)] border-0 h-fit hover:scale-105 active:scale-95 cursor-pointer" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                সব চিকিৎসা সেবা দেখুন
              </Button>
            </Link>
          </div>
          <p className="text-[#64748b] text-lg max-w-md leading-relaxed font-medium lg:text-right text-balance">
             দীর্ঘ ২৫ বছর ধরে আধুনিক চিকিৎসা প্রযুক্তি এবং মানবিক দৃষ্টিভঙ্গির মাধ্যমে নির্ভরযোগ্য স্বাস্থ্যসেবা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}


