import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#011632] text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-[52px] h-[52px] bg-gradient-to-tr from-primary to-primary/80 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:rotate-6 transition-all duration-500">
                <span className="text-white font-bold text-2xl group-hover:scale-110 transition-transform">+</span>
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
              {['About Us', 'Contact Us', 'Medical Services', 'Our Specialists'].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-primary transition-colors">{link}</Link>
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
                  <span>+880 1XXX-XXXXXX</span>
               </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="space-y-6">
             <h4 className="text-lg font-bold">Opening Hours</h4>
             <ul className="space-y-4 text-sm text-zinc-400 font-medium">
               <li className="flex justify-between">
                  <span>Sat - Thu</span>
                  <span className="text-primary font-bold">24 Hours</span>
               </li>
               <li className="flex justify-between">
                  <span>Emergency</span>
                  <span className="text-primary font-bold">Always Open</span>
               </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-20 pt-10 text-center">
          <p className="text-xs text-zinc-500 italic">© 2026 Nurjahan Private Hospital & Diagnostic Center - 2. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
