'use client'

import { WhyChooseUsSvgBg } from '@/components/svg-patterns'
import { motion } from 'framer-motion'
import { Award, Clock, HeartPulse, ShieldCheck, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Certified Excellence",
    description: "Multi-accredited facility with international safety and quality standards."
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Expert Specialists",
    description: "A team of over 500+ world-renowned doctors and medical researchers."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Modern Technology",
    description: "Equipped with the latest robotic surgery and advanced diagnostic tools."
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: "Patient-First Care",
    description: "Compassionate environment focused on personalized patient recovery."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "24/7 Support",
    description: "Round-the-clock emergency services and critical care response unit."
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Award Winning",
    description: "Recognized globally for breakthroughs in cardiology and oncology."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-muted/30 overflow-hidden">
      <WhyChooseUsSvgBg />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight"
          >
            Why Patients Trust <span className="text-primary italic">Nurjahan Hospital</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium"
          >
            We combine medical expertise with advanced technology and compassionate care to deliver the best possible health outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
              
              <div className="relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-500 group-hover:bg-white/70 dark:group-hover:bg-zinc-900/70">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
