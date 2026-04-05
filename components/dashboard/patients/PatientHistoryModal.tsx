'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, History, ClipboardList, FlaskConical, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface PatientHistoryModalProps {
  show: boolean
  onClose: () => void
  patient: any
  history: any
  isLoading: boolean
  onAddRecord: (data: any) => Promise<void>
}

export default function PatientHistoryModal({ show, onClose, patient, history, isLoading, onAddRecord }: PatientHistoryModalProps) {
  const { t } = useLanguage(); const [activeTab, setActiveTab] = useState('Overview')
  const [isAdding, setIsAdding] = useState(false); const [newRec, setNewRec] = useState({ diagnosis: '', symptoms: '', notes: '' })

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative w-full max-w-5xl bg-card border border-border rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh]">
        <div className="w-full md:w-80 bg-muted/30 border-r border-border p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-background text-4xl font-black mb-6 shadow-xl shadow-primary/20">{patient?.name[0]}</div>
          <h2 className="text-2xl font-black text-center mb-1">{patient?.name}</h2><Badge className="mb-8 uppercase tracking-widest text-[10px] rounded-full px-4">{patient?.patientId}</Badge>
          <div className="w-full space-y-4 font-bold text-sm text-muted-foreground">
             {[['Age', `${patient?.age} Yrs`], ['Gender', patient?.gender], ['Blood', patient?.bloodGroup], ['Phone', patient?.phone]].map(([l,v]) => (<div key={l} className="flex justify-between py-2 border-b border-border/50"><span>{t(l)}</span><span className={l==='Blood'?'text-primary':'text-card-foreground'}>{v}</span></div>))}
          </div>
          <div className="mt-auto w-full"><Button className="w-full h-14 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-black"><Download className="mr-2" size={18} /> {t('Print EHR')}</Button></div>
        </div>
        <div className="flex-grow flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="p-8 pb-0 flex items-center justify-between">
            <div className="flex gap-2">{['Overview', 'Records', 'Labs', 'Billing'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-primary text-background shadow-lg" : "hover:bg-muted text-muted-foreground"}`}>{t(tab)}</button>))}</div>
            <button onClick={onClose} className="p-3 rounded-2xl bg-muted hover:bg-border transition-all"><X size={20} /></button>
          </div>
          <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
            {isLoading ? <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /><p className="font-bold">{t('Assembling history...')}</p></div> : 
             <div className="space-y-8 animate-in fade-in duration-500">
               {activeTab === 'Overview' && <HistoryOverview history={history} />}
               {activeTab === 'Records' && <HistoryRecords records={history?.records} isAdding={isAdding} setIsAdding={setIsAdding} newRec={newRec} setNewRec={setNewRec} onAdd={async () => { await onAddRecord(newRec); setIsAdding(false); setNewRec({ diagnosis: '', symptoms: '', notes: '' }) }} />}
               {activeTab === 'Labs' && <HistoryLabs labs={history?.labTests} />}
               {activeTab === 'Billing' && <HistoryBilling billing={history?.billings} />}
             </div>}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function HistoryOverview({ history }: any) {
  const { t } = useLanguage()
  return (<div className="space-y-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[['Total Visits', (history?.appointments?.length || 0) + (history?.admissions?.length || 0), 'text-blue-500', 'bg-blue-50'], ['Assessments', history?.records?.length || 0, 'text-purple-500', 'bg-purple-50'], ['Lab Tests', history?.labTests?.length || 0, 'text-amber-500', 'bg-amber-50'], ['Total Paid', `৳${history?.billings?.reduce((a:any, b:any) => a + (b.paidAmount || 0), 0)}`, 'text-emerald-500', 'bg-emerald-50']].map(([l, v, c, b]: any) => (<div key={l} className={`p-4 rounded-3xl ${b}/50 border border-${c.split('-')[1]}-100 flex flex-col`}><span className={`text-[10px] font-black uppercase ${c} mb-1`}>{t(l)}</span><span className={`text-2xl font-black ${c.replace('500', '900')}`}>{v}</span></div>))}
    </div>
    <div><div className="flex items-center gap-2 mb-6"><History size={18} className="text-primary" /><h4 className="text-lg font-black tracking-tight">{t('Timeline of Care')}</h4></div><div className="space-y-6 relative ml-3"><div className="absolute left-0 top-0 bottom-0 w-px bg-border" />{[...(history?.admissions || []), ...(history?.appointments || [])].sort((a,b) => new Date(b.createdAt || b.appointmentDate).getTime() - new Date(a.createdAt || a.appointmentDate).getTime()).map((e: any, i: number) => (<div key={i} className="relative pl-8 group"><div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-primary border-4 border-background group-hover:scale-150 transition-all shadow-sm" /><div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-all"><div><div className="flex items-center gap-2 mb-1"><Badge variant="outline" className="text-[9px] uppercase font-black tracking-widest h-5 px-2">{e.wardNo ? 'Admission' : 'Appointment'}</Badge><span className="text-xs font-bold text-muted-foreground">{new Date(e.createdAt || e.appointmentDate).toLocaleDateString()}</span></div><p className="font-bold text-card-foreground">{e.reason || e.department}</p></div><div className="text-right"><p className="text-xs font-bold text-muted-foreground">{t('Attended By')}</p><p className="text-sm font-black text-primary">{e.doctorInCharge || e.doctorName}</p></div></div></div>))}</div></div>
  </div>)
}

function HistoryRecords({ records, isAdding, setIsAdding, newRec, setNewRec, onAdd }: any) {
  const { t } = useLanguage()
  return (<div className="space-y-6">
    <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><ClipboardList size={18} className="text-primary" /><h4 className="text-lg font-black tracking-tight">{t('Medical Assessments')}</h4></div><Button onClick={() => setIsAdding(true)} variant="outline" size="sm" className="h-9 px-4 rounded-xl border-dashed border-primary/40 text-primary font-bold hover:bg-primary/5 text-xs"><Plus size={14} className="mr-1" /> {t('New Record')}</Button></div>
    {isAdding && (<motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={(e) => { e.preventDefault(); onAdd() }} className="p-6 rounded-3xl bg-muted/20 border border-primary/20 space-y-4 mb-6"><div className="grid grid-cols-2 gap-4">{[['Diagnosis', 'diagnosis'], ['Symptoms', 'symptoms']].map(([l, f]) => (<div key={l} className="space-y-1"><label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t(l)} *</label><input type="text" required value={newRec[f]} onChange={(e) => setNewRec({...newRec, [f]: e.target.value})} className="w-full h-10 px-4 rounded-xl bg-card border border-border outline-none transition-all font-bold text-sm" /></div>))}</div><textarea rows={3} value={newRec.notes} onChange={(e) => setNewRec({...newRec, notes: e.target.value})} placeholder={t('Notes')} className="w-full p-4 rounded-xl bg-card border border-border outline-none transition-all font-bold text-sm resize-none" /><div className="flex gap-2 justify-end"><Button type="button" variant="ghost" className="rounded-xl" onClick={() => setIsAdding(false)}>{t('Cancel')}</Button><Button type="submit" className="rounded-xl px-8 font-black">{t('Save Record')}</Button></div></motion.form>)}
    <div className="space-y-4">{records?.length > 0 ? records.map((rec: any, i: number) => (<div key={i} className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all"><div className="flex justify-between items-start mb-4"><span className="text-xs font-bold text-muted-foreground">{new Date(rec.createdAt).toLocaleDateString()}</span><div className="flex items-center gap-2">{rec.vitals && Object.entries(rec.vitals || {}).map(([k,v]: any) => (<Badge key={k} variant="secondary" className="text-[9px] font-black uppercase tracking-tighter bg-zinc-100 text-zinc-600">{k}: {v}</Badge>))}</div></div><h5 className="text-lg font-black text-card-foreground mb-2">{rec.diagnosis}</h5><p className="text-sm font-medium text-muted-foreground leading-relaxed">{rec.notes}</p></div>)) : (<div className="text-center py-12 rounded-3xl border border-dashed border-border"><ClipboardList size={32} className="mx-auto text-muted-foreground/30 mb-3" /><p className="text-muted-foreground font-bold">{t('No medical records found')}</p></div>)}</div>
  </div>)
}

function HistoryLabs({ labs }: any) {
  const { t } = useLanguage()
  return (<div className="space-y-6"><div className="flex items-center gap-2 mb-2"><FlaskConical size={18} className="text-primary" /><h4 className="text-lg font-black tracking-tight">{t('Laboratory & Diagnostic Tests')}</h4></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{labs?.length > 0 ? labs.map((test: any, i: number) => (<div key={i} className="p-5 rounded-3xl bg-card border border-border relative overflow-hidden group"><div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:bg-primary/10 transition-all flex items-center justify-center -mr-8 -mt-8"><FlaskConical size={20} className="text-primary/30 mr-4 mt-4" /></div><Badge className={`mb-3 px-3 py-1 rounded-full text-[9px] font-black ${test.status === 'COMPLETED' ? "bg-emerald-500" : "bg-amber-500"}`}>{test.status}</Badge><h5 className="font-black text-card-foreground mb-2">{test.testName}</h5><div className="flex justify-between items-end"><div className="text-xs font-bold text-muted-foreground"><p>{t('Date')}: {new Date(test.date).toLocaleDateString()}</p><p className="text-primary mt-1">{test.result || t('Awaiting result...')}</p></div>{test.reportUrl && (<button className="h-8 w-8 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all"><Download size={14} /></button>)}</div></div>)) : (<div className="col-span-2 text-center py-12 rounded-3xl border border-dashed border-border"><FlaskConical size={32} className="mx-auto text-muted-foreground/30 mb-3" /><p className="text-muted-foreground font-bold">{t('No lab tests recorded')}</p></div>)}</div></div>)
}

function HistoryBilling({ billing }: any) {
  const { t } = useLanguage()
  return (<div className="space-y-6"><div className="flex items-center gap-2 mb-2"><CreditCard size={18} className="text-primary" /><h4 className="text-lg font-black tracking-tight">{t('Billing & Payments')}</h4></div><div className="space-y-4">{billing?.length > 0 ? billing.map((bill: any, i: number) => (<div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-500"><CreditCard size={20} /></div><div><h5 className="font-black text-card-foreground">{bill.invoiceNo}</h5><p className="text-xs font-bold text-muted-foreground">{new Date(bill.createdAt).toLocaleDateString()}</p></div></div><div className="flex items-center gap-8"><div className="text-right"><p className="text-xs font-extrabold text-muted-foreground uppercase">{t('Total')}</p><p className="text-lg font-black text-card-foreground">৳{bill.totalAmount}</p></div><div className="text-right"><p className="text-xs font-extrabold text-muted-foreground uppercase">{t('Paid')}</p><p className="text-lg font-black text-emerald-600">৳{bill.paidAmount}</p></div><Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${bill.status === 'PAID' ? "bg-emerald-500" : "bg-red-500"}`}>{bill.status}</Badge><button className="h-10 w-10 rounded-xl bg-muted hover:bg-zinc-200 flex items-center justify-center text-muted-foreground transition-all"><Download size={16} /></button></div></div>)) : (<div className="text-center py-12 rounded-3xl border border-dashed border-border"><CreditCard size={32} className="mx-auto text-muted-foreground/30 mb-3" /><p className="text-muted-foreground font-bold">{t('No financial records found')}</p></div>)}</div></div>)
}

function Plus({ size, className, ...props }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props} > <line x1="12" y1="5" x2="12" y2="19" /> <line x1="5" y1="12" x2="19" y2="12" /> </svg>
  )
}
