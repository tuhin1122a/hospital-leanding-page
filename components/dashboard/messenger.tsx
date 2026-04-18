'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, User, Search, Phone, Video, Minus, Maximize2 } from 'lucide-react'
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

export default function Messenger() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeContact, setActiveContact] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [contacts, setContacts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  const socketRef = useRef<Socket | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const getTotalUnreadCount = () => contacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0)
  
  const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

  const activeContactRef = useRef<any>(null)

  // Keep ref in sync with state so socket callbacks always see latest value
  useEffect(() => {
    activeContactRef.current = activeContact
  }, [activeContact])

  useEffect(() => {
    fetchProfile()
    fetchRecentChats()
    
    const token = getToken()
    if (!token) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers: authHeader() })
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user)
        
        // Connect socket ONCE — do not put activeContact in deps
        const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
          query: { userId: user.id }
        })
        socketRef.current = socket

        socket.on('newMessage', (msg) => {
          const current = activeContactRef.current
          if (current?.id === msg.senderId) {
            // Map gateway shape to DB shape so the message renders correctly
            setMessages(prev => [...prev, {
              senderId: msg.senderId || msg.from,
              content: msg.content || msg.message,
              createdAt: msg.createdAt || new Date(),
              read: false
            }])
            // Mark as read immediately
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/mark-read/${msg.senderId}`, {
              method: 'POST', headers: authHeader()
            })
          } else {
            fetchRecentChats()
          }
        })
        
        socket.on('messagesRead', ({ byUserId }) => {
          fetchRecentChats()
          if (activeContactRef.current?.id === byUserId) {
            setMessages(prev => prev.map(m =>
              m.senderId === user.id ? { ...m, read: true } : m
            ))
          }
        })

        socket.on('userStatus', ({ userId, status, lastActive }) => {
          setContacts(prev => prev.map(c =>
            c.id === userId ? { ...c, isOnline: status === 'online', lastActive } : c
          ))
          if (activeContactRef.current?.id === userId) {
            setActiveContact((prev: any) => ({ ...prev, isOnline: status === 'online', lastActive }))
          }
        })
      })
      .catch(err => console.error('Socket setup error:', err))

    return () => {
      socketRef.current?.disconnect()
    }
  }, []) // ← Run ONCE on mount only

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers: authHeader() })
      if (res.ok) setCurrentUser(await res.json())
    } catch (err) {}
  }

  const fetchRecentChats = async () => {
    try {
      const recentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/recent`, { headers: authHeader() })
      const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/contacts`, { headers: authHeader() })
      
      if (recentRes.ok && allRes.ok) {
         const recents = await recentRes.json()
         const all = await allRes.json()

         const mergedMap = new Map()
         recents.forEach((r: any) => mergedMap.set(r.id, r))
         
         all.forEach((a: any) => {
             if (!mergedMap.has(a.id)) {
                 mergedMap.set(a.id, { ...a, unreadCount: 0, lastMessage: 'Start a conversation', lastTime: a.lastActive || new Date().toISOString() })
             }
         })

         const sorted = Array.from(mergedMap.values()).sort((a:any, b:any) => new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime())
         setContacts(sorted)
      }
    } catch (err) {}
  }

  const fetchMessages = async (contactId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${contactId}`, { headers: authHeader() })
      if (res.ok) setMessages(await res.json())
    } catch (err) {}
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeContact) return

    const msg = { to: activeContact.id, content: newMessage }
    setMessages(prev => [...prev, { senderId: currentUser.id, content: newMessage, createdAt: new Date(), read: false }])
    setNewMessage('')

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/send`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(msg)
      })
    } catch (err) {}
  }

  const selectContact = (contact: any) => {
    setActiveContact(contact)
    fetchMessages(contact.id)
    setIsMinimized(false)
    // Mark as read when selecting
    if (contact.unreadCount > 0) {
       fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/mark-read/${contact.id}`, { method: 'POST', headers: authHeader() })
       .then(() => fetchRecentChats())
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`w-[400px] h-[600px] bg-card border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden pointer-events-auto transform-gpu ${isMinimized ? 'h-20' : ''}`}
          >
            {/* Header */}
            <div className={`p-5 bg-foreground text-background flex items-center justify-between transition-all ${isMinimized ? 'rounded-full mx-2 mt-2 h-16' : ''}`}>
               <div className="flex items-center gap-3">
                  {activeContact ? (
                    <>
                       <button onClick={() => setActiveContact(null)} className="p-2 hover:bg-white/10 rounded-full">
                          <Minus size={16} />
                       </button>
                       <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-white/20 overflow-hidden relative">
                             {activeContact.profilePic ? <img src={activeContact.profilePic} className="w-full h-full object-cover" /> : <img src="/favicon (2).png" className="w-6 h-6 m-auto mt-2 object-contain opacity-50" />}
                          </div>
                          <span className={`absolute bottom-[-1px] right-[-1px] w-2.5 h-2.5 ${activeContact.isOnline ? 'bg-emerald-500' : 'bg-zinc-400'} border-2 border-foreground rounded-full z-10`}></span>
                       </div>
                       <div>
                          <p className="text-sm font-black tracking-tight flex items-center gap-2">
                             {activeContact.name}
                             {activeContact.isOnline && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}
                          </p>
                          <p className="text-[10px] font-bold text-white/60 flex items-center gap-1.5 mt-0.5">
                             <span className="uppercase tracking-widest">{activeContact.role}</span>
                             <span className="opacity-40">•</span>
                             {activeContact.isOnline ? (
                                <span className="lowercase font-medium text-emerald-400 font-bold">Online</span>
                             ) : (
                                <span className="lowercase font-medium opacity-80">
                                   Offline {activeContact.lastActive ? `• ${getTimeAgo(activeContact.lastActive)}` : ''}
                                </span>
                             )}
                          </p>
                       </div>
                    </>
                  ) : (
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-inner">
                        <img src="/favicon (2).png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                       <h3 className="font-black text-lg tracking-tighter ml-2">{t('Live Messenger')}</h3>
                  )}
               </div>
               <div className="flex items-center gap-2">
                  <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-full">
                     {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                     <X size={16} />
                  </button>
               </div>
            </div>

            {!isMinimized && (
              <>
                {activeContact ? (
                  /* Chat Box */
                  <div className="flex-grow flex flex-col overflow-hidden bg-muted/20">
                     <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar min-h-0">
                        {messages.map((m, i) => (
                           <div key={i} className={`flex ${m.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-4 rounded-xl text-sm font-medium ${m.senderId === currentUser?.id ? 'bg-primary text-white rounded-tr-none' : 'bg-card border border-border text-card-foreground rounded-tl-none shadow-sm'}`}>
                                 {m.content}
                                 <p className={`text-[9px] mt-1 opacity-60 flex items-center gap-1 ${m.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                                    {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {m.senderId === currentUser?.id && (
                                       <span className={`text-[10px] font-black ${m.read ? 'text-sky-300 drop-shadow-[0_0_2px_rgba(125,211,252,0.5)]' : 'text-white/30'}`}>
                                          {m.read ? '✓✓' : '✓'}
                                       </span>
                                    )}
                                 </p>
                              </div>
                           </div>
                        ))}
                        <div ref={chatEndRef} />
                     </div>
                     <form onSubmit={handleSendMessage} className="p-5 bg-card border-t border-border flex gap-3">
                        <input 
                           type="text" 
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           placeholder={t('Type a message...')}
                           className="flex-grow h-12 px-5 bg-muted rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 focus:ring-primary/20"
                        />
                        <button type="submit" className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                           <Send size={18} />
                        </button>
                     </form>
                  </div>
                ) : (
                  /* Contacts List */
                  <div className="flex-grow flex flex-col overflow-hidden">
                     <div className="p-5">
                        <div className="relative">
                           <Search className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                           <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder={t('Search contacts...')}
                              className="w-full h-11 pl-12 pr-4 bg-muted rounded-2xl border-none outline-none text-xs font-bold"
                           />
                        </div>
                     </div>
                     <div className="flex-grow overflow-y-auto custom-scrollbar">
                        {contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase())).map((c, i) => (
                           <div 
                              key={c.id || i} 
                              onClick={() => { selectContact(c); setSearchQuery(''); }}
                              className="p-4 flex items-center gap-4 hover:bg-muted/50 cursor-pointer border-b border-border/50 mx-4 rounded-2xl transition-all"
                           >
                              <div className="relative shrink-0">
                                 <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden relative">
                                    {c.profilePic ? <img src={c.profilePic} className="w-full h-full object-cover" /> : <img src="/favicon (2).png" className="w-6 h-6 m-auto mt-3 object-contain opacity-50" />}
                                 </div>
                                 <span className={`absolute bottom-[-1px] right-[-1px] w-3 h-3 ${c.isOnline ? 'bg-emerald-500' : 'bg-zinc-400'} border-2 border-card rounded-full z-10`}></span>
                              </div>
                              <div className="flex-grow overflow-hidden">
                                 <div className="flex justify-between items-center mb-0.5">
                                    <p className="font-black text-sm text-card-foreground flex items-center gap-2">
                                       {c.name}
                                       {c.isOnline && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)] animate-pulse"></span>}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground font-bold">{new Date(c.lastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                 </div>
                                 <div className="flex justify-between items-center w-full">
                                   <p className={`text-xs ${c.unreadCount > 0 ? 'text-primary font-black' : 'text-muted-foreground font-medium'} truncate italic flex-grow`}>
                                     {c.read === false ? <span className="mr-1 text-[10px]">✓</span> : 
                                      c.read === true ? <span className="mr-1 text-[10px] text-blue-500">✓✓</span> : ''} {c.lastMessage}
                                   </p>
                                   {c.unreadCount > 0 && (
                                     <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ml-2">
                                       {c.unreadCount}
                                     </span>
                                   )}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all pointer-events-auto relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {getTotalUnreadCount() > 0 && (
           <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-background flex items-center justify-center text-[10px] font-black group-hover:animate-bounce">
             {getTotalUnreadCount()}
           </span>
        )}
      </button>
    </div>
  )
}
