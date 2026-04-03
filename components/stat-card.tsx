import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Stat {
  icon: LucideIcon
  value: string | number
  label: string
  suffix: string
  color: string
  lightBg: string
}

export function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className={`bg-gradient-to-br ${stat.lightBg} rounded-xl p-8 h-full border border-gray-100/50 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.06)] shadow-sm group relative overflow-hidden`}>
        {/* Animated glow on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
        
        {/* Icon */}
        <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-lg flex items-center justify-center mb-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
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
}
