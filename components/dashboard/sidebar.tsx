'use client'

import { cn } from '@/lib/utils'
import {
    Calendar,
    ClipboardList,
    CreditCard,
    Hotel,
    LayoutDashboard,
    LogOut,
    Menu,
    Pill,
    Settings,
    ShieldCheck,
    Stethoscope,
    UserRound,
    Users,
    MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const menuItems = [
  { title: 'Overview', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'STAFF', 'PHARMACIST'] },
  { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'STAFF', 'PHARMACIST'] },
  { title: 'Appointments', href: '/dashboard/appointments', icon: Calendar, roles: ['DOCTOR', 'RECEPTIONIST', 'STAFF'] },
  { title: 'Patients', href: '/dashboard/patients', icon: UserRound, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'STAFF'] },
  { title: 'Admissions', href: '/dashboard/admissions', icon: Hotel, roles: ['RECEPTIONIST'] },
  { title: 'Doctors', href: '/dashboard/doctors', icon: Stethoscope, roles: ['RECEPTIONIST', 'ADMIN'] },
  { title: 'Medical Records', href: '/dashboard/records', icon: ClipboardList, roles: ['DOCTOR', 'ADMIN'] },
  { title: 'Pharmacy', href: '/dashboard/pharmacy', icon: Pill, roles: ['PHARMACIST', 'ADMIN'] },
  { title: 'Billing', href: '/dashboard/billing', icon: CreditCard, roles: ['RECEPTIONIST'] },
  { title: 'Salaries', href: '/dashboard/salaries', icon: CreditCard, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'STAFF', 'PHARMACIST'] },
  { title: 'Staff', href: '/dashboard/staff', icon: Users, roles: ['ADMIN'] },
  { title: 'Department', href: '/dashboard/departments', icon: ClipboardList, roles: ['ADMIN'] },
  { title: 'Security', href: '/dashboard/security', icon: ShieldCheck, roles: ['ADMIN'] },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
]



export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [unreadMessages, setUnreadMessages] = useState<number>(0)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const res = await fetch('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setRole(data.role)
        }
      } catch (err) {
        console.error("Sidebar role fetch failed", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    const fetchUnreadMessages = async () => {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      if (!token) return
      try {
        const res = await fetch('http://localhost:5000/chat/unread-count', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const count = await res.text()
          setUnreadMessages(parseInt(count) || 0)
        }
      } catch (err) {}
    }

    fetchRole()
    fetchUnreadMessages()

    window.addEventListener('unreadMessageUpdate', fetchUnreadMessages);
    
    return () => {
      window.removeEventListener('unreadMessageUpdate', fetchUnreadMessages);
    }
  }, [])

  const filteredMenu = menuItems.filter(item => !role || item.roles.includes(role))

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold">NH</div>
            <span className="text-sidebar-foreground font-black text-xl tracking-tighter">Nurjahan</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-sidebar-accent hover:text-sidebar-primary transition-colors"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-grow px-4 space-y-1.5 mt-4 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-12 w-full bg-sidebar-accent/50 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredMenu.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-3 rounded-xl transition-all group",
                active ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn("transition-colors", active ? "text-background" : "group-hover:text-sidebar-primary")} />
                {!collapsed && <span className="text-sm font-bold">{t(item.title)}</span>}
              </div>
              
              {!collapsed && item.title === 'Messages' && unreadMessages > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] font-black text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                  {unreadMessages}
                </span>
              )}
              
              {collapsed && item.title === 'Messages' && unreadMessages > 0 && (
                <span className="absolute right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-card shadow-sm" />
              )}
            </Link>
          )
        })}
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-sidebar-border">
        <Link 
          href="/login"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-bold">{t('Logout')}</span>}
        </Link>
      </div>
    </div>
  )
}
