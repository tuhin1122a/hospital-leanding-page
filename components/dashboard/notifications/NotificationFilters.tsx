'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface NotificationFiltersProps {
  filter: string
  setFilter: (f: string) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
}

const filterOptions = [
  { id: 'ALL', label: 'All Activities' },
  { id: 'UNREAD', label: 'Unread' },
  { id: 'PATIENT', label: 'Admissions/Releases' },
  { id: 'APPOINTMENT', label: 'Appointments' },
  { id: 'PAYMENT', label: 'Payments' },
  { id: 'SYSTEM', label: 'Added/Deleted' }
]

export default function NotificationFilters({ filter, setFilter, searchQuery, setSearchQuery }: NotificationFiltersProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <div className="relative w-full lg:w-96 flex-shrink-0 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" /></div>
        <input type="text" placeholder={t("Search logs, patients, events...")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-card border border-border pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium transition-all shadow-sm" />
      </div>
      <div className="flex-1 overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
        <div className="flex items-center gap-2 min-w-max">
          {filterOptions.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border shadow-sm ${filter === f.id ? 'bg-card border-border text-primary ring-1 ring-primary/10' : 'bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-card-foreground'}`}>
              {t(f.label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
