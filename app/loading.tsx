'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[150px]" />
      </div>
      
      {/* Loading spinner */}
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
