'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MoonStar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/lib/ThemeContext'

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false)
  const [prevPath, setPrevPath] = useState('')
  const pathname = usePathname()
  const { theme } = useTheme()
  const festive = theme === 'eid'

  useEffect(() => {
    if (prevPath && prevPath !== pathname) {
      setIsLoading(false)
    }

    setPrevPath(pathname)
  }, [pathname, prevPath])

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
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md"
        >
          <div
            className={`absolute inset-0 ${
              festive
                ? 'bg-[radial-gradient(circle_at_top,rgba(247,231,206,0.16),transparent_28%),linear-gradient(135deg,#010202_0%,#07150f_48%,#0f3d2e_100%)]'
                : 'bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.16),transparent_28%),linear-gradient(135deg,#020617_0%,#082032_48%,#0f172a_100%)]'
            }`}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${festive ? 'border-[#d4af37]/30 border-t-[#f7e7ce]' : 'border-cyan-500/20 border-t-cyan-400'}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className={`absolute inset-2 rounded-full border-2 ${festive ? 'border-[#f7e7ce]/18 border-t-[#d4af37]' : 'border-blue-500/20 border-t-blue-400'}`}
                animate={{ rotate: -360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <MoonStar className={`relative h-6 w-6 ${festive ? 'text-[#f7e7ce]' : 'text-cyan-300'}`} />
            </div>
            <p className={`text-sm uppercase tracking-[0.32em] ${festive ? 'text-[#f7e7ce]' : 'text-cyan-200'}`}>
              {festive ? 'Preparing Eid Experience' : 'Loading Experience'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
