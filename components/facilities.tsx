import { Activity, Layers, Microscope, Settings } from 'lucide-react'
import { FacilityCard } from './facility-card'

export default function MedicalFacilities() {
  const facilities = [
    {
      id: 'mri-imaging',
      name: 'অ্যাডভান্সড এম.আর.আই (MRI) ইমেজিং',
      tech: 'নিখুঁত ও উন্নত রিপোর্ট',
      desc: 'আমাদের সর্বাধুনিক প্রযুক্তির এম.আর.আই মেশিনের মাধ্যমে নিউরো এবং অর্থোপেডিকের স্পষ্ট রোগ নির্ণয় করা যায়।',
      image: '/mri-machine.png',
      icon: <Layers className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'icu-monitoring',
      name: 'আই.সি.ইউ নিবিড় পর্যবেক্ষণ',
      tech: 'লাইফ-সাপোর্ট টেকনোলজি',
      desc: '২৪/৭ গুরুতর রোগীদের সার্বক্ষণিক পর্যবেক্ষণের জন্য উন্নত মাল্টি-প্যারামিটার মনিটর এবং লাইফ সাপোর্ট ব্যবস্থা।',
      image: '/icu-monitor.png',
      icon: <Activity className="w-6 h-6 text-[#f36424]" />
    },
    {
      id: 'operation-suite',
      name: 'জীবাণুমুক্ত অপারেশন থিয়েটার',
      tech: 'আধুনিক মাইক্রো-সার্জিক্যাল প্রযুক্তি',
      desc: 'নিরাপদ ও জটিল অপারেশনের জন্য আধুনিক উন্নতমানের সার্জিক্যাল লাইটিং এবং অ্যানেসথেসিয়া সিস্টেম।',
      image: '/hero-doctor.png',
      icon: <Settings className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'lab-diagnosis',
      name: 'ডিজিটাল ল্যাব ডায়াগনোসিস',
      tech: 'সম্পূর্ণ স্বয়ংক্রিয় প্রযুক্তি',
      desc: 'নির্ভুল এবং দ্রুত প্যাথলজি রিপোর্টের জন্য আধুনিক বায়োকেমিক্যাল অ্যানালাইজার দ্বারা পরীক্ষা।',
      image: '/dashboard/dashboard-preview.png',
      icon: <Microscope className="w-6 h-6 text-[#f36424]" />
    }
  ]

  return (
    <section id="facilities" className="py-24 bg-[#f8faff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tight" style={{ fontFamily: "'Anek Bangla', sans-serif" }}>
            আমাদের অত্যাধুনিক <span className="text-[#1a4bde]">মেডিকেল প্রযুক্তি</span>
          </h2>
          <p className="text-[#64748b] font-medium max-w-2xl mx-auto">
            নূরজাহান হাসপাতাল-২ আপনাকে নির্ভুল রোগ নির্ণয় এবং উন্নত স্বাস্থ্যসেবা প্রদানের জন্য বিশ্বমানের সর্বাধুনিক চিকিৎসা যন্ত্রপাতিতে সমৃদ্ধ।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {facilities.map((f, i) => (
            <FacilityCard key={i} facility={f} />
          ))}
        </div>
      </div>
    </section>
  )
}

