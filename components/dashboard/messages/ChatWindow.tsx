'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, User, Phone, Video, Info, MessageSquare, Paperclip, Smile, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ChatWindowProps {
  activeContact: any
  currentUser: any
  messages: any[]
  newMessage: string
  setNewMessage: (msg: string) => void
  onSendMessage: (e: React.FormEvent) => void
  onClose: () => void
  chatEndRef: React.RefObject<HTMLDivElement>
}

export default function ChatWindow({ activeContact, currentUser, messages, newMessage, setNewMessage, onSendMessage, onClose, chatEndRef }: ChatWindowProps) {
  const { t } = useLanguage()

  if (!activeContact) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-muted/10">
         <div className="w-24 h-24 bg-card border border-border shadow-lg rounded-full flex items-center justify-center text-primary/40 mb-5 relative group overflow-hidden">
            <MessageSquare size={36} className="group-hover:scale-110 transition-transform duration-500" />
         </div>
         <h2 className="text-2xl sm:text-3xl font-black text-card-foreground tracking-tight mb-2">{t('Nurjahan Workspace')}</h2>
         <p className="text-sm font-medium text-muted-foreground max-w-sm mx-auto">{t('Select a contact from the sidebar to open a conversation.')}</p>
      </div>
    )
  }

  return (
    <div className="flex-grow h-full bg-card rounded-xl overflow-hidden flex flex-col border border-border/50 relative z-20">
      <div className="p-4 md:px-6 border-b border-border bg-card/80 backdrop-blur-md shrink-0 flex items-center justify-between shadow-sm z-10">
         <div className="flex items-center gap-3">
            <button onClick={onClose} className="md:hidden p-2 rounded-lg bg-muted hover:bg-border transition-colors"><X size={18} /></button>
            <div className="relative shrink-0">
               <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0 border border-border overflow-hidden">
                  {activeContact.profilePic ? <img src={activeContact.profilePic} alt={activeContact.name} className="w-full h-full object-cover" /> : <User size={20} className="text-muted-foreground" />}
               </div>
               <span className={`absolute bottom-[-2px] right-[-2px] w-3.5 h-3.5 ${activeContact.isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-300'} border-[3px] border-card rounded-full z-10`}></span>
            </div>
            <div>
              <h3 className="text-base font-black text-card-foreground tracking-tight flex items-center gap-2">{activeContact.name}{activeContact.isOnline && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}</h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${activeContact.isOnline ? 'text-emerald-500' : 'text-muted-foreground'}`}>{activeContact.isOnline ? t('Online') : t('Offline')} • {t(activeContact.role || 'Staff')}</p>
            </div>
         </div>
         <div className="flex items-center gap-1.5 hidden sm:flex">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all"><Phone size={16} /></button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-50 text-teal-500 hover:bg-teal-500 hover:text-white transition-all"><Video size={16} /></button>
            <div className="w-px h-6 bg-border mx-1"></div>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-all"><Info size={16} /></button>
         </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-muted/10 relative">
         {messages.map((m, i) => {
           const isMine = m.senderId === currentUser?.id;
           return (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] md:max-w-[65%] flex gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                   {!isMine && <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-auto mb-1 overflow-hidden border border-border">{activeContact.profilePic ? <img src={activeContact.profilePic} className="w-full h-full object-cover" /> : <User size={12} />}</div>}
                   <div className={`px-4 py-3 sm:p-4 rounded-xl text-sm font-medium shadow-sm relative group ${isMine ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card border border-border text-card-foreground rounded-bl-none'}`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                      <p className={`text-[9px] mt-1.5 font-bold opacity-60 flex items-center gap-1 ${isMine ? 'justify-end text-primary-foreground' : 'justify-start text-muted-foreground'}`}>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{isMine && <span className={`text-[10px] font-black ${m.read ? 'text-sky-300' : 'text-white/40'}`}>{m.read ? '✓✓' : '✓'}</span>}</p>
                   </div>
                </div>
             </motion.div>
           );
         })}
         <div ref={chatEndRef} />
      </div>

      <div className="p-3 md:p-4 bg-card border-t border-border shrink-0">
         <form onSubmit={onSendMessage} className="flex items-end gap-2 bg-muted/60 p-1.5 rounded-xl border border-border/50 focus-within:border-primary/40 focus-within:bg-card transition-all">
            <button type="button" className="p-2 sm:p-2.5 text-muted-foreground hover:text-foreground shrink-0"><Paperclip size={18} /></button>
            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={t('Write your message...')} className="flex-grow max-h-32 min-h-[40px] bg-transparent border-none outline-none text-sm font-semibold py-2.5 custom-scrollbar" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSendMessage(e as any) } }} />
            <button type="button" className="p-2 sm:p-2.5 text-muted-foreground hover:text-foreground shrink-0 hidden sm:block"><Smile size={18} /></button>
            <button type="submit" disabled={!newMessage.trim()} className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shrink-0"><Send size={16} className="ml-1" /></button>
         </form>
      </div>
    </div>
  )
}
