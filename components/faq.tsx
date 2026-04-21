'use client'

import { SectionSvgBg } from '@/components/svg-patterns'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'

const faqs = [
  {
    question: "আপনারা কি স্বাস্থ্য বীমা (হেলথ ইন্স্যুরেন্স) গ্রহণ করেন?",
    answer: "হ্যাঁ, আমরা পল্লি কর্ম-সহায়ক ফাউন্ডেশন সহ বেশ কিছু শীর্ষস্থানীয় স্বাস্থ্য বীমা প্রদানকারী সংস্থার প্যানেলভুক্ত। বিস্তারিত জানতে আমাদের হেল্প ডেস্কে যোগাযোগ করুন।"
  },
  {
    question: "আমি কীভাবে একজন বিশেষজ্ঞের সাথে অ্যাপয়েন্টমেন্ট বুক করব?",
    answer: "আমাদের ওয়েবসাইটের 'অ্যাপয়েন্টমেন্ট বুকিং' বাটনে ক্লিক করে সরাসরি অথবা আমাদের দেওয়া হেল্পলাইন নম্বরে কল করে আপনি খুব সহজেই অ্যাপয়েন্টমেন্ট বুক করতে পারবেন।"
  },
  {
    question: "রোগীদের দেখার জন্য দর্শনার্থীদের পরিদর্শনের সময়সূচি কী?",
    answer: "সাধারণ ওয়ার্ড পরিদর্শনের সময় সকাল ১০:০০ টা থেকে দুপুর ১২:০০ টা এবং বিকাল ৪:০০ টা থেকে সন্ধ্যা ৬:০০ টা। আইসিইউ (ICU) তে দর্শনার্থী প্রবেশ সীমাবদ্ধ, নির্দিষ্ট সময়ে মাত্র একজন ১৫ মিনিটের জন্য যেতে পারবেন।"
  },
  {
    question: "হাসপাতালে কি পার্কিং সুবিধা উপলব্ধ আছে?",
    answer: "হ্যাঁ, রোগী এবং দর্শনার্থীদের সুবিধার জন্য আমাদের কাছে সার্বক্ষণিক নিজস্ব নিরাপত্তা বেষ্টিত একটি প্রশস্ত পার্কিং সুবিধা উপলব্ধ রয়েছে।"
  },
  {
    question: "আপনাদের কি জরুরি অ্যাম্বুলেন্স পরিষেবা রয়েছে?",
    answer: "হ্যাঁ, আমরা সার্বক্ষণিক ২৪/৭ আধুনিক লাইফ সাপোর্ট অ্যাম্বুলেন্স পরিষেবা সরবরাহ করি। যেকোনো জরুরি প্রয়োজনে আমাদের ইমার্জেন্সি হটলাইনে সরাসরি কল করুন।"
  }
]

export default function FAQ() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <SectionSvgBg />
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-5xl font-black text-foreground mb-6 tracking-tighter"
            style={{ fontFamily: "'Anek Bangla', sans-serif" }}
          >
            সচারচর জিজ্ঞাসিত <span className="text-primary italic">প্রশ্নসমূহ</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium"
          >
            আমাদের সেবাসমূহ এবং সুবিধা সম্পর্কে সাধারণ প্রশ্নের দ্রুত উত্তর পান।
          </motion.p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/30 group">
                <AccordionTrigger className="text-left text-lg font-black py-6 hover:text-primary transition-colors group-hover:bg-primary/5 px-6 rounded-t-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 px-6 leading-relaxed font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  )
}
