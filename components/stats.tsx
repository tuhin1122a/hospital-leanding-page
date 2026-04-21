'use client'

import { StatsSvgBg } from '@/components/svg-patterns'
import { motion } from 'framer-motion'
import { Activity, Heart, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StatCard } from './stat-card'

export default function Stats() {
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    beds: 0,
    experience: 0,
  })

  useEffect(() => {
    const intervals = [
      setInterval(() => setCounts(prev => ({ ...prev, patients: Math.min(prev.patients + 2, 50000) })), 10),
      setInterval(() => setCounts(prev => ({ ...prev, doctors: Math.min(prev.doctors + 1, 500) })), 15),
      setInterval(() => setCounts(prev => ({ ...prev, beds: Math.min(prev.beds + 1, 800) })), 15),
      setInterval(() => setCounts(prev => ({ ...prev, experience: Math.min(prev.experience + 0.5, 25) })), 20),
    ]

    return () => intervals.forEach(i => clearInterval(i))
  }, [])

    const stats = [
    {
      icon: Users,
      value: counts.patients.toLocaleString('en-US'),
      label: 'সুস্থ হওয়া রোগী',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500',
      lightBg: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Heart,
      value: counts.doctors,
      label: 'বিশেষজ্ঞ ডাক্তার',
      suffix: '+',
      color: 'from-red-500 to-pink-500',
      lightBg: 'from-red-50 to-pink-50',
    },
    {
      icon: Activity,
      value: counts.beds,
      label: 'হাসপাতাল বেড',
      suffix: '+',
      color: 'from-emerald-500 to-green-500',
      lightBg: 'from-emerald-50 to-green-50',
    },
    {
      icon: TrendingUp,
      value: counts.experience.toFixed(0),
      label: 'বছর ধরে সেবা',
      suffix: '',
      color: 'from-purple-500 to-violet-500',
      lightBg: 'from-purple-50 to-violet-50',
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-0" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] z-0" />
      <StatsSvgBg />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-5xl lg:text-5xl font-black text-foreground mb-6 text-balance leading-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
            আমাদের অর্জনের <span className="text-primary">সংখ্যা</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            অজস্র বিশ্বাসী মানুষের ভরসা ও ভালোবাসায় আমরা
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
