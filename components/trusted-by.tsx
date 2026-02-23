'use client'

import { motion } from 'framer-motion'
import { Award, Building2, Target } from 'lucide-react'

export default function TrustedBy() {
  const achievements = [
    {
      icon: Award,
      title: 'ISO 27001 Certified',
      description: 'Information Security Management certified for healthcare data protection',
    },
    {
      icon: Building2,
      title: '150+ Hospitals',
      description: 'Trusted by leading healthcare providers across 25 countries',
    },
    {
      icon: Target,
      title: '99.99% Uptime',
      description: 'Enterprise-grade infrastructure with 24/7 monitoring and support',
    },
  ]

  const testimonials = [
    {
      name: 'Max Healthcare',
      role: 'Multi-specialty Hospital Chain',
      quote: 'Nurjahan Hospital transformed our operations. We reduced patient wait time by 45%.',
      avatar: '🏥',
    },
    {
      name: 'City Care Clinic',
      role: 'Diagnostic Center',
      quote: 'The most user-friendly system we\'ve implemented. Staff trained in just 2 days.',
      avatar: '⚕️',
    },
    {
      name: 'Global Health Partners',
      role: 'Medical Network',
      quote: 'Exceptional support team. They helped us migrate smoothly from our legacy system.',
      avatar: '🩺',
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-foreground text-center mb-16">
            Trusted By Industry Leaders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, i) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-background hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                    <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-black text-foreground text-center mb-16">
            What Healthcare Leaders Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-8 rounded-2xl border border-foreground/10 bg-white dark:bg-zinc-900/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Quote */}
                  <p className="text-lg font-medium text-foreground mb-6 italic leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-foreground/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-black text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
