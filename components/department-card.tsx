import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

interface Department {
  icon: LucideIcon
  name: string
  fullName: string
  description: string
  iconColor: string
  iconBg: string
  stats: string
}

export function DepartmentCard({ dept, index }: { dept: Department; index: number }) {
  const Icon = dept.icon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group relative h-full overflow-hidden border border-gray-100 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer rounded-xl">
        {/* Premium gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border glow on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
        
        <CardContent className="p-8 relative z-10 flex flex-col h-full">
          <div className={`${dept.iconBg} ${dept.iconColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.03)]`}>
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
}
