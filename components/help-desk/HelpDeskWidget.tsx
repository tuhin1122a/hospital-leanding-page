'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Stethoscope, 
  Headset, 
  Send, 
  X, 
  User, 
  Bot, 
  ChevronRight,
  Loader2,
  Sparkles
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type Message = {
  id: string
  text: string
  sender: 'user' | 'ai' | 'reception'
  timestamp: Date
}

export default function HelpDeskWidget() {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'menu' | 'ai' | 'reception'>('menu')
  const [showLangSelect, setShowLangSelect] = useState(false)
  const [chatLang, setChatLang] = useState<'bn' | 'en'>('bn')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<any>(null)

  // Initialize Visitor ID
  useEffect(() => {
    let id = localStorage.getItem('hospital_visitor_id')
    if (!id) {
      id = `vis_${Math.random().toString(36).slice(2, 11)}`
      localStorage.setItem('hospital_visitor_id', id)
    }
    setVisitorId(id)
  }, [])

  // Socket Connection for Visitor
  useEffect(() => {
    if (!visitorId || !isOpen || mode !== 'reception') return

    const { io } = require('socket.io-client')
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      query: { visitorId }
    })

    socket.on('newMessage', (msg: any) => {
      setMessages(prev => [...prev, {
        id: msg.id || `msg_${Date.now()}`,
        text: msg.content,
        sender: msg.senderId ? 'reception' : 'user',
        timestamp: new Date(msg.createdAt || Date.now())
      }])
    })

    socketRef.current = socket
    return () => socket.disconnect()
  }, [visitorId, isOpen, mode])

  // Fetch History when opening or changing mode
  useEffect(() => {
    if (!visitorId || !isOpen) return

    const fetchHistory = async () => {
       try {
         const url = mode === 'reception' 
           ? `${process.env.NEXT_PUBLIC_API_URL}/chat/visitor/history/${visitorId}`
           : null;
         
         if (url) {
           const res = await fetch(url)
           if (res.ok) {
             const data = await res.json()
             setMessages(data.map((m:any) => ({
               id: m.id,
               text: m.content,
               sender: m.senderId ? 'reception' : 'user',
               timestamp: new Date(m.createdAt)
             })))
           }
         }
       } catch (e) { console.error(e) }
    }
    fetchHistory()
  }, [visitorId, isOpen, mode])

  const endOfChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const startAISession = (lang: 'bn' | 'en') => {
    setChatLang(lang)
    setShowLangSelect(false)
    setMode('ai')
    setMessages([
      {
        id: '1',
        text: lang === 'bn' 
          ? 'আসসালামু আলাইকুম! আমি নূরজাহান হসপিটালের এআই অ্যাসিস্ট্যান্ট। আপনার স্বাস্থ্য বিষয়ক যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।' 
          : 'As-salamu alaykum! I am the AI Health Assistant of Nurjahan Hospital. Feel free to ask any health-related questions.',
        sender: 'ai',
        timestamp: new Date()
      }
    ])
  }



  const handleStartReception = () => {
    setMode('reception')
    setMessages([
      {
        id: '1',
        text: language === 'bn'
          ? 'নূরজাহান হসপিটাল রিসেপশনে আপনাকে স্বাগতম। আপনি এখন আমাদের প্রতিনিধির সাথে সরাসরি কথা বলতে পারেন।'
          : 'Welcome to Nurjahan Hospital Reception. You can now chat directly with our representative.',
        sender: 'reception',
        timestamp: new Date()
      }
    ])
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !visitorId) return

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    const currentInput = inputValue
    setInputValue('')

    if (mode === 'ai') {
      setIsTyping(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/ask?lang=${chatLang}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: currentInput })
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data && data.text) {
            setMessages(prev => [...prev, {
              id: `ai_${Date.now()}`,
              text: data.text,
              sender: 'ai',
              timestamp: new Date()
            }])
          }
        } else {
          setMessages(prev => [...prev, {
            id: `err_${Date.now()}`,
            text: chatLang === 'bn' ? 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।' : 'Sorry, I cannot reply right now.',
            sender: 'ai',
            timestamp: new Date()
          }])
        }
      } catch (error) { 
        console.error(error) 
      } finally { 
        setIsTyping(false) 
      }
    } else if (mode === 'reception') {
       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/visitor/send`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ visitorId, content: currentInput })
       })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[80vh] sm:max-h-[600px] flex flex-col shadow-2xl rounded-2xl border border-white/20 overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-zinc-950/90"
          >
            {/* Header */}
            <div className="p-6 bg-[#0a1b4d] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-inner">
                   <img src="/favicon (2).png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">
                    {showLangSelect && (language === 'bn' ? 'ভাষা নির্বাচন' : 'Select Language')}
                    {!showLangSelect && mode === 'menu' && (language === 'bn' ? 'হেল্প সেন্টার' : 'Help Center')}
                    {!showLangSelect && mode === 'ai' && (language === 'bn' ? 'এআই স্বাস্থ্য পরামর্শ' : 'AI Health Advice')}
                    {!showLangSelect && mode === 'reception' && (language === 'bn' ? 'রিসেপশন চ্যাট' : 'Reception Chat')}
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-medium italic">
                    {showLangSelect && (language === 'bn' ? 'আপনার পছন্দের ভাষা বেছে নিন' : 'Choose your preferred language')}
                    {!showLangSelect && mode === 'menu' && (language === 'bn' ? 'কিভাবে আপনাকে সাহায্য করতে পারি?' : 'How can we help you?')}
                    {!showLangSelect && mode !== 'menu' && (language === 'bn' ? 'অনলাইন' : 'Online')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false)
                  setMode('menu')
                  setShowLangSelect(false)
                }}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col overflow-hidden">
              {mode === 'menu' ? (
                <div className="p-6 space-y-4">
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    {language === 'bn' 
                      ? 'নূরজাহান হসপিটালে আপনাকে স্বাগতম। আমাদের সাথে যোগাযোগ করার মাধ্যমগুলো বেছে নিন:' 
                      : 'Welcome to Nurjahan Hospital. Choose a way to connect with us:'}
                  </p>
                  
                  <button 
                    onClick={handleStartReception}
                    className="w-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 flex items-center gap-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110 text-center">
                       <img src="/favicon (2).png" className="w-8 h-8 object-contain" alt="Logo" />
                    </div>
                    <div className="text-left flex-grow">
                      <h4 className="font-bold text-card-foreground">{language === 'bn' ? 'লাইভ চ্যাট (রিসেপশন)' : 'Live Chat (Reception)'}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{language === 'bn' ? 'সরাসরি প্রতিনিধির সাথে কথা বলুন' : 'Talk directly with a representative'}</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => startAISession('bn')}
                    className="w-full p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/50 hover:bg-emerald-500/5 flex items-center gap-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110 text-center">
                       <img src="/favicon (2).png" className="w-8 h-8 object-contain" alt="Logo" />
                    </div>
                    <div className="text-left flex-grow">
                      <h4 className="font-bold text-card-foreground">{language === 'bn' ? 'এআই ডাক্তার (পরামর্শ)' : 'AI Doctor (Advice)'}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{language === 'bn' ? 'স্বাস্থ্য বিষয়ক তাৎক্ষণিক পরামর্শ নিন' : 'Get instant health related advice'}</p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto p-4 custom-scrollbar min-h-0" ref={scrollRef}>
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden
                              ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white border border-slate-100 p-1'}
                            `}>
                              {msg.sender === 'user' ? <User size={14} /> : 
                               <img src="/favicon (2).png" className="w-full h-full object-contain" alt="Logo" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed
                              ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 
                                'bg-muted text-card-foreground rounded-tl-none'}
                            `}>
                              {msg.text}
                              <div className={`text-[10px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex gap-2 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                               <img src="/favicon (2).png" className="w-full h-full object-contain" alt="Logo" />
                            </div>
                            <div className="p-4 rounded-2xl bg-muted text-card-foreground rounded-tl-none flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Auto-scroll anchor */}
                      <div ref={endOfChatRef} className="h-1" />
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-border bg-card">
                    <form onSubmit={handleSendMessage} className="relative">
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={language === 'bn' ? 'আপনার বার্তা লিখুন...' : 'Type your message...'}
                        className="w-full h-12 pl-4 pr-12 rounded-xl bg-muted border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium"
                      />
                      <button 
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                    <button 
                      onClick={() => setMode('menu')}
                      className="mt-3 w-full text-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                    >
                      {language === 'bn' ? 'মেনু-তে ফিরে যান' : 'Back to Menu'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#0a1b4d] text-white shadow-2xl shadow-primary/40 flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={28} className="relative z-10" /> : <MessageSquare size={28} className="relative z-10" />}
      </motion.button>
    </div>
  )
}
