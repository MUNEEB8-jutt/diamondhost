'use client'

import { motion } from 'framer-motion'

const STAR_POINTS = [
  { left: '6%', top: '16%', size: 6, delay: 0.2 },
  { left: '12%', top: '24%', size: 8, delay: 1.1 },
  { left: '21%', top: '9%', size: 5, delay: 0.8 },
  { left: '28%', top: '18%', size: 10, delay: 1.6 },
  { left: '42%', top: '10%', size: 6, delay: 2.2 },
  { left: '49%', top: '22%', size: 7, delay: 0.4 },
  { left: '58%', top: '14%', size: 5, delay: 1.8 },
  { left: '66%', top: '8%', size: 8, delay: 1.4 },
  { left: '74%', top: '18%', size: 10, delay: 2.6 },
  { left: '82%', top: '12%', size: 7, delay: 0.6 },
  { left: '89%', top: '20%', size: 5, delay: 1.9 },
  { left: '94%', top: '8%', size: 6, delay: 2.8 },
]

export function CrescentMoon({
  className = '',
  glow = true,
}: {
  className?: string
  glow?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      {glow && <div className="absolute inset-0 rounded-full bg-[#f7e7ce]/20 blur-3xl" />}
      <svg viewBox="0 0 120 120" className="relative h-full w-full" fill="none">
        <path
          d="M72 10c-7.5 3.8-14.4 9.7-19.8 17.5-16.6 23.8-10.9 56.5 12.9 73.1 7.2 5 15.1 8.1 23.2 9.3-24.3 12.2-54.9 9.7-76.9-5.7C-17.7 84.4-24.4 44.5-4.5 15.9 14.2-10.8 49.6-18.3 78.2-3.1 75.8 1.5 73.7 5.8 72 10Z"
          fill="#F7E7CE"
          opacity="0.96"
        />
        <path
          d="M72 10c-7.5 3.8-14.4 9.7-19.8 17.5-16.6 23.8-10.9 56.5 12.9 73.1 7.2 5 15.1 8.1 23.2 9.3-24.3 12.2-54.9 9.7-76.9-5.7C-17.7 84.4-24.4 44.5-4.5 15.9 14.2-10.8 49.6-18.3 78.2-3.1 75.8 1.5 73.7 5.8 72 10Z"
          stroke="#D4AF37"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}

export function Lantern({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -14, 0], rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#f7e7ce]/20 to-[#d4af37]/60" />
      <div className="absolute inset-4 rounded-full bg-[#f7e7ce]/20 blur-2xl" />
      <svg viewBox="0 0 80 140" className="relative h-full w-full">
        <path d="M38 0h4v20h-4z" fill="#D4AF37" />
        <path d="M20 24h40l8 12H12l8-12Z" fill="#D4AF37" />
        <path
          d="M18 36h44l-6 64c-.6 7.2-6.7 12.7-13.9 12.7H38c-7.2 0-13.3-5.5-13.9-12.7L18 36Z"
          fill="rgba(247, 231, 206, 0.24)"
          stroke="#D4AF37"
          strokeWidth="4"
        />
        <path d="M28 48h24v40H28z" fill="rgba(247, 231, 206, 0.75)" />
        <path d="M32 56h16v24H32z" fill="#F7E7CE" opacity="0.7" />
        <path d="M20 112h40l6 12H14l6-12Z" fill="#D4AF37" />
        <path d="M34 124h12v12H34z" fill="#D4AF37" />
      </svg>
    </motion.div>
  )
}

export function FestiveRibbon({
  label = 'Eid Mubarak',
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-[rgba(15,61,46,0.72)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#f7e7ce] shadow-[0_10px_30px_rgba(212,175,55,0.18)] ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
      {label}
      <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
    </div>
  )
}

export function StarField({
  className = '',
  count = STAR_POINTS.length,
}: {
  className?: string
  count?: number
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {STAR_POINTS.slice(0, count).map((star, index) => (
        <motion.span
          key={`${star.left}-${star.top}-${index}`}
          className="absolute rounded-full bg-[#f7e7ce]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 12px rgba(247, 231, 206, 0.7)',
          }}
          animate={{
            opacity: [0.3, 1, 0.45],
            scale: [0.75, 1.1, 0.8],
          }}
          transition={{
            duration: 2.8 + (index % 3) * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}
    </div>
  )
}

export function RosetteMedallion({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ rotate: [0, 6, 0, -6, 0], y: [0, -6, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="absolute inset-0 rounded-full bg-[#d4af37]/18 blur-2xl" />
      <svg viewBox="0 0 120 120" className="relative h-full w-full" fill="none">
        <circle cx="60" cy="60" r="57" stroke="#D4AF37" strokeOpacity="0.36" strokeWidth="2" />
        <circle cx="60" cy="60" r="43" stroke="#F7E7CE" strokeOpacity="0.45" strokeWidth="1.5" />
        <path
          d="M60 16 68 34 88 32 76 48 88 64 68 62 60 80 52 62 32 64 44 48 32 32 52 34 60 16Z"
          fill="rgba(247,231,206,0.12)"
          stroke="#F7E7CE"
          strokeWidth="2.2"
        />
        <path
          d="M60 32 64 42 76 40 68 50 76 60 64 58 60 68 56 58 44 60 52 50 44 40 56 42 60 32Z"
          fill="#D4AF37"
          fillOpacity="0.86"
          stroke="#F7E7CE"
          strokeOpacity="0.7"
          strokeWidth="1.2"
        />
        <circle cx="60" cy="60" r="6" fill="#F7E7CE" />
      </svg>
    </motion.div>
  )
}

export function MosqueSilhouette({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 1440 240" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mosqueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(247, 231, 206, 0.1)" />
            <stop offset="100%" stopColor="rgba(15, 61, 46, 0.95)" />
          </linearGradient>
        </defs>
        <path
          d="M0 240V188h84l32-22V132l34-18V78l38-26 40 28v42l24 14v30l26 22h92v-36l34-28v-56l54-46 54 46v56l34 28v36h100v-26l20-16v-28l22-12V82l30-22 28 22v28l20 12v28l20 16v26h104v-44l22-18v-40l26-20 28 20v40l22 18v44h92v-30l28-22v-40l44-30 44 30v40l30 22v30h102v52H0Z"
          fill="url(#mosqueGradient)"
        />
      </svg>
    </div>
  )
}
