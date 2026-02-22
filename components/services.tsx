'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Activity, Brain, ChevronRight, Heart, Shield, Users, Zap } from 'lucide-react'

const services = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Advanced cardiac interventions, bypass surgery, and non-invasive heart disease management with India\'s top cardiologists.'
  },
  {
    icon: Brain,
    title: 'Neurology & Neurosurgery',
    description: 'Specialized treatment for stroke, tumors, and neurological disorders with cutting-edge diagnostic imaging.'
  },
  {
    icon: Activity,
    title: 'Orthopedic Surgery',
    description: 'Joint replacement, arthroscopic surgery, and sports medicine with world-class orthopedic specialists.'
  },
  {
    icon: Zap,
    title: '24/7 Emergency Services',
    description: 'Trauma center with ICU facilities and emergency response team available round-the-clock.'
  },
  {
    icon: Shield,
    title: 'Preventive & Wellness',
    description: 'Comprehensive health screening packages and preventive medicine programs for optimal wellness.'
  },
  {
    icon: Users,
    title: 'Oncology & Cancer Care',
    description: 'Comprehensive cancer treatment including chemotherapy, radiation, and surgical interventions.'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-foreground mb-6"
          >
            Premium Medical Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Offering comprehensive healthcare across all major medical specialties with state-of-the-art technology and expert medical professionals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 items-center justify-center mb-6 shadow-sm">
                      <Icon size={32} />
                    </div>
                    <CardTitle className="text-2xl text-foreground font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Learn More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
