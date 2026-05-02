'use client'

import { useNotificationSound } from '@/hooks/useSound'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Footer() {
  const { playNotification } = useNotificationSound()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    playNotification()
    setEmail('')
    setTimeout(() => setSubscribed(false), 3500)
  }

  return (
    <footer className="bg-[#005C38] text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-[52px] h-[52px] flex items-center justify-center group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                <img src="/favicon (2).png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <h1 className="text-[17px] font-black text-white tracking-[-0.03em] leading-[1.1]" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                  নূরজাহান <span className="text-[#ff6b35]">প্রাইভেট হাসপাতাল</span>
                </h1>
                <span className="text-[9px] font-bold text-[#ff6b35] uppercase tracking-[0.16em] mt-1 italic">& ডায়াগনস্টিক সেন্টার ২</span>
              </div>
            </Link>
            <p className="text-sm text-green-50 leading-relaxed max-w-xs">
              অত্যাধুনিক চিকিৎসা প্রযুক্তি এবং মানবিক দৃষ্টিভঙ্গির মাধ্যমে স্বাস্থ্যসেবাকে সর্বোচ্চ পর্যায়ে নিয়ে যাওয়া। কুমারখালীর মানুষের আস্থার অন্যতম প্রতীক।
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#ff6b35] transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>গুরুত্বপূর্ণ লিংঙ্ক</h4>
            <ul className="space-y-4 text-sm text-green-50 font-medium">
              {[
                { name: 'আমাদের সম্পর্কে', href: '#about' },
                { name: 'যোগাযোগ', href: '/contact' },
                { name: 'চিকিৎসা সেবাসমূহ', href: '#services' },
                { name: 'আমাদের বিশেষজ্ঞগণ', href: '#specialists' },
                { name: 'হেলথ ব্লগ', href: '#blog' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#ff6b35] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>যোগাযোগের ঠিকানা</h4>
            <ul className="space-y-4 text-sm text-green-50 font-medium">
               <li className="flex items-start gap-3">
                  <div className="w-5 h-5 translate-y-0.5 text-[#ff6b35]">📍</div>
                  <span>পান্টি বাজার, কুমারখালী,<br />কুষ্টিয়া, বাংলাদেশ</span>
               </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#ff6b35]">📞</div>
                  <div className="flex flex-col">
                    <span>০১৭১৮-৯৫৪৫৬৭</span>
                    <span>০১৭২২-৪১৪০২৫</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-green-50">
                  <div className="w-5 h-5 text-[#ff6b35]">📧</div>
                  <span className="break-all font-medium">nurjahanprivatehospital@gmail.com</span>
                </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscribe with notification sound */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>নিউজলেটার</h4>
            <p className="text-sm text-green-50">স্বাস্থ্য টিপস ও হাসপাতালের আপডেট পেতে subscribe করুন।</p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল ঠিকানা"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-green-100/60 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#ff6b35]/60 transition-colors"
                style={{ fontFamily: "'Anek Bangla', sans-serif" }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-[#ff6b35]/20"
                style={{ fontFamily: "'Anek Bangla', sans-serif" }}
              >
                সাবস্ক্রাইব করুন 🔔
              </motion.button>
            </form>

            {/* Success notification */}
            <AnimatePresence>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-2.5 rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  সফলভাবে subscribe হয়েছে! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        <div className="border-t border-white/10 mt-20 pt-10 text-center">
          <p className="text-xs text-green-100/60 italic">© ২০২৫ নূরজাহান প্রাইভেট হাসপাতাল অ্যান্ড ডায়াগনস্টিক সেন্টার - ২। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}
