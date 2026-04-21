'use client'

import { Activity, HeartPulse, Layers, Mic, ShieldCheck, Target } from 'lucide-react'
import Link from 'next/link'
import { ServiceCard } from './service-card'
import { Button } from './ui/button'

export default function Services() {
  const services = [
    {
      id: 'mbbs-24h',
      title: '২৪ ঘণ্টা এমবিবিএস ডাক্তার',
      desc: 'হাসপাতালে ২৪ ঘণ্টা এমবিবিএস ডাক্তার এর সুব্যবস্থা রয়েছে।',
      bg: 'bg-[#F2F5FF]',
      image: '/icu-monitor.png',
      icon: <Activity className="text-primary w-5 h-5" />
    },
    {
      id: 'emergency-care',
      title: 'ইমার্জেন্সি সুবিধা',
      desc: 'যেকোনো জরুরি প্রয়োজনে আমাদের ইমার্জেন্সি ইউনিট সর্বদা প্রস্তুত।',
      bg: 'bg-[#F7F2FF]',
      image: '/specialist-doctors.png',
      icon: <ShieldCheck className="text-purple-500 w-5 h-5" />
    },
    {
      id: 'nursing-24h',
      title: 'সার্বক্ষনিক নার্স',
      desc: 'রোগীদের নিবিড় পরিচর্যার জন্য রয়েছে সার্বক্ষণিক দক্ষ নার্স।',
      bg: 'bg-[#F2F9FF]',
      image: '/medical-team-2.png',
      icon: <Mic className="text-blue-400 w-5 h-5" />
    },
    {
      id: 'xray-digital',
      title: 'ডিজিটাল এক্স-রে',
      desc: 'আধুনিক ডিজিটাল এক্স-রে মেশিনের মাধ্যমে নিখুঁত রিপোর্ট প্রদান।',
      bg: 'bg-[#F9F2FF]',
      image: '/mri-machine.png',
      icon: <Layers className="text-indigo-400 w-5 h-5" />
    },
    {
      id: 'usg-digital',
      title: 'ডিজিটাল আলট্রা মেশিন',
      desc: 'উন্নত প্রযুক্তির ডিজিটাল আলট্রাসোনোগ্রাফি সুবিধা।',
      bg: 'bg-[#F2F2FF]',
      image: '/medical-team-1.png',
      icon: <HeartPulse className="text-blue-600 w-5 h-5" />
    },
    {
      id: 'ecg-echo',
      title: 'ইসিজি ও ইকো',
      desc: 'হার্টের সুক্ষ্ণ রোগ নির্ণয়ে আধুনিক ইসিজি ও ইকো পরীক্ষা।',
      bg: 'bg-[#F2FBFF]',
      image: '/hero-doctor.png',
      icon: <Target className="text-cyan-500 w-5 h-5" />
    },
    {
      id: 'pathology-tests',
      title: 'রক্ত ও হরমোন পরীক্ষা',
      desc: 'ভিটামিন-ডি, ডায়বেটিস, হরমন পরীক্ষা সহ রক্তের যাবতীয় টেস্ট।',
      bg: 'bg-[#F2F5FF]',
      image: '/icu-monitor.png',
      icon: <Activity className="text-primary w-5 h-5" />
    },
    {
      id: 'digital-lab',
      title: 'ডিজিটাল প্যাথলজি ল্যাব',
      desc: 'ডিজিটাল মেশিনের মাধ্যমে উন্নত ল্যাবে পরীক্ষা করা হয়।',
      bg: 'bg-[#F7F2FF]',
      image: '/specialist-doctors.png',
      icon: <ShieldCheck className="text-purple-500 w-5 h-5" />
    },
    {
      id: 'surgery-ops',
      title: 'অভিজ্ঞ ডাক্তার দ্বারা অপারেশন',
      desc: 'সিজার, অ্যাপেনডিস, জরায়ু, ভেজাইনাল ও পিত্তথলিতে পাথর অপারেশন।',
      bg: 'bg-[#F2F9FF]',
      image: '/medical-team-2.png',
      icon: <Mic className="text-blue-400 w-5 h-5" />
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
            <Link href="/booking">
              <Button className="mt-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl px-10 py-6 transition-all shadow-[0_12px_25px_rgba(255,107,53,0.25)] border-0 h-fit hover:scale-105 active:scale-95 cursor-pointer" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                অ্যাপয়েন্টমেন্ট বুকিং করুন
              </Button>
            </Link>
          </div>
          <p className="text-[#64748b] text-lg max-w-md leading-relaxed font-medium lg:text-right text-balance">
             আধুনিক চিকিৎসা প্রযুক্তি এবং অভিজ্ঞ চিকিৎসকদের সমন্বয়ে আমরা আপনার সেবায় সর্বদা নিয়োজিত।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        <div className="mt-20 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
           <p className="text-xl font-bold text-[#0a1b4d] italic" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
             "উক্ত হাসপাতাল সুন্দর ভাবে পরিচালনা কাজে সহযোগিতা করার জন্য সকলের নিকট দোয়া প্রার্থী।"
           </p>
        </div>
      </div>
    </section>
  )
}


