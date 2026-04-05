'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, User, Search, Phone, Video, Info, MoreVertical, Maximize2, Paperclip, Smile } from 'lucide-react'
import { io, Socket } from 'socket.io-client'
import { useLanguage } from '@/contexts/LanguageContext'

const getTimeAgo = (date: any) => {
  if (!date) return '';
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  return 'just now';
};

export default function FullscreenMessenger() {
  const { t } = useLanguage()
  const [activeContact, setActiveContact] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [contacts, setContacts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  const socketRef = useRef<Socket | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const activeContactRef = useRef<any>(null)

  useEffect(() => {
    activeContactRef.current = activeContact
  }, [activeContact])

  const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

  useEffect(() => {
    const init = async () => {
      const token = getToken()
      if (!token) return

      try {
        const profileRes = await fetch('http://localhost:5000/auth/me', { headers: authHeader() })
        if (profileRes.ok) {
          const user = await profileRes.json()
          setCurrentUser(user)

          socketRef.current = io('http://localhost:5000', {
            query: { userId: user.id }
          })

          socketRef.current.on('newMessage', (msg) => {
             const currentActiveContact = activeContactRef.current
             if (currentActiveContact?.id === msg.senderId || currentActiveContact?.id === msg.receiverId) {
                setMessages(prev => [...prev, msg])
                if (currentActiveContact?.id === msg.senderId) {
                  fetch(`http://localhost:5000/chat/mark-read/${currentActiveContact.id}`, { method: 'POST', headers: authHeader() }).then(() => {
                    window.dispatchEvent(new CustomEvent('unreadMessageUpdate'))
                  })
                }
             }
             fetchContacts()
          })

          socketRef.current.on('messagesRead', ({ byUserId }) => {
             fetchContacts()
             const currentActiveContact = activeContactRef.current
             if (currentActiveContact?.id === byUserId) {
                setMessages(prev => prev.map(m => m.senderId === user.id ? { ...m, read: true } : m))
             }
          })

          socketRef.current.on('userStatus', ({ userId, status, lastActive }) => {
             setContacts(prev => prev.map(c => c.id === userId ? { ...c, isOnline: status === 'online', lastActive } : c))
             const currentActiveContact = activeContactRef.current
             if (currentActiveContact?.id === userId) {
               setActiveContact((prev: any) => ({ ...prev, isOnline: status === 'online', lastActive }))
             }
          })
        }
      } catch (err) {}

      await fetchContacts()
    }
    init()

    return () => {
      socketRef.current?.disconnect()
    }
  }, []) // Mount only

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchContacts = async () => {
    try {
      // Fetch all system users
      let allUsers: any[] = []
      const usersRes = await fetch('http://localhost:5000/chat/contacts', { headers: authHeader() })
      if (usersRes.ok) {
        allUsers = await usersRes.json()
      }

      // Fetch recent chats (will have lastMessage, lastTime)
      let recentChats: any[] = []
      const recentRes = await fetch('http://localhost:5000/chat/recent', { headers: authHeader() })
      if (recentRes.ok) {
        recentChats = await recentRes.json()
      }

      // Merge them: Recent chats first, then the rest
      const recentIds = new Set(recentChats.map(r => r.id))
      const others = allUsers.filter(u => !recentIds.has(u.id))

      const mergedContacts = [...recentChats, ...others]
      setContacts(mergedContacts)
    } catch (err) {}
  }

  const fetchMessages = async (contactId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/chat/messages/${contactId}`, { headers: authHeader() })
      if (res.ok) setMessages(await res.json())
      else setMessages([])
    } catch (err) {
      setMessages([])
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeContact) return

    const msg = { to: activeContact.id, content: newMessage }
    
    // Optimistic update
    const tempMessage = { senderId: currentUser.id, content: newMessage, createdAt: new Date().toISOString(), read: false }
    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')

    try {
      await fetch('http://localhost:5000/chat/send', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(msg)
      })
      fetchContacts() // Update recent list order
    } catch (err) {}
  }

  const selectContact = async (contact: any) => {
    setActiveContact(contact)
    fetchMessages(contact.id)
    try {
      await fetch(`http://localhost:5000/chat/mark-read/${contact.id}`, { method: 'POST', headers: authHeader() })
      window.dispatchEvent(new CustomEvent('unreadMessageUpdate'))
    } catch {}
  }

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || (c.role && c.role.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <div className="h-[calc(100vh-8rem)] w-full flex bg-card rounded-2xl border border-border shadow-sm overflow-hidden p-2 gap-2 relative">
      
      {/* Sidebar Contacts List */}
      <div className="w-full md:w-96 flex flex-col h-full bg-muted/40 rounded-xl border border-border/50 overflow-hidden shrink-0">
        
        {/* Contacts Header */}
        <div className="p-5 md:p-6 bg-card border-b border-border shadow-sm z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-inner">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-card-foreground tracking-tight">{t('Messages')}</h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('Inbox & Teams')}</p>
            </div>
          </div>
          
          <div className="relative group">
             <Search className="absolute left-4 top-3 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
             <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search staff...')}
                className="w-full h-10 pl-11 pr-4 bg-muted hover:bg-muted/80 rounded-lg border border-transparent outline-none text-sm font-semibold transition-all focus:border-primary/30 focus:bg-card focus:ring-4 focus:ring-primary/5"
             />
          </div>
        </div>

        {/* Contacts Scrollable */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-1.5">
           {filteredContacts.length === 0 ? (
             <div className="text-center py-12 text-muted-foreground">
               <Info size={28} className="mx-auto mb-2 opacity-20" />
               <p className="text-xs font-bold">{t('No contacts found')}</p>
             </div>
           ) : filteredContacts.map((c, i) => (
              <div 
                 key={c.id || i} 
                 onClick={() => selectContact(c)}
                 className={`p-3 flex items-center gap-3 cursor-pointer rounded-xl transition-all border ${
                   activeContact?.id === c.id 
                   ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 border-primary border-opacity-20' 
                   : 'hover:bg-card border-transparent text-card-foreground'
                 }`}
              >
                 <div className="relative shrink-0">
                    <div className={`w-12 h-12 rounded-lg overflow-hidden ${activeContact?.id === c.id ? 'bg-white/10' : 'bg-background shadow-inner'}`}>
                       {c.profilePic ? <img src={c.profilePic} alt={c.name} className="w-full h-full object-cover" /> : <User size={18} className={`m-auto mt-3.5 ${activeContact?.id === c.id ? 'text-white' : 'text-muted-foreground'}`} />}
                    </div>
                    <span className={`absolute bottom-[-2px] right-[-2px] w-3.5 h-3.5 ${c.isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-300'} border-[3px] ${activeContact?.id === c.id ? 'border-primary' : 'border-card'} rounded-full transition-all duration-300 z-10`}></span>
                 </div>
                 <div className="flex-grow overflow-hidden">
                    <div className="flex justify-between items-center mb-0.5">
                       <p className={`font-bold text-sm flex items-center gap-1.5 overflow-hidden ${activeContact?.id === c.id ? 'text-white' : 'text-card-foreground'}`}>
                          <span className="truncate">{c.name}</span>
                          {c.isOnline && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90 animate-pulse shrink-0"></span>}
                       </p>
                       <p className={`text-[9px] font-bold ${activeContact?.id === c.id ? 'text-white/70' : 'text-muted-foreground/70'}`}>
                         {c.lastTime ? new Date(c.lastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                       </p>
                    </div>
                    {c.lastMessage ? (
                      <p className={`text-[11px] font-medium truncate ${activeContact?.id === c.id ? 'text-white/80' : 'text-muted-foreground'}`}>{c.lastMessage}</p>
                    ) : (
                      <p className={`text-[10px] font-semibold truncate ${activeContact?.id === c.id ? 'text-white/60' : 'text-primary/60'} uppercase tracking-widest`}>{t(c.role)}</p>
                    )}
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-grow h-full bg-card rounded-xl overflow-hidden flex flex-col border border-border/50 relative ${!activeContact ? 'hidden md:flex' : 'flex absolute inset-0 md:relative z-20'}`}>
        
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 md:px-6 border-b border-border bg-card/80 backdrop-blur-md shrink-0 flex items-center justify-between shadow-sm z-10 relative">
               <div className="flex items-center gap-3">
                  <button onClick={() => setActiveContact(null)} className="md:hidden p-2 rounded-lg bg-muted hover:bg-border transition-colors">
                     <X size={18} />
                  </button>
                   <div className="relative shrink-0">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0 border border-border overflow-hidden">
                         {activeContact.profilePic ? <img src={activeContact.profilePic} alt={activeContact.name} className="w-full h-full object-cover" /> : <User size={20} className="text-muted-foreground" />}
                      </div>
                      <span className={`absolute bottom-[-2px] right-[-2px] w-3.5 h-3.5 ${activeContact.isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-300'} border-[3px] border-card rounded-full z-10`}></span>
                   </div>
                  <div>
                    <h3 className="text-base font-black text-card-foreground tracking-tight flex items-center gap-2">
                       {activeContact.name}
                       {activeContact.isOnline && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}
                    </h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5 ${activeContact.isOnline ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                      {activeContact.isOnline ? (
                        <>
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse blur-[1px]"></span>
                          {t('Online')} • {t(activeContact.role || 'Staff')}
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></span>
                          Offline {activeContact.lastActive ? `• ${getTimeAgo(activeContact.lastActive)}` : ''} • {t(activeContact.role || 'Staff')}
                        </>
                      )}
                    </p>
                  </div>
               </div>
               <div className="flex items-center gap-1.5 hidden sm:flex">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                     <Phone size={16} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-50 text-teal-500 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/20 transition-all">
                     <Video size={16} />
                  </button>
                  <div className="w-px h-6 bg-border mx-1"></div>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                     <Info size={16} />
                  </button>
               </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-muted/10 relative">
               <div className="text-center pb-2">
                 <span className="px-3 py-1 rounded-full bg-muted border border-border text-[9px] font-black tracking-widest uppercase text-muted-foreground">Today</span>
               </div>
               
               {messages.length === 0 ? (
                 <div className="h-full flex items-center justify-center py-12">
                   <div className="text-center bg-card p-6 rounded-2xl shadow-sm border border-border/50 max-w-sm">
                     <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                       <MessageSquare size={32} />
                     </div>
                     <h4 className="text-lg font-bold text-card-foreground mb-1">{t('Start a Conversation')}</h4>
                     <p className="text-sm text-muted-foreground">{t(`Send a message to ${activeContact.name} to start chatting.`)}</p>
                   </div>
                 </div>
               ) : (
                 messages.map((m, i) => {
                   const isMine = m.senderId === currentUser?.id;
                   return (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       key={i} 
                       className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                     >
                        <div className={`max-w-[75%] md:max-w-[65%] flex gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                           
                           {!isMine && (
                             <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-auto mb-1 overflow-hidden border border-border">
                                {activeContact.profilePic ? <img src={activeContact.profilePic} className="w-full h-full object-cover" /> : <User size={12} />}
                             </div>
                           )}

                           <div className={`px-4 py-3 sm:p-4 rounded-xl text-sm font-medium shadow-sm relative group ${
                             isMine 
                             ? 'bg-primary text-primary-foreground rounded-br-none' 
                             : 'bg-card border border-border text-card-foreground rounded-bl-none'
                           }`}>
                              <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                              <p className={`text-[9px] mt-1.5 font-bold opacity-60 flex items-center gap-1 ${isMine ? 'justify-end text-primary-foreground' : 'justify-start text-muted-foreground'}`}>
                                 {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                 {isMine && m.read !== undefined && (
                                    <span className={`text-[10px] font-black ${m.read ? 'text-sky-300' : 'text-white/40'}`}>
                                       {m.read ? '✓✓' : '✓'}
                                    </span>
                                 )}
                              </p>
                           </div>

                        </div>
                     </motion.div>
                   );
                 })
               )}
               <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-card border-t border-border shrink-0">
               <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-muted/60 p-1.5 rounded-xl border border-border/50 focus-within:border-primary/40 focus-within:bg-card focus-within:shadow-lg focus-within:shadow-primary/5 transition-all">
                  <button type="button" className="p-2 sm:p-2.5 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                     <Paperclip size={18} />
                  </button>
                  
                  <textarea 
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     placeholder={t('Write your message...')}
                     className="flex-grow max-h-32 min-h-[40px] bg-transparent border-none outline-none text-sm font-semibold text-card-foreground resize-none py-2.5 custom-scrollbar placeholder:text-muted-foreground"
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' && !e.shiftKey) {
                         e.preventDefault();
                         handleSendMessage(e as any);
                       }
                     }}
                  />

                  <button type="button" className="p-2 sm:p-2.5 text-muted-foreground hover:text-foreground transition-colors shrink-0 hidden sm:block">
                     <Smile size={18} />
                  </button>

                  <button 
                     type="submit" 
                     disabled={!newMessage.trim()}
                     className="w-10 h-10 sm:w-11 sm:h-11 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:scale-105 hover:shadow-md hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none transition-all shrink-0"
                  >
                     <Send size={16} className="ml-1" />
                  </button>
               </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-muted/10">
             <div className="w-24 h-24 bg-card border border-border shadow-lg rounded-full flex items-center justify-center text-primary/40 mb-5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MessageSquare size={36} className="group-hover:scale-110 transition-transform duration-500" />
             </div>
             <h2 className="text-2xl sm:text-3xl font-black text-card-foreground tracking-tight mb-2">{t('Nurjahan Workspace')}</h2>
             <p className="text-sm font-medium text-muted-foreground max-w-sm mx-auto">
               {t('Select a contact from the sidebar to open a conversation or start a new medical chat.')}
             </p>
          </div>
        )}
      </div>
    </div>
  )
}
