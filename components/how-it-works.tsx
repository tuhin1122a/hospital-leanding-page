'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ClipboardList, Database, Lock, Smartphone, Stethoscope, Users } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Register Your Hospital',
    description: 'Complete hospital setup with department configuration, doctor profiles, and system integration.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    number: '02',
    icon: Stethoscope,
    title: 'Onboard Medical Staff',
    description: 'Add doctors and staff members with role-based access control and credential verification.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    number: '03',
    icon: Smartphone,
    title: 'Enable Patient Portal',
    description: 'Patients sign up and get instant access to appointments, records, and telemedicine features.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    number: '04',
    icon: ClipboardList,
    title: 'Manage Operations',
    description: 'Handle appointments, billing, pharmacy orders, and patient records from unified dashboard.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    number: '05',
    icon: Database,
    title: 'Integrate Systems',
    description: 'Connect existing hospital systems via APIs for seamless data synchronization.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    number: '06',
    icon: Lock,
    title: 'Ensure Security',
    description: 'Automated compliance monitoring and security audits with real-time threat detection.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-0" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6">
            How Nurjahan Works
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Six simple steps to transform your hospital operations and improve patient care
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative"
              >
                {/* Number Background */}
                <div className="absolute -top-6 -right-6 text-8xl font-black text-foreground/5 pointer-events-none">
                  {step.number}
                </div>

                <div className={`relative p-8 rounded-2xl border border-foreground/10 hover:border-foreground/20 transition-all duration-500 h-full ${step.bg}`}>
                  {/* Header with Icon and Number */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-background backdrop-blur-sm border border-foreground/10`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <span className={`text-3xl font-black ${step.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className={`w-5 h-5 ${step.color}`} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline connector - visualize the flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden lg:block"
        >
          <svg className="w-full h-20 mt-12" viewBox="0 0 1200 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(244, 63, 94)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path d="M 0 40 Q 300 20 600 40 T 1200 40" stroke="url(#gradient)" strokeWidth="3" fill="none" />
            {[1, 2, 3, 4, 5].map((_, i) => (
              <circle key={i} cx={(i + 1) * (1200 / 6)} cy="40" r="6" fill="rgb(59, 130, 246)" opacity="0.6" />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
