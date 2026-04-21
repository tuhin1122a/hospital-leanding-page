import { DepartmentsSvgBg, InteractiveSectionBg } from '@/components/svg-patterns'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Bone, Brain, Heart, Stethoscope, Zap } from 'lucide-react'
import { DepartmentCard } from './department-card'

const departments = [
  {
    icon: Heart,
    name: 'কার্ডিওলজি',
    fullName: 'হার্ট ও ভাস্কুলার ইনস্টিটিউট',
    description: 'অত্যাধুনিক কার্ডিওলজি এবং ইসিএমও সাপোর্টের মাধ্যমে হার্ট কেয়ার।',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    stats: '৮ জন বিশেষজ্ঞ'
  },
  {
    icon: Brain,
    name: 'নিউরোলজি',
    fullName: 'নিউরোসায়েন্সেস সেন্টার',
    description: 'স্ট্রোক ম্যানেজমেন্ট, নিউরো-ইমেজিং এবং ব্রেন টিউমার চিকিৎসায় অভিজ্ঞ।',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    stats: '৬ জন বিশেষজ্ঞ'
  },
  {
    icon: Bone,
    name: 'অর্থোপেডিক্স',
    fullName: 'জয়েন্ট ও বোন ইনস্টিটিউট',
    description: 'আধুনিক স্পোর্টস মেডিসিন এবং জয়েন্ট চিকিৎসার উন্নত সুবিধা।',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
    stats: '৭ জন বিশেষজ্ঞ'
  },
  {
    icon: Zap,
    name: 'অনকোলজি',
    fullName: 'ক্যান্সার কেয়ার সেন্টার',
    description: 'উন্নত কেমোথেরাপি এবং ক্যান্সার চিকিৎসার আধুনিক চিকিৎসা।',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    stats: '৯ জন বিশেষজ্ঞ'
  },
  {
    icon: Stethoscope,
    name: 'ডায়াগনস্টিক',
    fullName: 'অপারেশন ও ডায়াগনস্টিক',
    description: 'অপারেশন ও লেটেস্ট ডায়াগনস্টিকের জন্য ৪০০০ স্কয়ার ফুটের উন্নত সেন্টার।',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
    stats: '২৪/৭ সেবা'
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
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary px-4 py-1 rounded-full uppercase tracking-widest text-[10px] sm:text-[12px] font-black">
                সেবার মান
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                আমাদের <span className="text-primary italic">বিশেষজ্ঞ বিভাগসমূহ</span>
              </h2>
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-sm leading-relaxed"
          >
            আধুনিক প্রযুক্তি ও সহানুভূতির মাধ্যমে সব ধরণের বিশ্বমানের চিকিৎসা সেবা দিয়ে থাকি।
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
