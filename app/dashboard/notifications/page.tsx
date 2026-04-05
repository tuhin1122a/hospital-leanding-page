'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, CheckCircle, Trash2, CreditCard, UserPlus, 
  UserMinus, Calendar, Info, Clock, Search, Filter, 
  MoreVertical, Check, Trash, Activity
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function NotificationsPage() {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('ALL') // ALL, UNREAD, PAYMENT, APPOINTMENT, SYSTEM, PATIENT
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const fetchNotifications = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    if (!token) {
      setIsLoading(false)
      return
    }
    try {
      const res = await fetch('http://localhost:5000/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setNotifications(data)
      } else {
        toast.error(t('Failed to load notifications'))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    try {
      await fetch(`http://localhost:5000/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    } catch (err) {}
  }

  const getNotificationLink = (n: any) => {
    const title = n.title?.toLowerCase() || '';
    const msg = n.message?.toLowerCase() || '';
    const content = title + ' ' + msg;

    if (content.includes('payment') || content.includes('paid') || content.includes('bill') || content.includes('invoice')) return '/dashboard/billing';
    if (content.includes('admit') || content.includes('admission') || content.includes('release') || content.includes('discharge')) return '/dashboard/admissions';
    if (content.includes('appointment') || content.includes('booking')) return '/dashboard/appointments';
    if (content.includes('patient registered')) return '/dashboard/patients';
    
    return '/dashboard/notifications';
  }

  const handleNotificationClick = async (n: any) => {
    if (!n.read && n.id.length > 2) { 
      // check if it's not a dummy mock data
      await markAsRead(n.id);
    }
    const link = getNotificationLink(n);
    router.push(link);
  }

  const markAllAsRead = async () => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    const unread = notifications.filter(n => !n.read)
    
    // Simulate updating all locally for immediate UI response
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success(t('All notifications marked as read'))
    
    for (const notification of unread) {
       try {
         await fetch(`http://localhost:5000/notifications/${notification.id}/read`, {
           method: 'PATCH',
           headers: { Authorization: `Bearer ${token}` }
         })
       } catch (e) {}
    }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  // Derive icon and colors based on notification content/title/type
  const getNotificationStyles = (n: any) => {
    const title = n.title?.toLowerCase() || ''
    const msg = n.message?.toLowerCase() || ''
    const content = title + ' ' + msg

    if (content.includes('payment') || content.includes('paid') || content.includes('bill')) {
      return { icon: <CreditCard size={20} />, bg: 'bg-emerald-500/10 text-emerald-500', border: 'border-emerald-500/20' }
    }
    if (content.includes('admit') || content.includes('admission')) {
      return { icon: <UserPlus size={20} />, bg: 'bg-blue-500/10 text-blue-500', border: 'border-blue-500/20' }
    }
    if (content.includes('release') || content.includes('discharge')) {
      return { icon: <UserMinus size={20} />, bg: 'bg-indigo-500/10 text-indigo-500', border: 'border-indigo-500/20' }
    }
    if (content.includes('appointment') || content.includes('booking')) {
      return { icon: <Calendar size={20} />, bg: 'bg-purple-500/10 text-purple-500', border: 'border-purple-500/20' }
    }
    if (content.includes('delete') || content.includes('remove')) {
      return { icon: <Trash2 size={20} />, bg: 'bg-red-500/10 text-red-500', border: 'border-red-500/20' }
    }
    if (content.includes('add') || content.includes('create')) {
      return { icon: <CheckCircle size={20} />, bg: 'bg-teal-500/10 text-teal-500', border: 'border-teal-500/20' }
    }
    
    // Fallbacks based on backend type
    if (n.type === 'SUCCESS') return { icon: <CheckCircle size={20} />, bg: 'bg-emerald-500/10 text-emerald-500', border: 'border-emerald-500/20' }
    if (n.type === 'WARNING') return { icon: <Info size={20} />, bg: 'bg-amber-500/10 text-amber-500', border: 'border-amber-500/20' }
    
    return { icon: <Activity size={20} />, bg: 'bg-primary/10 text-primary', border: 'border-primary/20' }
  }

  const filteredNotifications = notifications.filter(n => {
    // Search filter
    const matchesSearch = n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Category filter
    const title = n.title?.toLowerCase() || ''
    const msg = n.message?.toLowerCase() || ''
    const content = title + ' ' + msg

    if (filter === 'UNREAD') return !n.read;
    if (filter === 'PAYMENT') return content.includes('payment') || content.includes('paid') || content.includes('bill');
    if (filter === 'APPOINTMENT') return content.includes('appointment') || content.includes('booking');
    if (filter === 'SYSTEM') return content.includes('add') || content.includes('delete') || content.includes('remove') || content.includes('create');
    if (filter === 'PATIENT') return content.includes('admit') || content.includes('release') || content.includes('discharge');

    return true; // ALL
  })

  // Dummy data if empty, for preview presentation just to show what it looks like before API is hooked up
  const mockData = [
    { id: '1', title: 'New Patient Admitted', message: 'John Doe was admitted to Cardiology Wing, Bed 402.', createdAt: new Date().toISOString(), read: false, type: 'INFO' },
    { id: '2', title: 'Payment Received', message: 'Payment of $450 received from Sarah Smith for consultation.', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false, type: 'SUCCESS' },
    { id: '3', title: 'Doctor Appointment Added', message: 'Dr. Emily Chen has a new appointment scheduled for tomorrow 10:00 AM.', createdAt: new Date(Date.now() - 7200000).toISOString(), read: true, type: 'INFO' },
    { id: '4', title: 'Record Deleted', message: 'Admin deleted an outdated medical record #99281.', createdAt: new Date(Date.now() - 86400000).toISOString(), read: true, type: 'WARNING' },
    { id: '5', title: 'Patient Released', message: 'Michael Johnson was discharged from Orthopedics.', createdAt: new Date(Date.now() - 172800000).toISOString(), read: true, type: 'SUCCESS' },
  ];

  // Merge real data with dummy data if needed, or just use real if exists
  const displayNotifications = notifications.length > 0 ? filteredNotifications : filteredNotifications.length === 0 && !isLoading ? mockData.filter(n => {
      // Allow mock data to be filtered too for visual testing
      if (filter === 'UNREAD') return !n.read;
      const content = n.title.toLowerCase() + " " + n.message.toLowerCase();
      if (filter === 'PAYMENT') return content.includes('payment');
      if (filter === 'APPOINTMENT') return content.includes('appointment');
      if (filter === 'SYSTEM') return content.includes('add') || content.includes('delete');
      if (filter === 'PATIENT') return content.includes('admit') || content.includes('release');
      return true;
  }) : [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-32">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 md:p-8 rounded-[2rem] border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-inner">
            <Bell size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-card-foreground tracking-tight">
              {t("System Activity Center")}
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {t("Monitor all clinical and administrative events in real-time.")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button 
            onClick={fetchNotifications}
            className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all font-bold group border border-transparent shadow-sm"
            title={t("Refresh")}
          >
            <RefreshCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500" />
          </button>
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all active:translate-y-0 border border-primary/20"
          >
            <Check size={16} />
            {t('Mark All Read')}
          </button>
        </div>
      </div>

      {/* Controllers Area */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full lg:w-96 flex-shrink-0 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder={t("Search logs, patients, events...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium placeholder:text-muted-foreground/60 transition-all shadow-sm"
          />
        </div>

        {/* Filters Carousel */}
        <div className="flex-1 overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'ALL', label: 'All Activities' },
              { id: 'UNREAD', label: 'Unread' },
              { id: 'PATIENT', label: 'Admissions/Releases' },
              { id: 'APPOINTMENT', label: 'Appointments' },
              { id: 'PAYMENT', label: 'Payments' },
              { id: 'SYSTEM', label: 'Added/Deleted' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border shadow-sm ${
                  filter === f.id 
                  ? 'bg-card border-border text-primary shadow-sm ring-1 ring-primary/10' 
                  : 'bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-card-foreground'
                }`}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 relative min-h-[400px]">
        {isLoading && notifications.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : displayNotifications.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border/50 border-dashed">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
              <Info size={32} />
            </div>
            <h3 className="text-xl font-black text-card-foreground">{t("No events found")}</h3>
            <p className="text-muted-foreground text-sm font-medium max-w-sm mt-2">
              {searchQuery ? t("We couldn't find any activities matching your search.") : t("There are no recent activities to display in this category.")}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {displayNotifications.map((notification, index) => {
              const styles = getNotificationStyles(notification)
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`group bg-card border rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 transition-all cursor-pointer shadow-sm hover:shadow-md ${
                    !notification.read ? 'border-primary/40 bg-primary/[0.03]' : 'border-border/60 hover:border-border'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${styles.bg} ${styles.border}`}>
                    {styles.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className={`text-base md:text-lg font-black tracking-tight ${!notification.read ? 'text-primary' : 'text-card-foreground'}`}>
                        {t(notification.title)}
                      </h4>
                      {!notification.read && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                          {t('New')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {t(notification.message)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t border-border/50 md:border-t-0 mt-2 md:mt-0">
                    <span className="text-xs font-bold text-muted-foreground/70 flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg border border-border/50">
                      <Clock size={12} />
                      {new Date(notification.createdAt).toLocaleString([], { 
                        month: 'short', day: 'numeric', 
                        hour: '2-digit', minute: '2-digit' 
                      })}
                    </span>
                    
                    {!notification.read && (
                      <button
                        onClick={(e) => markAsRead(notification.id, e)}
                        className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-200 hover:border-emerald-500 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                      >
                        <Check size={14} />
                        {t('Mark Read')}
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
