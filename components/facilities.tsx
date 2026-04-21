import { Activity, Layers, Microscope, Settings } from 'lucide-react'
import { FacilityCard } from './facility-card'

export default function MedicalFacilities() {
  const facilities = [
    {
      id: 'digital-imaging',
      name: 'ডিজিটাল এক্স-রে ও আলট্রা',
      tech: 'High-Resolution Diagnostic',
      desc: 'নির্ভুল রোগ নির্ণয়ের জন্য আমাদের রয়েছে অত্যাধুনিক ডিজিটাল এক্স-রে এবং ডিজিটাল আলট্রাসনোগ্রাফি মেশিন।',
      image: '/mri-machine.png',
      icon: <Layers className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'pathology-center',
      name: 'আধুনিক প্যাথলজি ল্যাব',
      tech: 'স্বয়ংক্রিয় ল্যাবরেটরি প্রযুক্তি',
      desc: 'ডিজিটাল মেশিনের মাধ্যমে রক্তের যাবতীয় পরীক্ষা, হরমন, ভিটামিন-ডি এবং ডায়বেটিস টেস্টের সুব্যবস্থা।',
      image: '/icu-monitor.png',
      icon: <Activity className="w-6 h-6 text-[#f36424]" />
    },
    {
      id: 'surgical-tech',
      name: 'অ্যাডভান্সড সার্জিক্যাল ইউনিট',
      tech: 'আধুনিক অপারেশন সুবিধা',
      desc: 'অভিজ্ঞ ডাক্তারদের দ্বারা সিজার, অ্যাপেনডিস, জরায়ু ও পিত্তথলির পাথরসহ যাবতীয় অপারেশনের আধুনিক সরঞ্জাম।',
      image: '/hero-doctor.png',
      icon: <Settings className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'heart-diagnosis',
      name: 'ইসিজি (ECG) ও ইকো (Echo)',
      tech: 'কার্ডিয়াক ডায়াগনস্টিক',
      desc: 'হৃদরোগের সঠিক অবস্থা দ্রুত ও নির্ভুলভাবে নির্ণয় করতে আমাদের রয়েছে ডিজিটাল ইসিজি ও ইকো মেশিন।',
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

