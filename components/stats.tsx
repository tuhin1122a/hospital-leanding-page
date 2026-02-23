'use client'

import { motion } from 'framer-motion'
import { Activity, Heart, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

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
      value: counts.patients.toLocaleString(),
      label: 'Patients Treated',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500',
      lightBg: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Heart,
      value: counts.doctors,
      label: 'Expert Doctors',
      suffix: '+',
      color: 'from-red-500 to-pink-500',
      lightBg: 'from-red-50 to-pink-50',
    },
    {
      icon: Activity,
      value: counts.beds,
      label: 'Hospital Beds',
      suffix: '+',
      color: 'from-emerald-500 to-green-500',
      lightBg: 'from-emerald-50 to-green-50',
    },
    {
      icon: TrendingUp,
      value: counts.experience.toFixed(0),
      label: 'Years of Excellence',
      suffix: '',
      color: 'from-purple-500 to-violet-500',
      lightBg: 'from-purple-50 to-violet-50',
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-0" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-5xl lg:text-7xl font-black text-foreground mb-6 text-balance leading-tight">
            By The Numbers
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Trusted by millions of patients and healthcare providers worldwide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${stat.lightBg} rounded-3xl p-8 h-full border border-foreground/5 hover:border-foreground/10 transition-all duration-500 hover:shadow-2xl`}>
                  {/* Icon */}
                  <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-black/10 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Number */}
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <motion.span
                        className="text-6xl lg:text-7xl font-black text-foreground tracking-tighter"
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-4xl font-black text-primary ml-1">{stat.suffix}</span>
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </p>

                  {/* Accent line */}
                  <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} rounded-full mt-6 transition-all duration-500`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
