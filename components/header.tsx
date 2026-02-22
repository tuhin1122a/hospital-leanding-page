'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Departments', href: '#departments' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Dashboard', href: '/dashboard', isSpecial: true },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-foreground tracking-tighter leading-none">Care<span className="text-primary italic">Pulse</span></h1>
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-60">Elite Healthcare</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-sm font-bold transition-colors relative group",
                  link.isSpecial ? "text-primary font-black" : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.name}
                {!link.isSpecial && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>}
                {link.isSpecial && <ArrowUpRight size={14} className="inline-block ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <a href="tel:1066" className="flex items-center gap-2 text-primary font-black hover:opacity-80 transition group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={14} />
                </div>
                <span>1066 Emergency</span>
              </a>
            </div>
            <Link href="/dashboard">
              <Button className="bg-zinc-950 dark:bg-primary hover:bg-primary/95 text-white font-black h-12 px-8 rounded-xl shadow-xl shadow-zinc-950/20 hover:shadow-primary/30 transition-all group">
                Launch App
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-2xl font-black text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-border space-y-4">
                <Link href="/dashboard" className="block">
                  <Button className="w-full h-14 bg-zinc-950 dark:bg-primary text-white font-black rounded-xl text-lg shadow-xl">
                    Launch Dashboard
                  </Button>
                </Link>
                <a href="tel:1066" className="flex items-center justify-center gap-3 text-primary font-black text-xl py-4 bg-primary/5 rounded-xl">
                  <Phone size={24} />
                  1066 Emergency
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
