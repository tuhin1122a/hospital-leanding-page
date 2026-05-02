'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import Link from 'next/link'

const galleryImages = [
  { src: '/hero-hospital.jpg', alt: 'Hospital Building', category: 'Infrastructure' },
  { src: '/surgery-room.jpg', alt: 'Operation Theater', category: 'Facilities' },
  { src: '/patient-care.jpg', alt: 'Patient Care', category: 'Services' },
  { src: '/icu-monitor.png', alt: 'ICU Monitor', category: 'Equipment' },
  { src: '/mri-machine.png', alt: 'MRI Machine', category: 'Equipment' },
  { src: '/medical-team-1.png', alt: 'Medical Team', category: 'Team' },
  { src: '/ct_scan_machine_1771847703067.png', alt: 'CT Scan Machine', category: 'Equipment' },
  { src: '/ultrasound_machine_1771847580933.png', alt: 'Ultrasound Machine', category: 'Equipment' },
  { src: '/x_ray_machine_1771847517546.png', alt: 'X-Ray Machine', category: 'Equipment' },
  { src: '/medical-team-2.png', alt: 'Expert Doctors', category: 'Team' },
]

interface PhotoGalleryProps {
  previewOnly?: boolean
}

export default function PhotoGallery({ previewOnly = false }: PhotoGalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  
  const displayedImages = previewOnly ? galleryImages.slice(0, 6) : galleryImages

  return (
    <section id="gallery" className="py-24 bg-zinc-50 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
           <h4 className="text-[13px] font-black text-[#1a4bde] uppercase tracking-[0.3em]">ফটোগ্যালারি</h4>
           <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tighter" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              এক নজরে <span className="text-[#ff6b35]">নূরজাহান হাসপাতাল</span>
           </h2>
           <p className="text-[#64748b] font-medium max-w-2xl mx-auto text-lg">
              আমাদের আধুনিক স্বাস্থ্যসেবা, অত্যাধুনিক যন্ত্রপাতি এবং উন্নত পরিবেশের কিছু চিত্র।
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]"
              onClick={() => setSelectedImg(img.src)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b4d]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <ZoomIn className="text-white mb-2" size={24} />
                 <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>{img.alt}</h3>
                 <span className="text-[#ff6b35] text-xs font-black uppercase tracking-wider">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>


        {previewOnly && (
          <div className="mt-16 text-center">
            <Link href="/gallery">
              <button className="px-10 h-[60px] rounded-xl bg-[#ff6b35] text-white font-bold shadow-[0_12px_24px_rgba(255,107,53,0.2)] border-0 text-[16px] hover:bg-[#e55420] hover:scale-105 active:scale-95 transition-all cursor-pointer" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                 সকল ছবি দেখুন
              </button>
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all">
              <X size={28} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImg} 
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
