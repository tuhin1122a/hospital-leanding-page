import { DepartmentsSvgBg, InteractiveSectionBg } from '@/components/svg-patterns'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Bone, Brain, Heart, Stethoscope, Zap } from 'lucide-react'
import { DepartmentCard } from './department-card'

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
  },
  {
    icon: Stethoscope,
    name: 'Diagnostic',
    fullName: 'Operation & Diagnostic Center',
    description: 'Fully equipped 4000 sq ft facility for operations and modern diagnostics.',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
    stats: '24/7 Service'
  }
]

export default function Departments() {
  return (
    <section id="departments" className="relative py-24 bg-background border-y border-border/40 overflow-hidden">
      <InteractiveSectionBg />
      <DepartmentsSvgBg />
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
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
          {departments.map((dept, index) => (
            <DepartmentCard key={index} dept={dept} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
