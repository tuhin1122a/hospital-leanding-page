'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit3, Image as ImageIcon, Save, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

export default function LandingPageAdmin() {
  const { t } = useLanguage()
  const [heroItems, setHeroItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    bgImage: '',
    buttonText: 'Book Appointment',
    buttonLink: '/#booking',
    isActive: true
  })

  useEffect(() => {
    fetchHeroItems()
  }, [])

  const fetchHeroItems = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`)
      if (res.ok) {
        const data = await res.json()
        setHeroItems(data)
      }
    } catch (error) {
      console.error("Failed to fetch hero items", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')

    try {
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL}/hero/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/hero`
      
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success(editingId ? 'Hero updated!' : 'New hero added!')
        fetchHeroItems()
        setShowForm(false)
        setEditingId(null)
        setFormData({ title: '', subtitle: '', bgImage: '', buttonText: 'Book Appointment', buttonLink: '/#booking', isActive: true })
      } else {
        toast.error('Operation failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero item?')) return
    
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        toast.success('Deleted successfully')
        fetchHeroItems()
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')
    
    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('image', file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image?folder=hero`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload
      })
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...formData, bgImage: data.url })
        toast.success('Image uploaded to Cloudinary!')
      } else {
        toast.error('Upload failed')
      }
    } catch (error) {
      toast.error('Upload connection error')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Landing Page Management')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Customize your website hero section and visual identity')}</p>
        </div>
        <Button 
          onClick={() => {
            setShowForm(!showForm)
            if (showForm) {
                setEditingId(null)
                setFormData({ title: '', subtitle: '', bgImage: '', buttonText: 'Book Appointment', buttonLink: '/#booking', isActive: true })
            }
          }} 
          className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 transition-all gap-2"
        >
          {showForm ? <Trash2 size={20} /> : <Plus size={20} />}
          {showForm ? t('Cancel') : t('Add New Hero')}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-8 border-border rounded-2xl shadow-2xl shadow-zinc-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Main Title')}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Caring for Your Health"
                    className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Background Image')}</label>
                  <div className="flex gap-2">
                    <input 
                        type="text" 
                        required
                        value={formData.bgImage}
                        onChange={(e) => setFormData({...formData, bgImage: e.target.value})}
                        placeholder="https://..."
                        className="flex-grow h-14 px-6 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                    />
                    <div className="relative">
                        <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" disabled={isUploading} />
                        <Button type="button" variant="outline" className="h-14 w-14 rounded-2xl border-dashed border-2 flex items-center justify-center p-0" disabled={isUploading}>
                            {isUploading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" /> : <ImageIcon size={20} />}
                        </Button>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-2">Upload directly or paste an external URL</p>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Subtitle / Description')}</label>
                  <textarea 
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    placeholder="Tell your patients more about your hospital..."
                    className="w-full h-32 p-6 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/5 outline-none font-bold resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Button Text')}</label>
                  <input 
                    type="text" 
                    value={formData.buttonText}
                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                  />
                </div>
                <div className="space-y-2 flex items-center gap-4 pt-8">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-6 h-6 rounded-lg accent-primary"
                  />
                  <label htmlFor="isActive" className="text-lg font-black text-card-foreground tracking-tight">{t('Set as Active Hero')}</label>
                </div>
              </div>
              <Button type="submit" className="w-full h-16 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 transition-all gap-2 text-lg">
                <Save size={20} /> {editingId ? t('Update Hero') : t('Create Hero')}
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {heroItems.map((hero) => (
            <motion.div key={hero.id} layout>
              <Card className="overflow-hidden border-border rounded-2xl group relative shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="h-48 relative overflow-hidden bg-zinc-900">
                  <img src={hero.bgImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-x-6 bottom-6 flex justify-between items-end">
                    <div>
                      {hero.isActive && <Badge variant="default" className="bg-emerald-500 text-white border-none px-3 py-1 mb-2 rounded-full font-black text-[10px] tracking-widest flex items-center gap-1 w-fit"><CheckCircle2 size={12} /> ACTIVE</Badge>}
                      <h3 className="text-2xl font-black text-white leading-tight drop-shadow-lg">{hero.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-card space-y-4">
                  <p className="text-muted-foreground font-bold line-clamp-2">{hero.subtitle}</p>
                  <div className="flex items-center gap-2">
                    <Button 
                        variant="secondary" 
                        className="flex-grow h-12 rounded-xl font-bold gap-2"
                        onClick={() => {
                            setEditingId(hero.id)
                            setFormData({
                                title: hero.title,
                                subtitle: hero.subtitle || '',
                                bgImage: hero.bgImage || '',
                                buttonText: hero.buttonText || 'Book Appointment',
                                buttonLink: hero.buttonLink || '/#booking',
                                isActive: hero.isActive
                            })
                            setShowForm(true)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    >
                        <Edit3 size={16} /> Edit
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(hero.id)}
                    >
                        <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function Badge({ children, variant = "default", className = "" }: any) {
    return (
        <div className={`px-2 py-0.5 rounded text-xs font-bold ${className}`}>
            {children}
        </div>
    )
}
