'use client'

import { SectionSvgBg } from '@/components/svg-patterns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Main Location',
    details: ['Nurjahan Private Hospital-2', 'Panti, Kumarkhali', 'Kushtia, Bangladesh']
  },
  {
    icon: Phone,
    title: 'Contact Numbers',
    details: ['+880 1712-345678', 'Emergency: +880 1712-345679']
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: ['info@nurjahanhospital.com', 'support@nurjahanhospital.com']
  },
  {
    icon: Clock,
    title: 'Hospital Hours',
    details: ['OPD: 8:00 AM - 8:00 PM', 'Emergency: 24/7 Available']
  }
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-muted/30 overflow-hidden">
      <SectionSvgBg />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tighter"
          >
            Get In <span className="text-primary italic">Touch</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed font-medium"
          >
            Whether you have a question about our services or need to book an emergency consultation, our medical team is here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                  
                  <Card className="relative border border-border/50 hover:border-primary/40 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:from-primary group-hover:to-primary group-hover:text-white transition-all duration-300 shadow-lg">
                        <Icon size={24} />
                      </div>
                      <CardTitle className="text-lg font-black group-hover:text-primary transition-colors">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground mb-1 font-medium">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border border-border/50 shadow-2xl shadow-primary/5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl hover:border-primary/40 transition-all duration-500">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Full Name</label>
                    <Input placeholder="John Doe" className="h-12 border-border/50 bg-muted/20 rounded-xl focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Email Address</label>
                    <Input placeholder="john@example.com" className="h-12 border-border/50 bg-muted/20 rounded-xl focus:ring-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Subject</label>
                  <Input placeholder="Appointment Inquiry" className="h-12 border-border/50 bg-muted/20 rounded-xl focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px] border-border/50 bg-muted/20 rounded-xl focus:ring-primary resize-none" />
                </div>
                <Button className="w-full h-14 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
