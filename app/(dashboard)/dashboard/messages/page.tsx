'use client'

import React, { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ContactList from '@/components/dashboard/messages/ContactList'
import ChatWindow from '@/components/dashboard/messages/ChatWindow'

const API_BASE = 'http://localhost:5000'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function FullscreenMessenger() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [activeContact, setActiveContact] = useState<any>(null); const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState(''); const socketRef = useRef<Socket | null>(null)
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
    if (!currentUser?.id) return
    socketRef.current = io(API_BASE, { query: { userId: currentUser.id } })
    socketRef.current.on('newMessage', (msg) => {
      if (activeContactRef.current?.id === msg.senderId || activeContactRef.current?.id === msg.receiverId) {
        queryClient.setQueryData(['chat-messages', activeContactRef.current?.id], (old: any) => [...(old || []), msg])
        if (activeContactRef.current?.id === msg.senderId) fetch(`${API_BASE}/chat/mark-read/${activeContactRef.current.id}`, { method: 'POST', headers: authHeader() })
      }
      refetchContacts()
    })
    return () => { socketRef.current?.disconnect() }
  }, [currentUser?.id])

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
      <ContactList contacts={contacts.filter((c:any) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))} activeContact={activeContact} onSelect={(c) => setActiveContact(c)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ChatWindow activeContact={activeContact} currentUser={currentUser} messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSend} onClose={() => setActiveContact(null)} chatEndRef={chatEndRef} />
    </div>
  )
}
