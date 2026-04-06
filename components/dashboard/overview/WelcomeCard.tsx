'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar as CalendarIcon, ArrowRight, Sparkles, User, MessageCircle, X, ChevronLeft, ChevronRight, Calendar, Gamepad2, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useSocket } from '@/contexts/SocketContext'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { Sun, Cloud, CloudRain, Quote } from 'lucide-react'

interface WelcomeCardProps {
  userName?: string
  userRole?: string
  activeStaff?: number | any[]
}

export default function WelcomeCard({ userName = 'Admin', userRole = 'ADMIN', activeStaff = 0 }: WelcomeCardProps) {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const { onlineUsers } = useSocket()
  const router = useRouter()
  const [time, setTime] = useState(new Date())
  const [showActiveModal, setShowActiveModal] = useState(false)
  const [activeWidget, setActiveWidget] = useState<'clock' | 'calendar' | 'tictactoe'>('clock')
  
  // Quote logic
  const quotes = [
    { en: "Healthcare is a right, not a privilege.", bn: "স্বাস্থ্যসেবা একটি অধিকার, সুযোগ নয়।" },
    { en: "Your health is our priority.", bn: "আপনার স্বাস্থ্য আমাদের অগ্রাধিকার।" },
    { en: "Healing begins with compassion.", bn: "করুণার সাথেই আরোগ্য শুরু হয়।" }
  ]
  const [quote, setQuote] = useState(quotes[0].en)

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(lang === 'bn' ? randomQuote.bn : randomQuote.en)
  }, [lang])

  // Tic Tac Toe State
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const winner = calculateWinner(board)

  function calculateWinner(squares: any[]) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for (let i=0; i<lines.length; i++) {
        const [a,b,c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
    }
    return squares.includes(null) ? null : 'Draw'
  }

  // Minimax Algorithm for unbeatable AI
  function minimax(squares: any[], depth: number, isMaximizing: boolean): number {
    const res = calculateWinner(squares);
    if (res === 'O') return 10 - depth;
    if (res === 'X') return depth - 10;
    if (res === 'Draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  const handleCellClick = (i: number) => {
    if (winner || board[i] || !isXNext) return
    const nextBoard = board.slice()
    nextBoard[i] = 'X'
    setBoard(nextBoard)
    setIsXNext(false)
  }

  // AI Move (O) with Minimax
  useEffect(() => {
    if (!isXNext && !winner && activeWidget === 'tictactoe') {
      const timer = setTimeout(() => {
        let bestScore = -Infinity;
        let move = -1;
        const tempBoard = board.slice();
        for (let i = 0; i < 9; i++) {
          if (!tempBoard[i]) {
            tempBoard[i] = 'O';
            const score = minimax(tempBoard, 0, false);
            tempBoard[i] = null;
            if (score > bestScore) {
              bestScore = score;
              move = i;
            }
          }
        }
        if (move !== -1) {
          const nextBoard = board.slice()
          nextBoard[move] = 'O'
          setBoard(nextBoard)
          setIsXNext(true)
        }
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isXNext, winner, board, activeWidget])

  // Auto Restart
  useEffect(() => {
    if (winner && activeWidget === 'tictactoe') {
      const timer = setTimeout(() => {
        resetGame()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [winner, activeWidget])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hour = time.getHours()
  let greetingKey = 'Good Morning'
  if (hour >= 12 && hour < 17) greetingKey = 'Good Afternoon'
  if (hour >= 17) greetingKey = 'Good Evening'

  const formattedTime = time.toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  const formattedDate = time.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Calculator logic
  const handleCalc = (btn: string) => {
    if (btn === '=') {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(calcValue.replace('×', '*').replace('÷', '/'))
        setCalcResult(res.toString())
        setCalcValue(res.toString())
      } catch (err) {
        setCalcResult('Error')
      }
    } else if (btn === 'C') {
        setCalcValue('')
        setCalcResult(null)
    } else {
        setCalcValue(prev => prev + btn)
    }
  }

  // Use the larger of the two: backend-fetched recent staff or current socket online users
  const activeStaffCount = Math.max(
    Array.isArray(activeStaff) ? activeStaff.length : 0,
    onlineUsers.size
  )

  // Theme-specific configurations
  const themeConfigs: Record<string, any> = {
    emerald: {
      bg: 'bg-[#064e3b]',
      glow: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-800/30',
      secondaryText: 'text-emerald-100/70',
      button: 'bg-emerald-600 hover:bg-emerald-700'
    },
    rose: {
      bg: 'bg-[#881337]',
      glow: 'bg-rose-500/20',
      text: 'text-rose-400',
      border: 'border-rose-800/30',
      secondaryText: 'text-rose-100/70',
      button: 'bg-rose-600 hover:bg-rose-700'
    },
    amber: {
      bg: 'bg-[#78350f]',
      glow: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-800/30',
      secondaryText: 'text-amber-100/70',
      button: 'bg-amber-600 hover:bg-amber-700'
    },
    dark: {
      bg: 'bg-[#0f172a]',
      glow: 'bg-blue-500/20',
      text: 'text-blue-400',
      border: 'border-slate-800/30',
      secondaryText: 'text-slate-100/70',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    light: {
      bg: 'bg-card',
      glow: 'bg-primary/5',
      text: 'text-primary',
      border: 'border-border',
      secondaryText: 'text-muted-foreground',
      button: 'bg-primary hover:bg-primary/90',
      isLight: true
    }
  }

  const config = themeConfigs[theme] || themeConfigs.emerald
  const isLight = config.isLight

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl ${config.bg} p-8 md:p-10 shadow-2xl transition-colors duration-500 border ${config.border}`}
    >
      {/* Decorative background elements */}
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${config.glow} blur-[100px] rounded-full -mr-32 -mt-32 transition-all duration-1000`} />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-white/5 blur-[60px] rounded-full -ml-24 -mb-24" />
      
      {/* Subtle Pattern Overlay */}
      <div className={`absolute inset-0 opacity-[0.02] pointer-events-none`} style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px', color: isLight ? 'black' : 'white' }} />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`flex items-center gap-2 ${config.text} font-bold tracking-widest uppercase text-[10px] border ${isLight ? 'border-primary/10 bg-primary/5' : 'border-white/10 bg-white/5'} px-3 py-1 rounded-full backdrop-blur-md`}
              >
                <Sparkles size={12} className="animate-pulse" />
                {t('System Active')}
              </motion.div>

              {activeStaffCount > 0 && (
                <motion.div 
                   onClick={() => setShowActiveModal(true)}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`flex items-center gap-2 ${isLight ? 'text-blue-600 border-blue-100 bg-blue-50' : 'text-blue-400 border-blue-500/20 bg-blue-500/5'} font-bold tracking-widest uppercase text-[10px] border px-3 py-1 rounded-full backdrop-blur-md cursor-pointer hover:scale-105 transition-all`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-blue-600' : 'bg-blue-500'} animate-ping`} />
                  {activeStaffCount} {t('Active Personnel')}
                </motion.div>
              )}
            </div>
            
            <div className="space-y-1">
              <h1 className={`text-2xl md:text-5xl font-black ${isLight ? 'text-card-foreground' : 'text-white'} tracking-tight leading-tight`}>
                {t(greetingKey)}, <span className={`${isLight ? 'text-primary' : config.text}`}>{userName}!</span>
                <motion.span 
                  animate={{ rotate: [0, 15, 0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1.5 }}
                  className="inline-block ml-3 origin-bottom-right"
                >
                  👋
                </motion.span>
              </h1>
              
              <p className={`text-sm md:text-lg ${config.secondaryText} font-medium max-w-xl leading-relaxed`}>
                {t('Resonance private center dashboard welcome')}
              </p>

              {/* Dynamic Stats Summary Section (Role Based) */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                 {/* Admin Statistics */}
                 {userRole === 'ADMIN' && (
                    <>
                       <div className={`flex flex-col p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border} min-w-[120px]`}>
                          <span className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-500' : 'text-white/40'} mb-1`}>{t('Total Revenue')}</span>
                          <span className={`text-xl font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>$42,500</span>
                       </div>
                       <div className={`flex flex-col p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border} min-w-[120px]`}>
                          <span className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-500' : 'text-white/40'} mb-1`}>{t('Active Staff')}</span>
                          <span className={`text-xl font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>{activeStaffCount}</span>
                       </div>
                    </>
                 )}

                 {/* Doctor Statistics */}
                 {userRole === 'DOCTOR' && (
                    <>
                       <div className={`flex flex-col p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border} min-w-[120px]`}>
                          <span className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-500' : 'text-white/40'} mb-1`}>{t('My Patients')}</span>
                          <span className={`text-xl font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>08</span>
                       </div>
                       <div className={`flex flex-col p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border} min-w-[120px]`}>
                          <span className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-500' : 'text-white/40'} mb-1`}>{t('Surgeries')}</span>
                          <span className={`text-xl font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>02</span>
                       </div>
                    </>
                 )}

                 {/* Receptionist Statistics */}
                 {userRole === 'RECEPTIONIST' && (
                    <>
                       <div className={`flex flex-col p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border} min-w-[120px]`}>
                          <span className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-500' : 'text-white/40'} mb-1`}>{t('Total Bookings')}</span>
                          <span className={`text-xl font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>24</span>
                       </div>
                       <div className={`flex flex-col p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border} min-w-[120px]`}>
                          <span className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-500' : 'text-white/40'} mb-1`}>{t('Check-ins')}</span>
                          <span className={`text-xl font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>15</span>
                       </div>
                    </>
                 )}
                 
                 {/* Weather Mock */}
                 <div className={`flex items-center gap-3 p-3 rounded-2xl ${isLight ? 'bg-primary/5' : 'bg-white/5'} border ${config.border}`}>
                    <Sun className="text-amber-400 animate-pulse" size={24} />
                    <div>
                       <div className={`text-sm font-black ${isLight ? 'text-card-foreground' : 'text-white'}`}>32°C</div>
                       <div className={`text-[8px] uppercase font-black ${config.text}`}>Sunny Dhaka</div>
                    </div>
                 </div>
              </div>

              {/* Motivational Quote */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className={`flex items-start gap-2 mt-4 max-w-md italic ${isLight ? 'text-slate-500' : 'text-white/60'}`}
              >
                 <Quote size={12} className="mt-1 flex-shrink-0" />
                 <p className="text-[11px] leading-tight font-medium">
                    {quote}
                 </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center lg:items-end gap-3">
           {/* Real-time Clock Section */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 }}
             className={`${isLight ? 'bg-secondary/50 border-border' : 'bg-white/5 border-white/10 shadow-2xl shadow-black/20'} backdrop-blur-xl border p-4 rounded-2xl w-[240px] md:w-[260px] h-[155px] text-center group/widget transition-all duration-500 relative flex flex-col justify-center cursor-grab active:cursor-grabbing overflow-hidden`}
           >
              <AnimatePresence mode="wait">
                {activeWidget === 'clock' && (
                  <motion.div 
                    key="clock"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) setActiveWidget('tictactoe')
                      if (info.offset.x > 50) setActiveWidget('calendar')
                    }}
                    className="w-full h-full flex flex-col justify-center"
                  >
                    <div className={`flex items-center justify-center gap-1.5 ${config.text} mb-1 font-bold uppercase tracking-widest text-[8px]`}>
                      <Clock size={10} />
                      {t('Local Time')}
                    </div>
                    <div className={`text-2xl md:text-3xl font-black ${isLight ? 'text-card-foreground' : 'text-white'} tracking-tighter tabular-nums mb-0.5`}>
                      {formattedTime.split(' ')[0]}
                      <span className={`text-base md:text-lg font-bold ${config.text} ml-1.5 uppercase`}>
                        {formattedTime.split(' ')[1]}
                      </span>
                    </div>
                    <div className={`flex items-center justify-center gap-1.5 ${isLight ? 'text-muted-foreground/60' : 'text-white/40'} text-[10px] font-bold`}>
                      <CalendarIcon size={10} />
                      {formattedDate}
                    </div>
                  </motion.div>
                )}

                {activeWidget === 'calendar' && (
                  <motion.div 
                    key="calendar"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) setActiveWidget('clock')
                      if (info.offset.x > 50) setActiveWidget('tictactoe')
                    }}
                    className="flex flex-col items-center w-full h-full justify-center"
                  >
                     <div className={`flex items-center justify-center gap-1.5 ${config.text} mb-1 font-bold uppercase tracking-widest text-[8px]`}>
                        <CalendarIcon size={10} />
                        {t('Calendar')}
                     </div>
                     <div className={`p-1.5 rounded-xl ${isLight ? 'bg-white/80' : 'bg-black/30'} border ${config.border} shadow-inner scale-[0.65] md:scale-[0.75] transition-all`}>
                        <DayPicker 
                           mode="single" 
                           className={`rdp-custom ${isLight ? 'text-slate-800' : 'text-white'}`} 
                           selected={time}
                           styles={{
                              caption: { color: 'inherit', fontWeight: '900', fontSize: '10px', marginBottom: '4px' },
                              head_cell: { color: 'gray', fontSize: '10px', width: '22px' },
                              cell: { fontSize: '10px', padding: '0px' },
                              day: { width: '22px', height: '22px', borderRadius: '8px' },
                              day_selected: { backgroundColor: 'currentColor', color: isLight ? 'white' : 'black', fontWeight: 'bold' }
                           }}
                        />
                     </div>
                  </motion.div>
                )}

                {activeWidget === 'tictactoe' && (
                  <motion.div 
                    key="tictactoe"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) setActiveWidget('calendar')
                      if (info.offset.x > 50) setActiveWidget('clock')
                    }}
                    className="w-full flex flex-col items-center justify-center h-full relative"
                  >
                     {winner ? (
                        <motion.div 
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className="text-center"
                        >
                           <h3 className={`text-lg font-black ${winner === 'X' ? 'text-emerald-500' : 'text-blue-500'} mb-0.5`}>
                              {winner === 'X' ? t('Congratulations!') : t('Well Played!')}
                           </h3>
                           <p className={`text-[8px] font-bold ${isLight ? 'text-slate-500' : 'text-white/60'} max-w-[150px]`}>
                              {winner === 'X' ? t('You won against our system!') : t('System won this time!')}
                           </p>
                           <div className={`mt-2 text-[9px] font-black ${config.text} flex items-center justify-center gap-1.5`}>
                              <Sparkles size={12} />
                              {t('Welcome to Our Hospital')}
                           </div>
                        </motion.div>
                     ) : (
                        <>
                           <div className={`flex items-center justify-center gap-1.5 ${config.text} mb-2 font-bold uppercase tracking-widest text-[8px]`}>
                              <Gamepad2 size={10} />
                              {isXNext ? t('Your Turn') : t('System Thinking...')}
                           </div>
                           <div className="grid grid-cols-3 gap-1 w-fit">
                              {board.map((cell, i) => (
                                 <button key={i} onClick={(e) => { e.stopPropagation(); handleCellClick(i); }} 
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${cell === 'X' ? 'text-emerald-500' : 'text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]'} ${isLight ? 'bg-muted hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'} transition-all`}
                                 >
                                    {cell}
                                 </button>
                              ))}
                           </div>
                        </>
                     )}
                     {!winner && (
                        <button onClick={(e) => { e.stopPropagation(); resetGame(); }} className="mt-2 text-[8px] flex items-center gap-1 font-black uppercase text-muted-foreground hover:text-white transition-all">
                           <RotateCcw size={10} /> {t('Restart')}
                        </button>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-2 flex justify-center gap-1 opacity-40 group-hover/widget:opacity-100 transition-opacity">
                 {['clock', 'calendar', 'tictactoe'].map((w) => (
                    <div key={w} className={`w-1.5 h-1.5 rounded-full transition-all ${activeWidget === w ? `w-3 ${config.text} bg-current` : 'bg-muted-foreground/30'}`} />
                 ))}
              </div>
            </motion.div>
        </div>
      </div>

      {/* Active Personnel List Modal */}
      <AnimatePresence>
         {showActiveModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                 onClick={() => setShowActiveModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
               
               <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className={`relative w-full max-w-lg ${isLight ? 'bg-card' : 'bg-slate-900'} border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden`}
               >
                  <div className="p-8">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h2 className={`text-2xl font-black ${isLight ? 'text-card-foreground' : 'text-white'} tracking-tight`}>{t('Active Personnel')}</h2>
                           <p className="text-muted-foreground text-sm font-medium">{t('Who is online now')}</p>
                        </div>
                        <button onClick={() => setShowActiveModal(false)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-muted-foreground"><X size={20} /></button>
                     </div>

                     <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {Array.isArray(activeStaff) && activeStaff.map((staff: any) => (
                           <div key={staff.id} className={`flex items-center justify-between p-4 rounded-2xl ${isLight ? 'bg-muted/50' : 'bg-white/5'} border border-white/5 hover:border-emerald-500/20 transition-all group`}>
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative">
                                    {staff.profilePic ? (
                                       <img src={staff.profilePic} className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                       <User size={20} />
                                    )}
                                    {onlineUsers.has(staff.id) && (
                                       <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    )}
                                 </div>
                                 <div className="text-left">
                                    <p className={`font-black text-sm ${isLight ? 'text-card-foreground' : 'text-white'}`}>{staff.name}</p>
                                    <div className="flex items-center gap-2">
                                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{staff.role}</p>
                                       <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                       <p className={`text-[10px] font-bold ${onlineUsers.has(staff.id) ? 'text-emerald-500' : 'text-muted-foreground/50'}`}>
                                          {onlineUsers.has(staff.id) 
                                             ? t('Active now') 
                                             : `${Math.floor((Date.now() - new Date(staff.lastActive).getTime()) / 60000)}m ago`}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <button 
                                onClick={() => router.push(`/dashboard/messages?with=${staff.id}`)}
                                className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-500 hover:text-white"
                              >
                                 <MessageCircle size={18} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </motion.div>
  )
}
