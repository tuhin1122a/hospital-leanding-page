'use client'

import { Calendar, ChevronRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

const blogPosts = [
  {
    id: 1,
    title: "হৃদপিণ্ড সুস্থ ও শক্তিশালী রাখার ১০টি টিপস",
    category: "সুস্বাস্থ্য",
    author: "ডাঃ শামীম আহমেদ",
    date: "১৫ মে, ২০২৫",
    image: "/medical-team-1.png",
    excerpt: "সুস্থ জীবনের জন্য হৃদপিণ্ড সুস্থ রাখা অত্যন্ত জরুরি। জেনে নিন এমন ১০টি অভ্যাস যা আপনার হার্টকে করবে শক্তিশালী..."
  },
  {
    id: 2,
    title: "নূরজাহান হাসপাতালের আধুনিক চিকিৎসা প্রযুক্তি",
    category: "প্রযুক্তি",
    author: "অ্যাডমিন",
    date: "০২ জুন, ২০২৫",
    image: "/icu-monitor.png",
    excerpt: "নির্ভুল প্যাথলজি টেস্ট এবং সেরা স্বাস্থ্যসেবার জন্য আমরা যুক্ত করেছি সম্পূর্ণ স্বয়ংক্রিয় অত্যাধুনিক হাই-টেক যন্ত্রপাতি..."
  },
  {
    id: 3,
    title: "শিশুদের টিকাদান কর্মসূচি: গাইডলাইন",
    category: "শিশু রোগ",
    author: "ডাঃ নুসরাত জাহান",
    date: "১০ জুন, ২০২৫",
    image: "/hero-doctor.png",
    excerpt: "আপনার আদরের সন্তানকে রোগমুক্ত রাখতে চাই সঠিক সময়ে টিকা। বিভিন্ন টিকার সময়সূচি সম্পর্কে জেনে নিন বিস্তারিত তথ্য..."
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>স্বাস্থ্য বার্তা</h4>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tighter" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              সাম্প্রতিক হেলথ <span className="text-[#1a4bde] italic">আর্টিকেল এবং নিউজ</span>
            </h2>
            <p className="text-[#64748b] font-medium text-lg leading-relaxed">
              আমাদের বিশেষজ্ঞদের তৈরি করা লেটেস্ট স্বাস্থ্য বিষয়ক খবর, হেলথ টিপস এবং হাসপাতালের নানা আপডেট পেতে আমাদের ব্লগ পড়ুন।
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-2 border-[#1a4bde] text-[#1a4bde] hover:bg-[#1a4bde] hover:text-white font-bold rounded-xl px-8 h-[56px] transition-all group" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              সব পোস্ট দেখুন
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
                  <span className="bg-[#1a4bde] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
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

                <h3 className="text-[22px] font-bold text-[#0a1b4d] leading-tight mb-4 group-hover:text-[#1a4bde] transition-colors line-clamp-2" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#ff6b35] font-black text-[14px] uppercase tracking-wider group/link"
                    style={{ fontFamily: "'Anek Bangla', sans-serif" }}
                  >
                    আরও পড়ুন
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
