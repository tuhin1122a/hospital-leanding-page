'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Zap, Users, HeartPulse, Clock } from 'lucide-react'

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
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Why Patients Trust CarePulse
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
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
              className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
