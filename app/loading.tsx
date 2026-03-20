'use client'

import { motion } from 'framer-motion'
import { MoonStar } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

export default function Loading() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div
        className={`absolute inset-0 ${
          festive
            ? 'bg-[radial-gradient(circle_at_top,rgba(247,231,206,0.18),transparent_28%),linear-gradient(135deg,#010202_0%,#07150f_48%,#0f3d2e_100%)]'
            : 'bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.18),transparent_28%),linear-gradient(135deg,#020617_0%,#082032_48%,#0f172a_100%)]'
        }`}
      />
      
      <div className="absolute inset-0">
        <div
          className={`absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] ${
            festive ? 'bg-[#d4af37]/16' : 'bg-blue-600/20'
          }`}
        />
      </div>
      
      <div className="relative">
        <motion.div
          className={`h-16 w-16 rounded-full border-4 ${festive ? 'border-[#d4af37]/20 border-t-[#f7e7ce]' : 'border-blue-500/20 border-t-blue-500'}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute inset-2 rounded-full border-4 ${festive ? 'border-[#f7e7ce]/16 border-t-[#d4af37]' : 'border-cyan-500/20 border-t-cyan-500'}`}
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <MoonStar className={`h-6 w-6 ${festive ? 'text-[#f7e7ce]' : 'text-cyan-300'}`} />
        </div>
      </div>
    </div>
  )
}
