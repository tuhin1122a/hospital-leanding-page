import { Activity, Layers, Microscope, Settings } from 'lucide-react'
import { FacilityCard } from './facility-card'

export default function MedicalFacilities() {
  const facilities = [
    {
      id: 'mri-imaging',
      name: 'Advanced MRI Imaging',
      tech: 'High-Field Precision',
      desc: 'Our new MRI suite provides ultra-clear diagnostic imaging for neuro and orthopedic needs.',
      image: '/mri-machine.png',
      icon: <Layers className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'icu-monitoring',
      name: 'ICU Critical Monitoring',
      tech: 'Life-Support Technology',
      desc: 'State-of-the-art bedside multi-parameter monitors for 24/7 critical patient oversight.',
      image: '/icu-monitor.png',
      icon: <Activity className="w-6 h-6 text-[#f36424]" />
    },
    {
      id: 'operation-suite',
      name: 'Sterile Operation Suite',
      tech: 'Micro-Surgical Tech',
      desc: 'Modern surgical lighting and anesthesia systems for safe and complex procedures.',
      image: '/hero-doctor.png',
      icon: <Settings className="w-6 h-6 text-[#1a4bde]" />
    },
    {
      id: 'lab-diagnosis',
      name: 'Digital Lab Diagnosis',
      tech: 'Fully Automated',
      desc: 'Top-tier biochemical analyzers for instant and accurate pathology reports.',
      image: '/dashboard/dashboard-preview.png',
      icon: <Microscope className="w-6 h-6 text-[#f36424]" />
    }
  ]

  return (
    <section className="py-24 bg-[#f8faff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a1b4d] tracking-tight">
            Our Premium <span className="text-[#1a4bde]">Medical Technology</span>
          </h2>
          <p className="text-[#64748b] font-medium max-w-2xl mx-auto">
            Nurjahan Hospital-2 invest in the worlds most advanced medical machines to provide you with accurate diagnosis and premium healthcare.
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

