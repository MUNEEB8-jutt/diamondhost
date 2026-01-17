'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing')

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100
          return prev + Math.random() * 12
        })
      }, 150)
      
      const textInterval = setInterval(() => {
        const texts = ['Initializing', 'Loading Assets', 'Connecting', 'Almost Ready']
        setLoadingText(texts[Math.floor(Math.random() * texts.length)])
      }, 800)
      
      return () => {
        clearInterval(interval)
        clearInterval(textInterval)
      }
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Floating Orbs */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 60 - 30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo - Simple Diamond */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
              }}
              transition={{ 
                duration: 0.8, 
                type: 'spring',
                stiffness: 100
              }}
              className="mb-8"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative mx-auto w-20 h-20"
              >
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                  animate={{
                    borderColor: [
                      'rgba(6, 182, 212, 0.3)',
                      'rgba(6, 182, 212, 0.8)',
                      'rgba(6, 182, 212, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Inner Diamond */}
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 rounded-lg shadow-lg shadow-cyan-500/50">
                  <motion.div
                    className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-lg"
                    animate={{
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Diamond<span className="text-cyan-400">Host</span>
              </h1>
              <p className="text-gray-400 text-sm uppercase tracking-widest">Premium Gaming Servers</p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-6"
            >
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Text */}
              <div className="flex items-center justify-between text-sm">
                <motion.span
                  key={loadingText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-cyan-400 font-medium"
                >
                  {loadingText}...
                </motion.span>
                <span className="text-gray-500 font-mono">{Math.round(progress)}%</span>
              </div>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center space-x-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400/20" />
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-400/20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400/20" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400/20" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}