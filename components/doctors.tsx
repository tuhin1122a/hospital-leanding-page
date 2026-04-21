'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { DoctorCard } from './doctor-card'

export default function SpecialistSection() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
        if (res.ok) {
          const data = await res.json()
          // Only show active doctors on landing page
          setDoctors(data.filter((d: any) => d.doctorProfile?.isActive).slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  if (isLoading) return null;

  return (
    <section id="specialists" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20 space-y-4">
           <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]">আমাদের মেডিকেল টিম</h4>
           <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tighter" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              আমাদের <span className="text-[#1a4bde] italic">বিশেষজ্ঞ ডাক্তারদের</span> সাথে পরিচিত হোন
           </h2>
           <p className="text-[#64748b] font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              নূরজাহান হাসপাতাল-২ তে আমাদের অত্যন্ত যোগ্যতাসম্পন্ন কনসালটেন্ট এবং মেডিকেল পেশাদারদের টিম বিশ্বমানের স্বাস্থ্যসেবা প্রদানে নিবেদিত।
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, i) => (
            <DoctorCard key={i} doctor={doc} />
          ))}
        </div>

        <div className="mt-20 text-center">
           <Link href="/doctors">
              <button className="px-10 h-[64px] rounded-xl bg-[#0a1b4d] text-white font-bold shadow-[0_12px_30px_rgba(10,27,77,0.15)] border-0 text-[16px] hover:bg-[#1a4bde] hover:scale-102 active:scale-95 transition-all cursor-pointer" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                 সকল বিশেষজ্ঞ ডাক্তারদের তালিকা দেখুন
              </button>
           </Link>
        </div>
      </div>
    </section>
  )
}


