'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, Search, User } from 'lucide-react'

export default function Topbar({ role, setRole }: { role: string, setRole: (role: string) => void }) {
  return (
    <div className="h-20 bg-white border-b border-zinc-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-zinc-50 px-4 py-2.5 rounded-2xl w-96 border border-zinc-100 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
        <Search size={18} className="text-zinc-400" />
        <input 
          type="text" 
          placeholder="Search patient, record, appointment..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-400 font-medium"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher for Demo */}
        <div className="flex items-center gap-2 pr-6 border-r border-zinc-200">
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Current Role:</span>
           <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-tight outline-none">
              {role}
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-100 shadow-xl">
              <DropdownMenuLabel>Select Demo Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRole('admin')} className="font-bold cursor-pointer">Administrator</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('doctor')} className="font-bold cursor-pointer">Doctor View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('receptionist')} className="font-bold cursor-pointer">Receptionist View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className="relative p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-all group">
          <Bell size={20} className="text-zinc-600 group-hover:text-primary" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none group hover:bg-zinc-50 p-1.5 rounded-2xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-primary group-hover:text-white transition-all">
              <User size={20} />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-black text-zinc-900 leading-none">John Doe</p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Super Admin</p>
            </div>
            <ChevronDown size={14} className="text-zinc-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-zinc-100 shadow-xl">
             <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="font-bold p-3">View Profile</DropdownMenuItem>
             <DropdownMenuItem className="font-bold p-3">Account Security</DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="font-bold p-3 text-red-500">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
