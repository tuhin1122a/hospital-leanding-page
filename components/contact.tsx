'use client'

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
    details: ['CarePulse Hospital', 'Premium Medical Complex, New Delhi', 'India - 110048']
  },
  {
    icon: Phone,
    title: 'Contact Numbers',
    details: ['+91-11-4567-8900', 'Emergency: +91-11-4567-8911']
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: ['appointments@carepulse.com', 'support@carepulse.com']
  },
  {
    icon: Clock,
    title: 'Hospital Hours',
    details: ['OPD: 8:00 AM - 8:00 PM', 'Emergency: 24/7 Available']
  }
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-foreground mb-6"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed"
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
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 group bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon size={24} />
                      </div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground mb-1">
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
            <Card className="h-full border-none shadow-2xl bg-white dark:bg-zinc-900 p-8">
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
