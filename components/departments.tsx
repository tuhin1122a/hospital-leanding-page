'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowUpRight, Bone, Brain, Heart, Zap } from 'lucide-react'

const departments = [
  {
    icon: Heart,
    name: 'Cardiology',
    fullName: 'Heart & Vascular Institute',
    description: 'Advanced interventional cardiology and heart transplants with ECMO support.',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    stats: '8 Specialists'
  },
  {
    icon: Brain,
    name: 'Neurology',
    fullName: 'Neurosciences Center',
    description: 'Expert stroke management, neuro-imaging, and complex brain tumor resections.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    stats: '6 Specialists'
  },
  {
    icon: Bone,
    name: 'Orthopedics',
    fullName: 'Joint & Bone Institute',
    description: 'Robotic joint replacement and arthroscopic sports medicine excellence.',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
    stats: '7 Specialists'
  },
  {
    icon: Zap,
    name: 'Oncology',
    fullName: 'Comprehensive Cancer Care',
    description: 'Pioneering radiation oncology and precision chemotherapy protocols.',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    stats: '9 Specialists'
  }
]

export default function Departments() {
  return (
    <section id="departments" className="py-24 bg-background border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-black">
                Clinical Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">
                Centers of <span className="text-primary italic">Excellence</span>
              </h2>
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-sm leading-relaxed"
          >
            Specialized medical hubs delivering world-class care through innovation and empathy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer">
                  {/* Subtle hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardContent className="p-8 relative z-10 flex flex-col h-full">
                    <div className={`${dept.iconBg} ${dept.iconColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                      <Icon size={28} />
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">{dept.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">{dept.fullName}</p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                      {dept.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-foreground bg-muted px-3 py-1.5 rounded-lg border border-border/50">
                        {dept.stats}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500 shadow-lg shadow-primary/20">
                        <ArrowUpRight size={18} />
                      </div>
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
