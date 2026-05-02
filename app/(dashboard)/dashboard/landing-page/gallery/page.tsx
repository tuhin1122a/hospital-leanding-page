'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, Image as ImageIcon, Save, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

export default function GalleryManagement() {
  const { t } = useLanguage()
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    category: 'Facilities',
    isActive: true
  })

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`)
      if (res.ok) {
        const data = await res.json()
        setGalleryItems(data)
      }
    } catch (error) {
      console.error("Failed to fetch gallery items", error)
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
        ? `${process.env.NEXT_PUBLIC_API_URL}/gallery/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/gallery`
      
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
        toast.success(editingId ? 'Image updated!' : 'New image added!')
        fetchGalleryItems()
        setShowForm(false)
        setEditingId(null)
        setFormData({ src: '', alt: '', category: 'Facilities', isActive: true })
      } else {
        toast.error('Operation failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        toast.success('Deleted successfully')
        fetchGalleryItems()
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const getCookie = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
    const token = getCookie('accessToken')
    
    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('image', file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image?folder=gallery`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload
      })
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...formData, src: data.url })
        toast.success('Image uploaded!')
      } else {
        toast.error('Upload failed')
      }
    } catch (error) {
      toast.error('Upload connection error')
    } finally {
      setIsUploading(false)
    }
  }

  const categories = ['Infrastructure', 'Facilities', 'Services', 'Equipment', 'Team']

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Gallery Management')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage the photos displayed on your landing page gallery')}</p>
        </div>
        <Button 
          onClick={() => {
            setShowForm(!showForm)
            if (showForm) {
                setEditingId(null)
                setFormData({ src: '', alt: '', category: 'Facilities', isActive: true })
            }
          }} 
          className="h-14 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 transition-all gap-2"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? t('Cancel') : t('Add New Image')}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-8 border-border rounded-2xl shadow-2xl shadow-zinc-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Image Title / Alt Text')}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                    placeholder="e.g. Modern ICU Room"
                    className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Category')}</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{t('Image Source')}</label>
                  <div className="flex gap-2">
                    <input 
                        type="text" 
                        required
                        value={formData.src}
                        onChange={(e) => setFormData({...formData, src: e.target.value})}
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
                </div>
                <div className="space-y-2 flex items-center gap-4 pt-4">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-6 h-6 rounded-lg accent-primary"
                  />
                  <label htmlFor="isActive" className="text-lg font-black text-card-foreground tracking-tight">{t('Display in Gallery')}</label>
                </div>
              </div>
              <Button type="submit" className="w-full h-16 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 transition-all gap-2 text-lg">
                <Save size={20} /> {editingId ? t('Update Image') : t('Add to Gallery')}
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div key={item.id} layout>
              <Card className="overflow-hidden border-border rounded-2xl group relative shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900">
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    {item.isActive ? (
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full font-black text-[10px] tracking-widest flex items-center gap-1 shadow-lg"><CheckCircle2 size={12} /> ACTIVE</div>
                    ) : (
                        <div className="bg-zinc-500 text-white px-3 py-1 rounded-full font-black text-[10px] tracking-widest flex items-center gap-1 shadow-lg">INACTIVE</div>
                    )}
                  </div>
                </div>
                <div className="p-5 bg-card space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-card-foreground leading-tight text-lg line-clamp-1">{item.alt || 'No Title'}</h3>
                    <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-md">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                        variant="secondary" 
                        className="flex-grow h-10 rounded-xl font-bold gap-2 text-xs"
                        onClick={() => {
                            setEditingId(item.id)
                            setFormData({
                                src: item.src,
                                alt: item.alt || '',
                                category: item.category || 'Facilities',
                                isActive: item.isActive
                            })
                            setShowForm(true)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    >
                        <Edit3 size={14} /> Edit
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-xl text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(item.id)}
                    >
                        <Trash2 size={16} />
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
