'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false)
  const [prevPath, setPrevPath] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (prevPath && prevPath !== pathname) {
      setIsLoading(false)
    }
    setPrevPath(pathname)
  }, [pathname, prevPath])

  // Listen for custom loading event
  useEffect(() => {
    const handleLoadingStart = () => setIsLoading(true)
    const handleLoadingEnd = () => setIsLoading(false)
    
    window.addEventListener('navigation-start', handleLoadingStart)
    window.addEventListener('navigation-end', handleLoadingEnd)
    
    return () => {
      window.removeEventListener('navigation-start', handleLoadingStart)
      window.removeEventListener('navigation-end', handleLoadingEnd)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[150px]" />
          </div>
          
          {/* Loading spinner */}
          <div className="relative">
            <motion.div
              className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
