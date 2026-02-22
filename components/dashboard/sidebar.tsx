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
    Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarItem {
  title: string
  href: string
  icon: any
  roles: string[]
}

const menuItems: SidebarItem[] = [
  { title: 'Overview', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'receptionist'] },
  { title: 'Appointments', href: '/dashboard/appointments', icon: Calendar, roles: ['admin', 'doctor', 'receptionist'] },
  { title: 'Patients', href: '/dashboard/patients', icon: UserRound, roles: ['admin', 'doctor', 'receptionist'] },
  { title: 'Doctors', href: '/dashboard/doctors', icon: Stethoscope, roles: ['admin', 'receptionist'] },
  { title: 'Medical Records', href: '/dashboard/records', icon: ClipboardList, roles: ['admin', 'doctor'] },
  { title: 'Pharmacy', href: '/dashboard/pharmacy', icon: Pill, roles: ['admin', 'receptionist'] },
  { title: 'Billing', href: '/dashboard/billing', icon: CreditCard, roles: ['admin', 'receptionist'] },
  { title: 'Staff', href: '/dashboard/staff', icon: Users, roles: ['admin'] },
  { title: 'Department', href: '/dashboard/departments', icon: Hotel, roles: ['admin'] },
  { title: 'Security', href: '/dashboard/security', icon: ShieldCheck, roles: ['admin'] },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['admin', 'doctor', 'receptionist'] },
]

export default function Sidebar({ currentRole = 'admin' }: { currentRole?: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole))

  return (
    <div className={cn(
      "flex flex-col h-screen bg-zinc-950 text-zinc-400 border-r border-zinc-800 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">CP</div>
            <span className="text-white font-black text-xl tracking-tighter">CarePulse</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-zinc-900 hover:text-white transition-colors"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-grow px-4 space-y-1.5 mt-4 overflow-y-auto">
        {filteredItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                active ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-zinc-900 hover:text-white"
              )}
            >
              <Icon size={20} className={cn("transition-colors", active ? "text-white" : "group-hover:text-primary")} />
              {!collapsed && <span className="text-sm font-bold">{item.title}</span>}
            </Link>
          )
        })}
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-zinc-800">
        <Link 
          href="/"
          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all group"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-bold">Logout</span>}
        </Link>
      </div>
    </div>
  )
}
