'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { io, Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, LogOut, Search, User, Check, X, Clock, Circle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

export default function Topbar() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { t } = useLanguage()
  const router = useRouter()

  const fetchProfile = async () => {
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken
    if (!token) return
    try {
      const res = await fetch('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUserProfile(data)
      }
    } catch (err) {
      console.error("Failed to fetch profile", err)
    }
  }

  const fetchNotifications = async () => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    if (!token) return
    try {
      const res = await fetch('http://localhost:5000/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setNotifications(data)
        setUnreadCount(data.filter((n: any) => !n.read).length)
      }
    } catch (err) {}
  }

  const markAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    try {
      await fetch(`http://localhost:5000/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchNotifications()
    } catch (err) {}
  }

  const getNotificationLink = (n: any) => {
    const title = n.title?.toLowerCase() || ''
    const msg = n.message?.toLowerCase() || ''
    const content = title + ' ' + msg

    if (content.includes('payment') || content.includes('paid') || content.includes('bill') || content.includes('invoice')) return '/dashboard/billing'
    if (content.includes('admit') || content.includes('admission') || content.includes('release') || content.includes('discharge')) return '/dashboard/admissions'
    if (content.includes('appointment') || content.includes('booking')) return '/dashboard/appointments'
    if (content.includes('patient registered')) return '/dashboard/patients'
    
    return '/dashboard/notifications'
  }

  const handleNotificationClick = async (n: any) => {
    if (!n.read) {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      try {
        await fetch(`http://localhost:5000/notifications/${n.id}/read`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchNotifications()
      } catch (err) {}
    }
    const link = getNotificationLink(n)
    router.push(link)
  }

  const handleLogout = async () => {
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken
    try {
      if (token) {
        await fetch('http://localhost:5000/auth/logout', {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
    } catch (err) {
      console.error('Logout request failed', err)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchNotifications()
    
    // Polling as fallback
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const lsToken = localStorage.getItem('accessToken')
    const ssToken = sessionStorage.getItem('accessToken')
    const token = lsToken || ssToken

    // Parse jwt payload to get user id if possible, not strictly needed for UI socket connection since we just listen
    // Setup socket connection for real-time notifications
    let parsedUser: any = null;
    if (token) {
       try { parsedUser = JSON.parse(atob(token.split('.')[1])); } catch {}
    }

    const socket = io('http://localhost:5000', {
      query: { userId: parsedUser?.sub || '' }
    });

    const playPopSound = () => {
      try {
        const audio = new window.Audio("data:audio/wav;base64,UklGRqIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYYAAACAAIAAgACAAIAAgAAA/wAA//8AAAAAAAA=");
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio disabled', e));
      } catch (e) {}
    }

    socket.on('newMessage', (msg: any) => {
      playPopSound();
      window.dispatchEvent(new CustomEvent('unreadMessageUpdate'));
      // We don't toast every message here, just rely on sound and sidebar badge update
    });

    socket.on('newNotification', (notification: any) => {
      setNotifications(prev => [notification, ...prev].slice(0, 20));
      setUnreadCount(prev => prev + 1);
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-card shadow-xl rounded-2xl pointer-events-auto flex flex-col p-4 border border-border/50`}>
           <p className="font-black text-sm text-primary mb-1">{notification.title}</p>
           <p className="text-xs font-medium text-muted-foreground">{notification.message}</p>
        </div>
      ), { duration: 4000, position: 'top-right' });
    });

    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {
    const handleProfileUpdated = () => fetchProfile()
    window.addEventListener('profileUpdated', handleProfileUpdated)
    return () => window.removeEventListener('profileUpdated', handleProfileUpdated)
  }, [])

  return (
    <div className="h-20 bg-card border-b border-border px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-4 bg-muted px-4 py-2.5 rounded-2xl w-96 border border-border transition-all focus-within:bg-card focus-within:ring-2 focus-within:ring-primary/10">
        <Search size={18} className="text-muted-foreground" />
        <input
          type="text"
          placeholder={t("Search patient, record, appointment...")}
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground font-medium text-card-foreground"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell (Only for ADMIN) */}
        {userProfile?.role === 'ADMIN' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2.5 rounded-xl bg-muted hover:bg-border transition-all group outline-none">
                <Bell size={20} className="text-muted-foreground group-hover:text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-card text-[9px] font-black text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl border-border shadow-2xl p-0 overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest">{t('Notifications')}</h3>
                <Badge variant="outline" className="text-[10px] rounded-full px-2">{unreadCount} {t('New')}</Badge>
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                     <Bell size={32} className="mx-auto mb-2 opacity-20" />
                     <p className="text-xs font-bold">{t('No notifications yet')}</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n)}
                      className={cn(
                        "p-4 border-b border-border/50 hover:bg-muted/30 transition-all cursor-pointer relative group",
                        !n.read && "bg-primary/5"
                      )}
                    >
                      <div className="flex gap-3">
                         <div className={cn(
                           "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                           n.type === 'SUCCESS' ? 'bg-emerald-50 text-emerald-500' :
                           n.type === 'WARNING' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                         )}>
                            {n.type === 'SUCCESS' ? <Check size={18} /> : 
                             n.type === 'WARNING' ? <X size={18} /> : <Clock size={18} />}
                         </div>
                         <div className="flex-grow">
                            <p className={cn("text-sm font-black mb-0.5", !n.read ? "text-primary" : "text-card-foreground")}>
                              {n.title}
                            </p>
                            <p className="text-xs font-medium text-muted-foreground line-clamp-2 leading-relaxed">
                              {n.message}
                            </p>
                            <p className="text-[10px] font-bold text-muted-foreground/60 mt-2 flex items-center gap-1">
                              <Clock size={10} /> {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                         </div>
                         {!n.read && (
                           <button 
                             onClick={(e) => markAsRead(n.id, e)}
                             className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-emerald-500 text-white transition-all self-start shadow-lg shadow-emerald-500/20"
                           >
                              <Check size={12} />
                           </button>
                         )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 bg-muted/30 border-t border-border text-center">
                 <a href="/dashboard/notifications" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all block w-full">
                   {t('View All Activities')}
                 </a>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none group hover:bg-muted p-1.5 rounded-2xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all overflow-hidden relative">
              {userProfile?.profilePic ? (
                <img src={userProfile.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-black text-card-foreground leading-none">
                {userProfile?.name || 'Admin'}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                {t(userProfile?.role || 'Super Admin')}
              </p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-xl border-border shadow-xl">
            <DropdownMenuLabel>{t('Account Settings')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="font-bold p-3 cursor-pointer">
              <a href="/dashboard/profile">{t('View Profile')}</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="font-bold p-3 cursor-pointer">
              <a href="/dashboard/account-security">{t('Account Security')}</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="font-bold p-3 text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 flex items-center gap-2"
            >
              <LogOut size={14} />
              {t('Sign Out')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
