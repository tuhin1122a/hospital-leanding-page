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
    <footer className="bg-[#011632] text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-[52px] h-[52px] flex items-center justify-center group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                <img src="/favicon (2).png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <h1 className="text-[17px] font-black text-white tracking-[-0.03em] leading-[1.1]">
                  Nurjahan <span className="text-primary">Private Hospital</span>
                </h1>
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.16em] mt-1 italic">&Diagnostic Center 2</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Optimizing healthcare through cutting-edge medical technology and a human-centric approach. Trusted by the community of Kumarkhali.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Services</h4>
            <ul className="space-y-4 text-sm text-zinc-400 font-medium">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Medical Services', href: '#services' },
                { name: 'Our Specialists', href: '#specialists' },
                { name: 'Health Blog', href: '#blog' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Contact Info</h4>
            <ul className="space-y-4 text-sm text-zinc-400 font-medium">
               <li className="flex items-start gap-3">
                  <div className="w-5 h-5 translate-y-0.5 text-primary">📍</div>
                  <span>Panti, Kumarkhali,<br />Kushtia, Bangladesh</span>
               </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 text-primary">📞</div>
                  <div className="flex flex-col">
                    <span>01722-414025</span>
                    <span>01718-955467</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="w-5 h-5 text-primary">📧</div>
                  <span className="break-all font-medium">nurjahanprivatehospital2@gmail.com</span>
                </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscribe with notification sound */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Newsletter</h4>
            <p className="text-sm text-zinc-400">স্বাস্থ্য টিপস ও হাসপাতালের আপডেট পেতে subscribe করুন।</p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-zinc-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary/60 transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
                Subscribe 🔔
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
          <p className="text-xs text-zinc-500 italic">© 2026 Nurjahan Private Hospital & Diagnostic Center - 2. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
