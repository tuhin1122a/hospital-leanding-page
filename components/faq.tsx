'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'

const faqs = [
  {
    question: "Do you accept international health insurance?",
    answer: "Yes, we partner with most major international health insurance providers including Bupa, Allianz, and Cigna. Please contact our international patient desk for more details."
  },
  {
    question: "How can I book an appointment with a specialist?",
    answer: "You can book directly via our website's 'Book Appointment' button, through our mobile app, or by calling our call center at +91-11-4567-8900."
  },
  {
    question: "What are your visiting hours for patients?",
    answer: "General ward visiting hours are from 10:00 AM to 12:00 PM and 4:00 PM to 6:00 PM. ICU visiting hours are strictly limited to one person for 15 minutes during designated slots."
  },
  {
    question: "Is there a parking facility available at the hospital?",
    answer: "Yes, we have a multi-level basement parking facility with 500+ slots available for patients and visitors, including 24/7 valet service."
  },
  {
    question: "Do you have emergency ambulance services?",
    answer: "Yes, we operate a fleet of ACLS (Advanced Cardiac Life Support) ambulances 24/7. Call our emergency hotline 1066 for immediate assistance."
  }
]

export default function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Find quick answers to common queries about our services and facilities.
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
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
