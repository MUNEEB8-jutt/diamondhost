'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'
import { FestiveRibbon, RosetteMedallion } from './FestiveDecor'

const reviews = [
  {
    name: 'Ahmed Khan',
    role: 'Server Owner',
    rating: 5,
    text: 'Best hosting service I have ever used. The performance is incredible and the support team is always helpful.',
    avatar: 'AK',
  },
  {
    name: 'Sarah Gaming',
    role: 'Content Creator',
    rating: 5,
    text: 'Diamond Host made setting up my Minecraft server very easy and the instant setup flow feels smooth.',
    avatar: 'SG',
  },
  {
    name: 'Ali Raza',
    role: 'Community Manager',
    rating: 5,
    text: 'We switched from another provider and the difference is huge. Great uptime, low lag, and dependable support.',
    avatar: 'AR',
  },
  {
    name: 'Gaming Pro',
    role: 'Esports Team',
    rating: 5,
    text: 'Our team relies on Diamond Host for practice servers. The hardware feels strong and reliable.',
    avatar: 'GP',
  },
  {
    name: 'Minecraft Master',
    role: 'Server Network',
    rating: 5,
    text: 'Running multiple servers here has been smooth. The panel is simple and the support response time is excellent.',
    avatar: 'MM',
  },
]

export default function Reviews() {
  const { theme } = useTheme()
  const festive = theme === 'eid'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const navigate = (dir: number) => {
    setDirection(dir)
    setCurrentIndex((prev) => {
      if (dir === 1) {
        return (prev + 1) % reviews.length
      }

      return prev === 0 ? reviews.length - 1 : prev - 1
    })
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 260 : -260,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 260 : -260,
      opacity: 0,
      scale: 0.94,
    }),
  }

  return (
    <section id="reviews" className="relative overflow-hidden px-4 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 islamic-pattern opacity-[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--theme-glow)] blur-[160px]" />
        {festive && <RosetteMedallion className="absolute right-[10%] top-16 hidden h-16 w-16 opacity-75 lg:block" delay={0.4} />}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {festive ? (
            <FestiveRibbon className="mb-6" label="Hosted Memories, Shared Joy" />
          ) : (
            <span className="theme-badge mb-6 text-sm">
              <Star className="h-4 w-4 fill-current" />
              Customer Reviews
            </span>
          )}

          <h2 className="theme-heading text-4xl md:text-5xl">
            Trusted By Communities
            <br />
            <span className="theme-heading-accent">Who Actually Play Here</span>
          </h2>

          <p className="theme-copy mx-auto mt-6 max-w-2xl text-base leading-8 md:text-lg">
            Real feedback from server owners and communities who trust Diamond Host for daily uptime, smooth performance, and responsive support.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="relative">
            <motion.button
              onClick={() => navigate(-1)}
              className="theme-panel-soft absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full text-[var(--theme-text)] md:-translate-x-8"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <motion.button
              onClick={() => navigate(1)}
              className="theme-panel-soft absolute right-0 top-1/2 z-20 flex h-12 w-12 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full text-[var(--theme-text)] md:translate-x-8"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>

            <div className="overflow-hidden px-3 md:px-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: 'easeInOut' }}
                  className="theme-panel-strong theme-spotlight relative overflow-hidden rounded-[34px] p-8 md:p-10"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,231,206,0.1),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.08),transparent_30%)]" />
                  <Quote className="absolute right-6 top-6 h-14 w-14 text-[var(--theme-highlight)]/20" />

                  <div className="relative z-10">
                    <div className="mb-6 flex gap-1">
                      {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Star className="h-5 w-5 fill-[var(--theme-gold)] text-[var(--theme-gold)]" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="theme-heading-tight text-2xl leading-relaxed md:text-3xl">
                      "{reviews[currentIndex].text}"
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold ${
                          festive
                            ? 'bg-gradient-to-br from-[#0f3d2e] via-[#185742] to-[#d4af37] text-[#fff8ea]'
                            : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                        }`}
                      >
                        {reviews[currentIndex].avatar}
                      </div>
                      <div>
                        <p className="theme-heading-tight text-lg">{reviews[currentIndex].name}</p>
                        <p className="theme-copy text-sm">{reviews[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-10 bg-[var(--theme-gold)]'
                      : 'w-2.5 bg-white/20 hover:bg-white/35'
                  }`}
                  whileHover={{ scale: 1.15 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
