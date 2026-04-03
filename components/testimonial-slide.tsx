import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  location: string
  procedure: string
  content: string
  rating: number
}

export function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="embla__slide flex-[0_0_100%] px-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="group relative"
      >
        {/* Premium glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
        
        <Card className="border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-xl group-hover:border-primary/20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden relative transition-all duration-500 rounded-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 group-hover:bg-primary/10 rounded-bl-full -z-0 transition-colors duration-500" />
          <CardContent className="pt-20 pb-12 px-8 sm:px-20 text-center relative z-10">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
              ))}
            </div>
            
            <p className="text-foreground italic mb-12 leading-relaxed text-2xl font-medium text-balance group-hover:text-primary transition-colors duration-500">
              "{testimonial.content}"
            </p>
            
            <div className="pt-10 border-t border-border inline-block min-w-[200px]">
              <p className="font-black text-foreground text-2xl mb-1 tracking-tight">{testimonial.name}</p>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-3">Procedure: {testimonial.procedure}</p>
              <p className="text-sm text-muted-foreground font-medium">📍 {testimonial.location}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
