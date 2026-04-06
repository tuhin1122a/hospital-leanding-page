'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSocket } from '@/contexts/SocketContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ContactList from '@/components/dashboard/messages/ContactList'
import ChatWindow from '@/components/dashboard/messages/ChatWindow'

const API_BASE = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function FullscreenMessenger() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const { socket, onlineUsers } = useSocket()
  const [activeContact, setActiveContact] = useState<any>(null); const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null); const activeContactRef = useRef<any>(null)

  useEffect(() => { activeContactRef.current = activeContact }, [activeContact])

  const { data: currentUser } = useQuery({ queryKey: ['me'], queryFn: () => fetch(`${API_BASE}/auth/me`, { headers: authHeader() }).then(r => r.json()) })
  const { data: contacts = [], refetch: refetchContacts } = useQuery({ 
    queryKey: ['contacts'], 
    queryFn: async () => {
      const [u, r] = await Promise.all([fetch(`${API_BASE}/chat/contacts`, { headers: authHeader() }).then(r => r.json()), fetch(`${API_BASE}/chat/recent`, { headers: authHeader() }).then(r => r.json())])
      const recentIds = new Set(r.map((x:any) => x.id)); return [...r, ...u.filter((x:any) => !recentIds.has(x.id))]
    }
  })
  const { data: messages = [], refetch: refetchMessages } = useQuery({ queryKey: ['chat-messages', activeContact?.id], queryFn: () => activeContact ? fetch(`${API_BASE}/chat/messages/${activeContact.id}`, { headers: authHeader() }).then(r => r.json()) : Promise.resolve([]), enabled: !!activeContact })

  useEffect(() => {
    if (!socket || !currentUser?.id) return
    
    const handleNewMessage = (msg: any) => {
      if (activeContactRef.current?.id === msg.senderId || activeContactRef.current?.id === msg.receiverId) {
        queryClient.setQueryData(['chat-messages', activeContactRef.current?.id], (old: any) => {
           // Prevent duplicates if temp message exists
           const exists = old?.find((m:any) => m.id === msg.id || (m.content === msg.content && Math.abs(new Date(m.createdAt).getTime() - new Date(msg.createdAt).getTime()) < 1000));
           if (exists) return old;
           return [...(old || []), msg]
        })
        if (activeContactRef.current?.id === msg.senderId) fetch(`${API_BASE}/chat/mark-read/${activeContactRef.current.id}`, { method: 'POST', headers: authHeader() })
      }
      refetchContacts()
    }

    socket.on('newMessage', handleNewMessage)
    return () => { socket.off('newMessage', handleNewMessage) }
  }, [socket, currentUser?.id])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newMessage.trim() || !activeContact) return
    const temp = { senderId: currentUser.id, content: newMessage, createdAt: new Date().toISOString(), read: false }
    queryClient.setQueryData(['chat-messages', activeContact.id], (old: any) => [...(old || []), temp])
    setNewMessage(''); await fetch(`${API_BASE}/chat/send`, { method: 'POST', headers: authHeader(), body: JSON.stringify({ to: activeContact.id, content: temp.content }) })
    refetchContacts()
  }

  return (
    <div className="h-[calc(100vh-8rem)] w-full flex bg-card rounded-2xl border border-border shadow-sm overflow-hidden p-2 gap-2 relative">
      <ContactList 
        contacts={contacts.map((c:any) => ({...c, isOnline: onlineUsers.has(c.id)})).filter((c:any) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))} 
        activeContact={activeContact} 
        onSelect={(c) => setActiveContact(c)} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <ChatWindow activeContact={activeContact} currentUser={currentUser} messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSend} onClose={() => setActiveContact(null)} chatEndRef={chatEndRef} />
    </div>
  )
}
