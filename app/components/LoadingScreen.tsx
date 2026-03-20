'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MoonStar, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'
import { CrescentMoon, FestiveRibbon, StarField } from './FestiveDecor'

interface LoadingScreenProps {
  isLoading: boolean
}

const FESTIVE_TEXTS = ['Lighting lanterns', 'Preparing festive sale', 'Loading Diamond Host', 'Almost ready']
const DEFAULT_TEXTS = ['Initializing', 'Loading assets', 'Connecting', 'Almost ready']

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const { theme } = useTheme()
  const festive = theme === 'eid'
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState(festive ? FESTIVE_TEXTS[0] : DEFAULT_TEXTS[0])

  useEffect(() => {
    setLoadingText(festive ? FESTIVE_TEXTS[0] : DEFAULT_TEXTS[0])
  }, [festive])

  useEffect(() => {
    if (!isLoading) {
      return
    }

    const progressInterval = window.setInterval(() => {
      setProgress((previous) => (previous >= 100 ? 100 : previous + Math.random() * 12))
    }, 150)

    const textInterval = window.setInterval(() => {
      const texts = festive ? FESTIVE_TEXTS : DEFAULT_TEXTS
      setLoadingText(texts[Math.floor(Math.random() * texts.length)])
    }, 900)

    return () => {
      window.clearInterval(progressInterval)
      window.clearInterval(textInterval)
    }
  }, [isLoading, festive])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-[130] flex items-center justify-center overflow-hidden"
        >
          <div
            className={`absolute inset-0 ${
              festive
                ? 'bg-[radial-gradient(circle_at_top,rgba(247,231,206,0.18),transparent_28%),linear-gradient(135deg,#010202_0%,#07150f_48%,#0f3d2e_100%)]'
                : 'bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.18),transparent_28%),linear-gradient(135deg,#020617_0%,#082032_48%,#0f172a_100%)]'
            }`}
          />

          {festive && <StarField className="opacity-75" count={8} />}

          <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center">
            {festive ? (
              <>
                <FestiveRibbon className="mb-6" label="Diamond Host Eid Sale" />
                <div className="relative mb-7 h-28 w-28">
                  <CrescentMoon />
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="mb-8"
              >
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10"
                >
                  <Sparkles className="h-10 w-10 text-cyan-300" />
                </motion.div>
              </motion.div>
            )}

            <h1 className="theme-heading text-4xl md:text-5xl">
              Diamond<span className="theme-heading-accent">Host</span>
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.34em] theme-copy">
              {festive ? 'Premium Diamond Host Eid Sale' : 'Premium Gaming Servers'}
            </p>

            <div className="mt-8 w-full">
              <div className="relative mb-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    festive
                      ? 'bg-gradient-to-r from-[#0f3d2e] via-[#d4af37] to-[#f7e7ce]'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className={festive ? 'text-[#f7e7ce]' : 'text-cyan-300'}>{loadingText}...</p>
                <p className="theme-copy">{Math.round(progress)}%</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {[0, 1, 2].map((item) => (
                <motion.span
                  key={item}
                  className={`h-2.5 w-2.5 rounded-full ${festive ? 'bg-[#d4af37]' : 'bg-cyan-400'}`}
                  animate={{ scale: [1, 1.45, 1], opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1, repeat: Infinity, delay: item * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
