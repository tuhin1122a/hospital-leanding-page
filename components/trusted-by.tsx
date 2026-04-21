'use client'

import { InteractiveSectionBg, SectionSvgBg } from '@/components/svg-patterns'
import { motion } from 'framer-motion'
import { Award, Building2, Target } from 'lucide-react'

export default function TrustedBy() {
  const achievements = [
    {
      icon: Award,
      title: 'আইএসও (ISO) সার্টিফাইড',
      description: 'নিরাপদ স্বাস্থ্যসেবা ও রোগীদের তথ্য সুরক্ষার জন্য একটি সার্টিফাইড হাসপাতাল',
    },
    {
      icon: Building2,
      title: '১৫০+ হাসপাতাল নেটওয়ার্ক',
      description: 'উন্নত স্বাস্থ্যসেবার জন্য দেশজুড়ে সবার অত্যন্ত আস্থার একটি প্রতীক',
    },
    {
      icon: Target,
      title: '২৪/৭ চিকিৎসকদের উপস্থিতি',
      description: 'হাসপাতালে সর্বদা বিশেষজ্ঞ চিকিৎসক ও ইমার্জেন্সি স্টাফদের উপস্থিতি নিশ্চিত করা হয়',
    },
  ]

  const testimonials = [
    {
      name: 'ম্যাক্স হেলথকেয়ার',
      role: 'মাল্টি-স্পেশালিটি হাসপাতাল চেইন',
      quote: 'নূরজাহান হাসপাতাল তাদের উন্নত সেবার মাধ্যমে রোগীদের অপেক্ষার সময় ৪৫% এরও বেশি কমিয়ে এনেছে।',
      avatar: '🏥',
    },
    {
      name: 'সিটি কেয়ার ক্লিনিক',
      role: 'ডায়াগনস্টিক সেন্টার',
      quote: 'তাদের ডায়াগনস্টিক ব্যবস্থাপনা খুবই অসাধারণ। আমাদের রোগীরা খুব দ্রুত এবং নির্ভুল চিকিৎসায় সন্তুষ্ট।',
      avatar: '⚕️',
    },
    {
      name: 'গ্লোবাল হেলথ পার্টনারস',
      role: 'সার্বিক মেডিকেল নেটওয়ার্ক',
      quote: 'এখানকার সাপোর্ট টিম খুবই চমৎকার। যেকোনো দরকারে তারা সব সময় হাসিমুখে রোগীদের সাহায্য করেন।',
      avatar: '🩺',
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      <InteractiveSectionBg />
      <SectionSvgBg />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-5xl lg:text-5xl font-black text-foreground text-center mb-16 tracking-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
            প্রাইভেট হাসপাতালগুলোর মধ্যে <span className="text-primary italic">অন্যতম</span>
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
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                  
                  <div className="relative p-8 rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-background group-hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="inline-flex p-4 rounded-xl bg-primary/10 group-hover:from-primary group-hover:to-primary text-foreground group-hover:text-white mb-6 transition-all duration-300 shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors text-center sm:text-left" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
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
          <h3 className="text-4xl lg:text-5xl font-black text-foreground text-center mb-16 tracking-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
            <span className="text-primary">স্বাস্থ্যসেবা বিশেষজ্ঞরা</span> যা বলেন
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
      </motion.div>
    </section>
  )
}
