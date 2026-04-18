'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Specialist', href: '#specialists' },
    { name: 'Booking', href: '#contact' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
  ]

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY < 100) setActiveSection('Home')
    }

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const matchingLink = (navLinks || []).find(link => link.href === `#${id}`)
          if (matchingLink) {
            setActiveSection(matchingLink.name)
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Define sections to watch based on navLinks (skipping Home '/')
    const sectionIds = navLinks
      .filter(link => link.href.startsWith('#'))
      .map(link => link.href.substring(1));

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])



  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex flex-col ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]' : 'bg-white/10 backdrop-blur-[2px] border-b border-white/5'}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@600;700;800&family=Hind+Siliguri:wght@500;600;700&display=swap');
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 16s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      
      {/* Top Banner */}
      <div className={`${scrolled ? 'bg-[#005C38]' : 'bg-[#005C38]/60 backdrop-blur-sm'} transition-colors duration-500 text-white w-full flex items-center justify-center border-b border-white/10 min-h-[60px] md:min-h-[80px] py-2`}>
        <div className="flex items-center justify-center px-4 w-full text-white">
          <span className="text-[20px] sm:text-[24px] md:text-[34px] font-bold tracking-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-center leading-tight" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
            নুরজাহান প্রাইভেট হাসপাতাল এন্ড ডায়াগনস্টিক সেন্টার-২
          </span>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-6 lg:px-12 w-full transition-all duration-500 ${scrolled ? 'py-3' : 'py-5 lg:py-7'}`}>
        <div className="flex justify-between items-center text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
            <div className="w-[48px] h-[48px] flex items-center justify-center rotate-[-8deg] group-hover:rotate-0 transition-all duration-500 overflow-hidden">
              <img src="/favicon (2).png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <div className="flex flex-col">
               <h1 className={`text-[17px] font-black transition-colors duration-500 ${scrolled ? 'text-[#0a1b4d]' : 'text-white'} tracking-[-0.04em] leading-[1.1]`}>
                 Nurjahan <span className={scrolled ? 'text-[#1a4bde]' : 'text-blue-300'}>Private Hospital</span>
               </h1>
               <span className={`text-[10px] font-bold transition-colors duration-500 ${scrolled ? 'text-[#1a4bde]' : 'text-white/80'} uppercase tracking-[0.16em] mt-1 opacity-90`}>&Diagnostic Center 2</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
                if (href.startsWith('#')) {
                  const element = document.querySelector(href);
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              };

              return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`text-[14.5px] font-bold transition-all relative group ${scrolled ? (activeSection === link.name ? 'text-[#ff6b35]' : 'text-[#0f172a] hover:text-[#1a4bde]') : (activeSection === link.name ? 'text-white border-b-2 border-white' : 'text-white/90 hover:text-white')}`}
              >
                {link.name}
                {scrolled && (activeSection === link.name ? (
                  <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-[#ff6b35] rounded-full" />
                ) : (
                  <span className="absolute -bottom-1 left-0 w-0 h-[2.5px] bg-[#1a4bde] transition-all duration-300 group-hover:w-full rounded-full" />
                ))}
              </Link>
            )})}
          </nav>

          {/* Right section */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="#contact" onClick={(e) => {
              const element = document.querySelector('#contact');
              if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <Button className="bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white font-bold px-8 h-[50px] rounded-[12px] transition-all shadow-[0_12px_24px_rgba(255,107,53,0.15)] border-0 text-[15px] hover:scale-105 cursor-pointer">
                Online Booking
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-[#1a4bde] hover:bg-[#1a4bde]/90 text-white font-bold px-8 h-[50px] rounded-[12px] transition-all shadow-[0_12px_24px_rgba(26,75,222,0.15)] border-0 text-[15px] hover:scale-105 cursor-pointer">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-900 bg-slate-100/50' : 'text-white bg-white/20 backdrop-blur-md border border-white/20'}`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-10 space-y-6 text-center">
              {navLinks.map((link) => {
                const handleSmoothScrollMobile = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
                  if (href.startsWith('#')) {
                    const element = document.querySelector(href);
                    if (element) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setMobileMenuOpen(false);
                    }
                  } else {
                    setMobileMenuOpen(false);
                  }
                };

                return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScrollMobile(e, link.href)}
                  className={`block text-[20px] font-bold transition-colors ${activeSection === link.name ? 'text-[#ff6b35]' : 'text-slate-900 hover:text-[#ff6b35]'}`}
                >
                  {link.name}
                </Link>
              )})}
                <Link href="/login" className="block px-3 py-2" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-2 border-[#1a4bde] text-[#1a4bde] hover:bg-[#1a4bde] hover:text-white font-bold rounded-xl h-12">
                    Login to Portal
                  </Button>
                </Link>
                <Link href="/contact" className="block px-3 py-2" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#ff6b35] hover:bg-[#e55420] text-white font-bold rounded-xl h-12 shadow-lg shadow-[#ff6b35]/20">
                    Contact With Us
                  </Button>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
