'use client'

import React from 'react'

export default function LocationMap() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Info */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[38px] font-black leading-tight text-[#0a1b4d]">
                Visit Our <span className="text-[#1a4bde]">Location</span>
              </h2>
              <div className="w-20 h-1.5 bg-[#f36424] rounded-full" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a4bde]/10 flex items-center justify-center shrink-0 border border-[#1a4bde]/20">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#1a4bde]" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0a1b4d]">Address</h4>
                  <p className="text-[#64748b] font-medium leading-relaxed">
                    Panti, Kumarkhali, Kushtia,<br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a4bde]/10 flex items-center justify-center shrink-0 border border-[#1a4bde]/20">
                   <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#1a4bde]" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0a1b4d]">Phone</h4>
                  <p className="text-[#64748b] font-medium leading-relaxed">
                    +880 1XXX-XXXXXX<br />
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>

            <button className="px-8 h-[54px] rounded-xl bg-[#1a4bde] text-white font-bold shadow-lg shadow-[#1a4bde]/25 hover:scale-[1.02] active:scale-95 transition-all">
              Get Directions
            </button>
          </div>

          {/* Right Side: Map Container */}
          <div className="w-full lg:w-2/3 h-[500px] rounded-[32px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(26,75,222,0.15)] border-[8px] border-white relative group">
            {/* Google Maps Iframe for Panti, Kumarkhali, Kushtia (High Visibility) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.988142345864!2d89.23126781285227!3d23.83441589729002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fee98d1a123e7b%3A0xc39540b66e340be2!2sPanti!5e0!3m2!1sen!2sbd!4v1712046422312!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
