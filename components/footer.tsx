'use client'

import { ArrowRight, Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-3xl font-bold mb-4">Stay healthy with our newsletter</h3>
              <p className="text-zinc-400">Get the latest health tips, medical news, and hospital updates delivered to your inbox.</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input placeholder="Enter your email" className="h-14 bg-white/5 border-white/10 rounded-xl focus:ring-primary" />
              <Button className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-bold text-lg">CP</span>
                </div>
                <h3 className="text-3xl font-black tracking-tighter">CarePulse</h3>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-sm">
                Redefining the standards of healthcare with precision, compassion, and innovation since 1998.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center border border-white/5">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-zinc-100 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4">
                {['Services', 'Departments', 'Doctors', 'Testimonials', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link href={`#${link.toLowerCase()}`} className="text-zinc-400 hover:text-primary transition-colors flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-6 text-zinc-100 uppercase tracking-widest text-xs">Medical Centers</h4>
              <ul className="space-y-4">
                {['Heart Institute', 'Neuro Science', 'Trauma Center', 'Cancer Care', 'Wellness'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-6 text-zinc-100 uppercase tracking-widest text-xs">Get in touch</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-bold text-zinc-100">+91-11-4567-8900</p>
                    <p className="text-xs text-zinc-500 uppercase font-black">24/7 Support Line</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-bold text-zinc-100">info@carepulse.com</p>
                    <p className="text-xs text-zinc-500 uppercase font-black">Official Email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-sm">&copy; 2024 CarePulse Hospital. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-zinc-500 font-medium">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Use</Link>
              <Link href="#" className="hover:text-white transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
