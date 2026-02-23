'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Cloud, Lock, Smartphone, Zap } from 'lucide-react'

const features = [
  {
    icon: CheckCircle2,
    title: 'Comprehensive Patient Records',
    description: 'Centralized digital medical records with instant access for authorized practitioners across departments.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Access',
    description: 'Patients and doctors can access critical information on smartphones with real-time synchronization.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Instant Appointment Booking',
    description: 'Streamlined appointment system with automated confirmations and real-time availability updates.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Lock,
    title: 'Healthcare-Grade Security',
    description: 'HIPAA-compliant encryption and multi-factor authentication protecting sensitive patient data.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: '99.99% uptime guarantee with automatic backups and disaster recovery protocols.',
    color: 'from-emerald-500 to-green-500',
  },
]

export default function Features() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-primary/2 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance">
            Powerful Features For Modern Healthcare
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Built with cutting-edge technology to streamline hospital operations and improve patient care
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8 rounded-2xl border border-foreground/10 backdrop-blur-sm hover:border-foreground/20 transition-all duration-500">
                  {/* Icon */}
                  <div className={`inline-flex bg-gradient-to-br ${feature.color} p-4 rounded-xl mb-6 shadow-xl shadow-black/10`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="flex items-center text-primary font-bold text-sm group-hover:gap-2 gap-1 transition-all">
                    Learn more →
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
