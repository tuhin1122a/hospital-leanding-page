'use client'

import { Activity, HeartPulse, Layers, Mic, ShieldCheck, Target } from 'lucide-react'
import Link from 'next/link'
import { ServiceCard } from './service-card'
import { Button } from './ui/button'

export default function Services() {
  const services = [
    {
      id: 'emergency-icu',
      title: 'ইমার্জেন্সি আইসিইউ (২৪/৭)',
      desc: 'লাইফ-সাপোর্ট সিস্টেম এবং মাল্টি-প্যারামিটার মনিটরিং সমৃদ্ধ আধুনিক ইনটেনসিভ কেয়ার ইউনিট।',
      bg: 'bg-[#F2F5FF]',
      image: '/icu-monitor.png',
      icon: <Activity className="text-primary w-5 h-5" />
    },
    {
      id: 'diagnostic-lab',
      title: 'অ্যাডভান্সড ডায়াগনস্টিক ল্যাব',
      desc: 'সব ধরনের ক্লিনিক্যাল প্যাথলজি টেস্টের জন্য আমাদের হাই-টেক অটোমেটেড মেশিনের মাধ্যমে সঠিক রিপোর্ট।',
      bg: 'bg-[#F7F2FF]',
      image: '/specialist-doctors.png',
      icon: <ShieldCheck className="text-purple-500 w-5 h-5" />
    },
    {
      id: 'operation-theater',
      title: 'আধুনিক অপারেশন থিয়েটার',
      desc: 'প্রিমিয়াম অ্যানেসথেসিয়া এবং অত্যাধুনিক সার্জিক্যাল যন্ত্রপাতি সমৃদ্ধ সম্পূর্ণ জীবাণুমুক্ত অপারেশন থিয়েটার।',
      bg: 'bg-[#F2F9FF]',
      image: '/medical-team-2.png',
      icon: <Mic className="text-blue-400 w-5 h-5" />
    },
    {
      id: 'digital-imaging',
      title: 'ডিজিটাল এক্স-রে ও ইমেজিং',
      desc: 'রোগ নির্ণয়ের জন্য উচ্চ রেজোলিউশনের ডিজিটাল এক্স-রে এবং ফোরডি (4D) কালার আলট্রাসনোগ্রাফি।',
      bg: 'bg-[#F9F2FF]',
      image: '/mri-machine.png',
      icon: <Layers className="text-indigo-400 w-5 h-5" />
    },
    {
      id: 'pediatric-care',
      title: 'শিশু ও নবজাতক যত্ন',
      desc: 'অত্যাধুনিক চিকিৎসা যন্ত্রপাতির সাহায্যে শিশু এবং নবজাতকদের জন্য বিশেষায়িত নিবিড় পরিচর্যা।',
      bg: 'bg-[#F2F2FF]',
      image: '/medical-team-1.png',
      icon: <HeartPulse className="text-blue-600 w-5 h-5" />
    },
    {
      id: 'recovery-rooms',
      title: 'প্রিমিয়াম রিকভারি রুম',
      desc: 'রোগীর দ্রুত সুস্থতার জন্য আরামদায়ক, স্বাস্থ্যসম্মত এবং প্রিমিয়াম কেবিন সুবিধা।',
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


