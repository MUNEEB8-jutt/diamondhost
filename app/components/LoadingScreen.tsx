'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-8"
          >
            <svg viewBox="0 0 80 80" className="w-24 h-24">
              <defs>
                <linearGradient id="loadingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff"/>
                  <stop offset="100%" stopColor="#0099cc"/>
                </linearGradient>
              </defs>
              <motion.polygon 
                points="40,8 72,28 72,60 40,76 8,60 8,28" 
                fill="url(#loadingGrad)" 
                stroke="#0088aa" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              <polygon points="40,8 72,28 40,40 8,28" fill="#66e0ff" opacity="0.9"/>
            </svg>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-cyan-400 mb-4"
          >
            Diamond Host
          </motion.h1>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 text-sm mt-4"
          >
            Loading premium experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}