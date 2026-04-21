'use client'

import { WhyChooseUsSvgBg } from '@/components/svg-patterns'
import { motion } from 'framer-motion'
import { Award, Clock, HeartPulse, ShieldCheck, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "সার্টিফাইড এক্সেলেন্স",
    description: "আন্তর্জাতিক নিরাপত্তা ও মানের একাধিক স্বীকৃতিপ্রাপ্ত স্বাস্থ্যকেন্দ্র।"
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "অভিজ্ঞ বিশেষজ্ঞ",
    description: "আমাদের রয়েছে দেশের সেরা স্বনামধন্য ডাক্তার ও গবেষকদের একটি দক্ষ টিম।"
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "অত্যাধুনিক প্রযুক্তি",
    description: "লেটেস্ট ডায়াগনস্টিক এবং আধুনিক চিকিৎসা প্রযুক্তির সমন্বয়।"
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: "রোগীর সর্বোচ্চ অগ্রাধিকার",
    description: "সহানুভূতিশীল পরিবেশে রোগীর দ্রুত সুস্থতার দিকে বিশেষ নজর।"
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "২৪/৭ জরুরি সেবা",
    description: "দিনরাত সার্বক্ষণিক জরুরি সেবা এবং ক্রাইসিস রেসপন্স ইউনিট।"
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "অ্যাওয়ার্ড উইনিং",
    description: "সাশ্রয়ী মূল্যে গুণগত মান এবং আধুনিক চিকিৎসার জন্য প্রশংসিত।"
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
            style={{ fontFamily: "'Anek Bangla', sans-serif" }}
          >
            কেন রোগীরা <span className="text-primary italic">নূরজাহান হাসপাতালে</span> আস্থা রাখেন
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium"
          >
            আমরা উন্নত প্রযুক্তি এবং সহানুভূতিশীল সেবার সাথে চিকিৎসা দক্ষতাকে কাজে লাগিয়ে সর্বোত্তম স্বাস্থ্যসেবা নিশ্চিত করি।
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
