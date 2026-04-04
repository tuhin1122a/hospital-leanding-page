'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, Filter, MoreVertical, Phone, Plus, Search, Mail, Lock, User, X, Trash2, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function StaffPage() {
  const { t } = useLanguage()
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'DOCTOR',
    permissions: ['READ']
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/users`, { headers: authHeader() })
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        toast.error('Failed to fetch staff members')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error('Please fill all fields')
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`${API}/users/create`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        toast.success(`${formData.role} created successfully!`)
        setShowModal(false)
        setFormData({ name: '', email: '', password: '', role: 'DOCTOR', permissions: ['READ'] })
        fetchUsers()
      } else {
        const data = await res.json()
        toast.error(data.message || 'Failed to create user')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return
    
    try {
      const res = await fetch(`${API}/users/${id}`, {
        method: 'DELETE',
        headers: authHeader()
      })
      if (res.ok) {
        toast.success('User deleted')
        fetchUsers()
      } else {
        toast.error('Failed to delete user')
      }
    } catch (err) {
      toast.error('Network error')
    }
  }

  const handleUpdatePermissions = async (id: string, current: string[], perm: string) => {
    const updated = current.includes(perm) 
      ? current.filter(p => p !== perm) 
      : [...current, perm]
    
    // Ensure READ is always there if they have any other perm
    if (updated.length > 0 && !updated.includes('READ')) updated.push('READ')
    
    try {
      const res = await fetch(`${API}/users/${id}/permissions`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ permissions: updated })
      })
      if (res.ok) {
        toast.success('Permissions updated')
        fetchUsers()
      }
    } catch (err) {
      toast.error('Failed to update')
    }
  }

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Medical & Support Staff')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage personnel, shift rotations, and department assignments')}</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> {t('Add Staff Member')}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-grow w-full">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
           <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search by name, email, or role...")} 
            className="w-full h-16 pl-16 pr-8 rounded-3xl bg-card border border-border shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-card-foreground"
           />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-border font-black text-muted-foreground">
            <Filter size={18} className="mr-2 text-primary" /> {t('Filter')}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-64 rounded-[2.5rem] bg-muted animate-pulse" />)}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed border-border">
          <User size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-xl font-bold text-muted-foreground">{t('No staff members found')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredUsers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-0 border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative group">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      {member.profilePic ? (
                        <img src={member.profilePic} alt={member.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-card shadow-lg" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-card shadow-lg">
                          <User size={30} />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card bg-emerald-500" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="bg-muted border-border text-primary font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                        {member.role}
                      </Badge>
                      <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">ID: {member.id.slice(-6)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-black text-card-foreground tracking-tight leading-none">{member.name}</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                        <Mail size={14} className="text-primary shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-4 py-2 border-t border-border/50 mt-2">
                        {['READ', 'EDIT', 'DELETE'].map(p => (
                          <button
                            key={p}
                            onClick={() => handleUpdatePermissions(member.id, member.permissions || [], p)}
                            className={`flex flex-col items-center gap-1 transition-all ${
                              (member.permissions || []).includes(p) ? 'text-primary' : 'text-muted-foreground/30 hover:text-muted-foreground/60'
                            }`}
                          >
                            <span className="text-[9px] font-black">{p}</span>
                            <div className={`w-6 h-1 rounded-full ${
                              (member.permissions || []).includes(p) ? 'bg-primary shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'bg-muted'
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-2xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Joined')}</p>
                      <p className="text-xs font-black text-card-foreground">{new Date(member.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-center">
                      <button 
                        onClick={() => handleDeleteUser(member.id, member.name)}
                        className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 font-black text-xs uppercase tracking-widest"
                      >
                        <Trash2 size={14} /> {t('Delete')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 flex items-center gap-3 border-t border-border/50 bg-muted/30">
                  <button className="flex-grow h-12 rounded-xl bg-card border border-border hover:bg-muted flex items-center justify-center text-muted-foreground transition-all font-bold text-sm gap-2">
                     <Phone size={16} /> {t('Call')}
                  </button>
                  <button className="flex-grow h-12 rounded-xl bg-card border border-border hover:bg-muted flex items-center justify-center text-muted-foreground transition-all font-bold text-sm gap-2">
                     <Calendar size={16} /> {t('Shifts')}
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-card-foreground tracking-tighter">{t('Add New Staff')}</h2>
                    <p className="text-muted-foreground font-medium">{t('Create a professional medical account')}</p>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-3 rounded-2xl bg-muted hover:bg-border transition-all text-muted-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Full Name')}</label>
                    <div className="relative">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Dr. Jane Smith"
                        className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Email Address')}</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="jane.smith@nurjahan.com"
                        className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Initial Password')}</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                      <input 
                        type="password" 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="••••••••"
                        className="w-full h-14 pl-14 pr-6 rounded-2xl bg-muted border border-border focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-card-foreground font-mono"
                      />
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Assign Role')}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['DOCTOR', 'RECEPTIONIST', 'ADMIN', 'PHARMACIST', 'STAFF'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setFormData({...formData, role})}
                          className={`h-12 rounded-2xl border-2 font-black text-[10px] transition-all tracking-tight ${
                            formData.role === role 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-border bg-muted/50 text-muted-foreground hover:border-border/80'
                          }`}
                        >
                          {t(role)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Permissions Selection */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t('Select Permissions')}</label>
                    <div className="flex items-center gap-6">
                      {['READ', 'EDIT', 'DELETE'].map((p) => (
                        <label key={p} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(p)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.permissions, p]
                                : formData.permissions.filter(x => x !== p)
                              setFormData({...formData, permissions: updated})
                            }}
                            className="w-5 h-5 rounded-lg border-2 border-primary/20 accent-primary cursor-pointer transition-all"
                          />
                          <span className="text-sm font-black text-muted-foreground group-hover:text-foreground transition-colors">{t(p)}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-[10px] font-medium text-muted-foreground italic">
                      * READ is the default view-only access. EDIT allows modifications, and DELETE allows permanent removal.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-lg shadow-xl shadow-primary/20 transition-all mt-4"
                  >
                    {isSubmitting ? t('Creating Account...') : t('Create Staff Account')}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
