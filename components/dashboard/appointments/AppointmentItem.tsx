'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Printer, CheckCircle, XCircle, Clock, Calendar, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface AppointmentItemProps {
  app: any
  index: number
  role?: string
  onCancel?: (id: string) => void
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => {
  if (typeof window === 'undefined') return ''
  return document.cookie.split('; ').find(r => r.startsWith('accessToken='))?.split('=')[1] || ''
}
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

const STATUS_CONFIG: Record<string, { label: string; bg: string; dot: string }> = {
  PENDING:   { label: 'Pending',   bg: 'bg-amber-500',  dot: 'bg-amber-400' },
  CONFIRMED: { label: 'Confirmed', bg: 'bg-blue-500',   dot: 'bg-blue-400' },
  COMPLETED: { label: 'Completed', bg: 'bg-emerald-500', dot: 'bg-emerald-400' },
  CANCELLED: { label: 'Cancelled', bg: 'bg-red-500',    dot: 'bg-red-400' },
}

export default function AppointmentItem({ app, index, role, onCancel }: AppointmentItemProps) {
  const { t } = useLanguage()
  const queryClient = useQueryClient()

  const statusMutation = useMutation({
    mutationFn: (status: string) => fetch(`${API}/appointments/${app.id}/status`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify({ status }),
    }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: (_, status) => {
      toast.success(`Appointment ${status.toLowerCase()}`)
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
    onError: () => toast.error('Failed to update status'),
  })

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const apptDate = new Date(app.appointmentDate)
    const dateStr = apptDate.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const html = `
      <html>
        <head>
          <title>Appointment Token - #${app.serialNo}</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; display: flex; align-items: flex-start; justify-content: center; padding: 20px; }
            .ticket { background: white; border-radius: 16px; overflow: hidden; width: 380px; border: 1px solid #e5e7eb; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
            .ticket-header { background: linear-gradient(135deg, #1a4bde, #3b6ef5); color: white; padding: 24px; text-align: center; }
            .hospital-name { font-size: 18px; font-weight: 900; letter-spacing: -0.5px; }
            .hospital-sub { font-size: 11px; opacity: 0.8; margin-top: 4px; }
            .token-section { padding: 24px; border-bottom: 2px dashed #e5e7eb; text-align: center; }
            .token-label { font-size: 11px; font-weight: 900; letter-spacing: 3px; color: #6b7280; text-transform: uppercase; }
            .token-number { font-size: 72px; font-weight: 900; color: #1a4bde; line-height: 1; margin: 8px 0; }
            .details { padding: 20px 24px; space-y: 12px; }
            .row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
            .row-label { font-size: 12px; color: #6b7280; font-weight: 600; }
            .row-value { font-size: 13px; font-weight: 800; color: #111; text-align: right; max-width: 60%; }
            .highlight { color: #1a4bde; }
            .footer { background: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer p { font-size: 11px; color: #9ca3af; font-weight: 500; }
            .barcode { font-size: 28px; letter-spacing: 4px; color: #d1d5db; margin-top: 8px; }
            /* Loader while generating */
            #loader { text-align: center; padding: 40px; font-family: sans-serif; font-weight: bold; color: #1a4bde; }
          </style>
        </head>
        <body>
          <div id="loader">Generating Download... Please wait.</div>
          <div class="ticket" id="ticket-content" style="display: none;">
            <div class="ticket-header">
              <div class="hospital-name">Nurjahan Private Hospital</div>
              <div class="hospital-sub">Appointment Token · অ্যাপয়েন্টমেন্ট টোকেন</div>
            </div>
            <div class="token-section">
              <div class="token-label">Token Number</div>
              <div class="token-number">#${String(app.serialNo || '--').padStart(2, '0')}</div>
              <div class="token-label" style="color:#1a4bde">${app.appointmentTime || ''}</div>
            </div>
            <div class="details">
              <div class="row">
                <span class="row-label">রোগীর নাম</span>
                <span class="row-value">${app.patient?.name || '—'}</span>
              </div>
              <div class="row">
                <span class="row-label">Patient ID</span>
                <span class="row-value">${app.patient?.patientId || '—'}</span>
              </div>
              <div class="row">
                <span class="row-label">ডাক্তার</span>
                <span class="row-value highlight">${app.doctorName || '—'}</span>
              </div>
              <div class="row">
                <span class="row-label">বিভাগ</span>
                <span class="row-value">${app.department || '—'}</span>
              </div>
              <div class="row">
                <span class="row-label">তারিখ</span>
                <span class="row-value">${dateStr}</span>
              </div>
              <div class="row">
                <span class="row-label">সময়</span>
                <span class="row-value highlight">${app.appointmentTime || '—'}</span>
              </div>
              <div class="row">
                <span class="row-label">ফি</span>
                <span class="row-value">৳${app.fee}</span>
              </div>
            </div>
            <div class="footer">
              <p>অনুগ্রহ করে এই টোকেন সাথে আনুন। Please bring this token.</p>
              <div class="barcode">||| ${app.id?.slice(-8).toUpperCase()} |||</div>
            </div>
          </div>
          <script>
            window.onload = function() {
              document.getElementById('ticket-content').style.display = 'block';
              var element = document.getElementById('ticket-content');
              var opt = {
                margin:       [0.5, 0, 0.5, 0],
                filename:     'Token_Serial_${app.serialNo}.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
              };
              html2pdf().set(opt).from(element).save().then(function() {
                setTimeout(function(){ window.close(); }, 500);
              });
            };
          </script>
        </body>
      </html>
    `
    printWindow.document.write(html)
    printWindow.document.close()
  }

  const status = app.status || 'PENDING'
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING
  const canComplete = ['ADMIN', 'DOCTOR', 'RECEPTIONIST'].includes(role || '') && status === 'CONFIRMED'
  const canConfirm = ['ADMIN', 'RECEPTIONIST'].includes(role || '') && status === 'PENDING'
  const canCancel = ['ADMIN', 'RECEPTIONIST'].includes(role || '') && ['PENDING', 'CONFIRMED'].includes(status)

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
      className="group flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl border border-border/60 hover:bg-muted/20 transition-all"
    >
      {/* Serial Number */}
      <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-primary/8 border border-primary/15 text-primary shrink-0">
        <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{t('TOKEN')}</p>
        <p className="text-3xl font-black leading-none">#{app.serialNo ?? '--'}</p>
      </div>

      {/* Main Info */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
        {/* Doctor */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5">{t('Doctor')}</p>
          <p className="font-black text-card-foreground text-sm truncate">{app.doctorName}</p>
          <p className="text-xs font-bold text-primary">{app.department}</p>
        </div>
        {/* Patient */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5">{t('Patient')}</p>
          <p className="font-black text-card-foreground text-sm truncate">{app.patient?.name}</p>
          <p className="text-xs font-bold text-muted-foreground">ID: {app.patient?.patientId}</p>
        </div>
        {/* Date & Time */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5">{t('Schedule')}</p>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-muted-foreground" />
            <p className="text-xs font-bold text-card-foreground">{new Date(app.appointmentDate).toLocaleDateString('en-BD')}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Clock size={12} className="text-primary" />
            <p className="text-sm font-black text-primary">{app.appointmentTime || '—'}</p>
            <span className="text-xs font-bold text-muted-foreground">· ৳{app.fee}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        {/* Status badge */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${cfg.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
          {cfg.label}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {canConfirm && (
            <button onClick={() => statusMutation.mutate('CONFIRMED')} disabled={statusMutation.isPending}
              className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <CheckCircle size={12} /> Confirm
            </button>
          )}
          {canComplete && (
            <button onClick={() => statusMutation.mutate('COMPLETED')} disabled={statusMutation.isPending}
              className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
              <CheckCircle size={12} /> Done
            </button>
          )}
          {canCancel && (
            <button onClick={() => { if (confirm('Cancel this appointment?')) statusMutation.mutate('CANCELLED') }}
              disabled={statusMutation.isPending}
              className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
              <XCircle size={12} /> Cancel
            </button>
          )}
          <button onClick={handleDownload} className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors" title="Download Token">
            <Download size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
