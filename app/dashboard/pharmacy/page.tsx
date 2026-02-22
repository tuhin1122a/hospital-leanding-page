'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { AlertCircle, Filter, Package, Pill, Plus, Search, ShoppingCart, TrendingUp } from 'lucide-react'

const medicine = [
  { id: 'MD-101', name: 'Paracetamol 500mg', category: 'General', stock: 1240, price: '$12.50', status: 'In Stock', expiry: 'Jan 2028' },
  { id: 'MD-102', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 42, price: '$45.00', status: 'Low Stock', expiry: 'Dec 2026' },
  { id: 'MD-103', name: 'Atorvastatin 20mg', category: 'Cardiology', stock: 850, price: '$82.99', status: 'In Stock', expiry: 'Mar 2027' },
  { id: 'MD-104', name: 'Metformin 850mg', category: 'Diabetic', stock: 0, price: '$22.45', status: 'Out of Stock', expiry: 'Expired' },
  { id: 'MD-105', name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 2100, price: '$8.50', status: 'In Stock', expiry: 'Jul 2028' },
  { id: 'MD-106', name: 'Omeprazole 20mg', category: 'Gastric', stock: 15, price: '$34.00', status: 'Low Stock', expiry: 'Nov 2026' },
]

export default function PharmacyPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Pharmacy Inventory</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Manage pharmaceutical stocks and procurement orders</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 px-8 rounded-2xl bg-white border-zinc-200 text-zinc-600 font-black shadow-sm">
             Purchase Orders
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-zinc-950 text-white font-black hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-950/20">
             <Plus size={20} className="mr-2" /> Add Inventory
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Items', value: '2,456', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
           { label: 'Out Of Stock', value: '12', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
           { label: 'Daily Sales', value: '$4,562', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Orders', value: '45', icon: ShoppingCart, color: 'text-purple-500', bg: 'bg-purple-500/10' },
         ].map((stat, i) => (
           <Card key={i} className="p-6 border-zinc-100 rounded-[2rem] shadow-sm flex items-center justify-between group overflow-hidden relative">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</p>
                 <h4 className="text-2xl font-black text-zinc-900 tracking-tight">{stat.value}</h4>
              </div>
              <div className={cn(stat.bg, stat.color, "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500")}>
                 <stat.icon size={24} />
              </div>
           </Card>
         ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-zinc-50">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
              <h3 className="text-2xl font-black text-zinc-900 tracking-tighter">Current Stock</h3>
              <div className="flex items-center gap-4 w-full lg:w-auto">
                 <div className="relative flex-grow">
                    <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Search items..." 
                      className="w-full lg:w-80 h-14 pl-16 pr-8 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-zinc-900"
                    />
                 </div>
                 <Button variant="outline" className="h-14 px-6 rounded-2xl border-zinc-200">
                    <Filter size={18} />
                 </Button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicine.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-[2rem] border border-zinc-100 hover:border-primary/20 hover:bg-primary/[0.01] transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Pill size={24} />
                     </div>
                     <Badge className={cn(
                       "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none",
                       item.status === 'In Stock' ? 'bg-emerald-500 text-white' : 
                       item.status === 'Low Stock' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                     )}>
                        {item.status}
                     </Badge>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <h4 className="text-lg font-black text-zinc-900">{item.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.category} • {item.id}</p>
                     </div>

                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">Stock</p>
                           <p className="text-xl font-black text-zinc-900 tracking-tight">{item.stock} Units</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">Price</p>
                           <p className="text-xl font-black text-primary tracking-tight">{item.price}</p>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-zinc-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">Expire: {item.expiry}</span>
                        <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Edit Details</button>
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
