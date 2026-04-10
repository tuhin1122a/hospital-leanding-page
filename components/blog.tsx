'use client'

import { Calendar, ChevronRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

const blogPosts = [
  {
    id: 1,
    title: "10 Health Tips to Keep Your Heart Strong and Healthy",
    category: "Wellness",
    author: "Dr. Shamim Ahmed",
    date: "May 15, 2024",
    image: "/medical-team-1.png",
    excerpt: "Maintaining heart health is crucial for overall well-being. Learn the top 10 habits that can make a difference..."
  },
  {
    id: 2,
    title: "The Future of Medical Technology at Nurjahan Hospital",
    category: "Technology",
    author: "Admin",
    date: "June 2, 2024",
    image: "/icu-monitor.png",
    excerpt: "We are introducing high-tech automated machines for more precise diagnostic testing and patient care..."
  },
  {
    id: 3,
    title: "Understanding Childhood Immunization: A Parent's Guide",
    category: "Pediatric",
    author: "Dr. Nusrat Jahan",
    date: "June 10, 2024",
    image: "/hero-doctor.png",
    excerpt: "Protect your child from preventable diseases. Everything you need to know about the vaccination schedule..."
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]">Health Insights</h4>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tighter">
              Latest Health <span className="text-[#1a4bde] italic">Articles & News</span>
            </h2>
            <p className="text-[#64748b] font-medium text-lg leading-relaxed">
              Stay informed with our latest medical news, health tips, and hospital updates curated by our specialists.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-2 border-[#1a4bde] text-[#1a4bde] hover:bg-[#1a4bde] hover:text-white font-bold rounded-xl px-8 h-[56px] transition-all group">
              View All Posts
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-slate-100 group flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a4bde] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-[13px] font-bold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#ff6b35]" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-[#ff6b35]" />
                    {post.author}
                  </div>
                </div>

                <h3 className="text-[22px] font-bold text-[#0a1b4d] leading-tight mb-4 group-hover:text-[#1a4bde] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#ff6b35] font-black text-[14px] uppercase tracking-wider group/link"
                  >
                    Read More
                    <ChevronRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
