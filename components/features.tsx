import Image from 'next/image'
import { Button } from './ui/button'

export default function AboutServices() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0a1b4d] tracking-tight leading-tight">
                <span className="text-[#1a4bde]">নূরজাহান হাসপাতাল</span> সম্পর্কে
              </h2>
              <p className="text-[#64748b] text-[15px] lg:text-[17px] leading-relaxed font-medium">
                দীর্ঘ ২৫ বছরের বেশি সময় ধরে, নূরজাহান প্রাইভেট হাসপাতাল অ্যান্ড ডায়াগনস্টিক সেন্টার - ২ কুমারখালী এলাকার স্বাস্থ্য সেবায় বিশ্বস্ত একটি নাম। আমাদের লক্ষ্য হলো বিশ্বের অত্যাধুনিক প্রযুক্তি ব্যবহার করে উন্নত, সাশ্রয়ী এবং সহানুভূতিশীল চিকিৎসা সেবা প্রদান করা।
              </p>
              <p className="text-[#64748b] text-[15px] lg:text-[17px] leading-relaxed font-medium opacity-80">
                আমরা মানবিক দৃষ্টিভঙ্গির ওপর বিশ্বাস রাখি, যেখানে আমাদের বিশেষজ্ঞ কনসালটেন্ট এবং নার্সরা প্রত্যেক রোগীকে ব্যক্তিগত যত্ন ও মনোযোগ প্রদান করেন।
              </p>
            </div>

            <Button className="bg-[#1a4bde] hover:bg-[#0a1b4d] text-white font-bold rounded-xl px-12 py-7 transition-all shadow-[0_12px_30px_rgba(26,75,222,0.15)] border-0 text-[16px] h-fit hover:scale-105 active:scale-95 cursor-pointer">
              আমাদের গুণগত মান সম্পর্কে জানুন
            </Button>
          </div>

          {/* Right Images (Overlapping like in design) */}
          <div className="relative">
             <div className="relative z-10 w-4/5 aspect-[4/3] rounded-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.05)] border-8 border-white">
                <Image src="/medical-team-1.png" alt="Medical Team" fill className="object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-3/5 aspect-square rounded-xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.06)] border-8 border-white z-20">
                <Image src="/medical-team-2.png" alt="Doctors" fill className="object-cover" />
             </div>
             {/* Decorative UI element */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
