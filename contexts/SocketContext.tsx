'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  onlineUsers: Set<string>
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: new Set(),
})

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL
    if (!API) return

    // Get current user ID from profile fetch or storage
    const fetchAndConnect = async () => {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      if (!token) return

      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) return
        const profile = await res.json()
        
        const newSocket = io(API, {
          query: { userId: profile.id },
          reconnection: true,
        })

        newSocket.on('connect', () => {
          console.log('Socket connected')
        })

        newSocket.on('userStatus', (data: { userId: string, status: 'online' | 'offline' }) => {
          setOnlineUsers(prev => {
            const newSet = new Set(prev)
            if (data.status === 'online') newSet.add(data.userId)
            else newSet.delete(data.userId)
            return newSet
          })
        })

        setSocket(newSocket)

        return () => {
          newSocket.disconnect()
        }
      } catch (err) {
        console.error('Socket connection error:', err)
      }
    }

    fetchAndConnect()
  }, [])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
