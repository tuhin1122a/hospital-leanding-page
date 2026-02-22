'use client'

import RecentAppointments from '@/components/dashboard/recent-appointments'
import StatCards from '@/components/dashboard/stat-cards'
import { motion } from 'framer-motion'
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

const data = [
  { name: 'Jan', patients: 400, revenue: 2400 },
  { name: 'Feb', patients: 300, revenue: 1398 },
  { name: 'Mar', patients: 200, revenue: 9800 },
  { name: 'Apr', patients: 278, revenue: 3908 },
  { name: 'May', patients: 189, revenue: 4800 },
  { name: 'Jun', patients: 239, revenue: 3800 },
  { name: 'Jul', patients: 349, revenue: 4300 },
]

const barData = [
  { name: 'Cards', value: 400, color: '#0ea5e9' },
  { name: 'Neurology', value: 300, color: '#6366f1' },
  { name: 'Ortho', value: 200, color: '#10b981' },
  { name: 'Oncology', value: 278, color: '#f59e0b' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">System Overview</h1>
          <p className="text-zinc-500 font-medium text-lg">Welcome back! Here's what's happening today.</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-xl border-4 border-zinc-50 bg-zinc-200 overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-xl border-4 border-zinc-50 bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-sm">+12</div>
          </div>
          <span className="text-sm font-bold text-zinc-400 ml-2">Active Staff</span>
        </div>
      </div>

      {/* Stats */}
      <StatCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm p-8 flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-black text-zinc-900 tracking-tight">Patient Statistics</h3>
              <p className="text-sm text-zinc-500 font-medium">Historical data of patient inflow</p>
            </div>
            <select className="bg-zinc-50 border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest outline-none">
              <option>Last 7 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0ea5e9" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorPv)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Bar Chart */}
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm p-8 flex flex-col">
          <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-2">Department Load</h3>
          <p className="text-sm text-zinc-500 font-medium mb-10 text-balance">Workload distribution across major units</p>
          
          <div className="h-64 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                  ))}
                </Bar>
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 space-y-4">
            {barData.map((dept, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-sm font-bold text-zinc-600">{dept.name}</span>
                </div>
                <span className="text-sm font-black text-zinc-900">{((dept.value / 1178) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <RecentAppointments />
    </div>
  )
}
