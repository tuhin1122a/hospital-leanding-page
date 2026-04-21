import Image from 'next/image'
import { Button } from './ui/button'

export default function SharedCommitment() {
  return (
    <section className="py-24 bg-[#EBF5FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Image */}
          <div className="relative">
             <div className="relative z-10 w-full aspect-video rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/50">
                <Image src="/medical-team-collaboration.png" alt="Community commitment" fill className="object-cover" />
             </div>
             {/* Decorative element */}
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl z-0"></div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#011632] tracking-tight leading-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
                সমাজের প্রতি আমাদের<br />
                সম্মিলিত ও দৃঢ় <span className="text-primary">প্রতিশ্রুতি</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                অত্যাধুনিক চিকিৎসা প্রযুক্তি এবং মানবিক দৃষ্টিভঙ্গির মাধ্যমে স্বাস্থ্যসেবাকে সর্বোচ্চ পর্যায়ে নিয়ে যাওয়া। ২৫ বছরেরও বেশি সময় ধরে মানুষের আস্থার প্রতীক। আমরা সমাজের সদস্যদের জন্য সর্বোত্তম যত্ন নিশ্চিত করতে একসঙ্গে কাজ করি।
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                আধুনিক চিকিৎসা প্রযুক্তি এবং মানবিক দৃষ্টিভঙ্গির মাধ্যমে উন্নত স্বাস্থ্যসেবা। দীর্ঘ ২৫ বছর ধরে আমরা আপনাদের পাশে আছি।
              </p>
            </div>

            <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl px-10 py-6 transition-all shadow-[0_12px_25px_rgba(255,107,53,0.25)] border-0 h-fit hover:scale-105 active:scale-95 cursor-pointer" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
              আরও জানুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
