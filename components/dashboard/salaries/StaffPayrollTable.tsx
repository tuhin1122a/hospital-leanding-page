'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, User, DollarSign, Info } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/LanguageContext'

interface StaffPayrollTableProps {
  staff: any[]
  searchQuery: string
  onSearchChange: (val: string) => void
  onPay: (id: string, amount: number) => void
  onSetBase: (id: string, amount: number) => void
}

export default function StaffPayrollTable({ staff, searchQuery, onSearchChange, onPay, onSetBase }: StaffPayrollTableProps) {
  const { t } = useLanguage()

  return (
    <Card className="xl:col-span-2 rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
      <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight">{t('Employee Payroll List')}</h2>
        <div className="relative group min-w-[240px]">
          <Search className="absolute left-3.5 top-3 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
          <Input 
            placeholder={t('Search names or roles...')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-xl pl-10 h-10 border-border/50 bg-muted/30 focus:bg-card transition-all"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50 border-b border-border/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12 text-muted-foreground">{t('Employee')}</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12 text-muted-foreground">{t('Position')}</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12 text-center text-muted-foreground">{t('Current Base')}</TableHead>
              <TableHead className="text-right font-black text-[10px] uppercase tracking-widest px-6 h-12 text-muted-foreground">{t('Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                <Info size={32} className="mx-auto mb-2 opacity-20" />
                <p className="font-bold text-sm tracking-tight">{t('No employees matching your search')}</p>
              </TableCell></TableRow>
            ) : staff.map((s) => (
              <TableRow key={s.id} className="hover:bg-muted/20 border-border/40 transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden shrink-0 border border-border shadow-sm">
                      {s.profilePic ? <img src={s.profilePic} className="w-full h-full object-cover" /> : <User size={20} className="m-auto mt-3 text-zinc-300" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm tracking-tight">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold">{s.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6">
                  <Badge variant="outline" className="rounded-lg font-black text-[9px] tracking-widest bg-zinc-100/50 uppercase py-1 border-border/50 text-muted-foreground/80">
                    {t(s.role)}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 text-center font-black text-base text-card-foreground">
                  ${s.baseSalary?.toLocaleString() || 0}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs h-9 px-4 hover:bg-zinc-100 transition-all">{t('Edit')}</Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-2xl border-none shadow-2xl p-8 transform-gpu">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-black tracking-tighter">{t('Adjust Compensation')}</DialogTitle>
                          <p className="text-sm text-muted-foreground font-medium">{t(`Set the monthly base salary for ${s.name}`)}</p>
                        </DialogHeader>
                        <div className="space-y-6 py-6">
                          <div className="space-y-3">
                            <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">{t('Monthly Amount ($)')}</Label>
                            <div className="relative group">
                              <DollarSign size={18} className="absolute left-4 top-3 text-emerald-500 transition-transform group-focus-within:scale-110" />
                              <Input 
                                type="number" 
                                defaultValue={s.baseSalary} 
                                onBlur={(e) => onSetBase(s.id, parseFloat(e.target.value))}
                                className="rounded-xl pl-10 h-12 bg-muted/40 border-none font-bold text-lg"
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter><Button className="w-full rounded-xl bg-primary font-black shadow-lg shadow-primary/20 h-12">{t('Save Changes')}</Button></DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      onClick={() => onPay(s.id, s.baseSalary)}
                      disabled={!s.baseSalary}
                      className="h-9 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 px-4 transition-all hover:scale-105 active:scale-95"
                    >
                      {t('Pay Now')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
