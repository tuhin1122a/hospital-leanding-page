'use client'

import React from 'react'
import { Search, MessageSquare, Info, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ContactListProps {
  contacts: any[]
  activeContact: any
  onSelect: (contact: any) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function ContactList({ contacts, activeContact, onSelect, searchQuery, setSearchQuery }: ContactListProps) {
  const { t } = useLanguage()

  return (
    <div className="w-full md:w-96 flex flex-col h-full bg-muted/40 rounded-xl border border-border/50 overflow-hidden shrink-0">
      <div className="p-5 md:p-6 bg-card border-b border-border shadow-sm z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-inner"><MessageSquare size={20} /></div>
          <div><h2 className="text-xl font-black text-card-foreground tracking-tight">{t('Messages')}</h2><p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('Inbox & Teams')}</p></div>
        </div>
        <div className="relative group">
           <Search className="absolute left-4 top-3 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
           <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('Search staff...')} className="w-full h-10 pl-11 pr-4 bg-muted hover:bg-muted/80 rounded-lg border border-transparent outline-none text-sm font-semibold transition-all focus:border-primary/30 focus:bg-card focus:ring-4 focus:ring-primary/5" />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-1.5">
         {contacts.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground"><Info size={28} className="mx-auto mb-2 opacity-20" /><p className="text-xs font-bold">{t('No contacts found')}</p></div>
         ) : contacts.map((c, i) => (
            <div key={c.id || i} onClick={() => onSelect(c)} className={`p-3 flex items-center gap-3 cursor-pointer rounded-xl transition-all border ${activeContact?.id === c.id ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 border-primary border-opacity-20' : 'hover:bg-card border-transparent text-card-foreground'}`}>
               <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-lg overflow-hidden ${activeContact?.id === c.id ? 'bg-white/10' : 'bg-background shadow-inner'}`}>
                     {c.profilePic ? <img src={c.profilePic} alt={c.name} className="w-full h-full object-cover" /> : <User size={18} className={`m-auto mt-3.5 ${activeContact?.id === c.id ? 'text-white' : 'text-muted-foreground'}`} />}
                  </div>
                  <span className={`absolute bottom-[-2px] right-[-2px] w-3.5 h-3.5 ${c.isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-300'} border-[3px] ${activeContact?.id === c.id ? 'border-primary' : 'border-card'} rounded-full transition-all duration-300 z-10`}></span>
               </div>
               <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                     <p className={`font-bold text-sm flex items-center gap-1.5 overflow-hidden ${activeContact?.id === c.id ? 'text-white' : 'text-card-foreground'}`}><span className="truncate">{c.name}</span>{c.isOnline && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90 animate-pulse shrink-0"></span>}</p>
                     <p className={`text-[9px] font-bold ${activeContact?.id === c.id ? 'text-white/70' : 'text-muted-foreground/70'}`}>{c.lastTime ? new Date(c.lastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                  </div>
                  {c.lastMessage ? <p className={`text-[11px] font-medium truncate ${activeContact?.id === c.id ? 'text-white/80' : 'text-muted-foreground'}`}>{c.lastMessage}</p> : <p className={`text-[10px] font-semibold truncate ${activeContact?.id === c.id ? 'text-white/60' : 'text-primary/60'} uppercase tracking-widest`}>{t(c.role)}</p>}
               </div>
            </div>
         ))}
      </div>
    </div>
  )
}
