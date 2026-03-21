'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Headphones, MoonStar, Server, Shield, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/lib/ThemeContext'
import { Lantern, MosqueSilhouette, StarField } from './FestiveDecor'

const stats = [
  { icon: Server, value: '99.9%', label: 'Uptime' },
  { icon: Zap, value: 'Ultra', label: 'Low Latency' },
  { icon: Headphones, value: '24/7', label: 'Support' },
]

const festiveChips = ['Offer valid until 23 March', 'UAE, India, Germany', 'Instant setup in minutes']

const festiveFeatures = [
  { icon: Zap, label: 'Offer valid', value: 'Until 23 March' },
  { icon: Server, label: 'Setup time', value: 'Ready in minutes' },
  { icon: Headphones, label: 'Support', value: '24/7 assistance' },
  { icon: Shield, label: 'Locations', value: 'UAE, India, Germany' },
]

export default function Hero() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-24 md:pb-12 md:pt-28">
      {festive && (
        <>
          <StarField className="opacity-75" count={10} />
          <div className="absolute inset-x-0 bottom-0 z-0">
            <MosqueSilhouette className="h-32 w-full md:h-40 lg:h-48" />
          </div>
          <div className="absolute left-2 top-24 hidden md:block">
            <Lantern className="h-40 w-24 lg:h-48 lg:w-28" delay={0.4} />
          </div>
          <div className="absolute right-2 top-28 hidden md:block">
            <Lantern className="h-36 w-24 lg:h-44 lg:w-28" delay={1.1} />
          </div>
        </>
      )}

      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          {festive ? (
            <span className="theme-badge mb-5 justify-center text-sm">
              <Sparkles className="h-4 w-4" />
              Diamond Host Eid Sale
            </span>
          ) : (
            <span className="theme-badge mb-5 justify-center text-sm">
              <Sparkles className="h-4 w-4" />
              Premium Game Hosting
            </span>
          )}

          <h1 className="theme-heading mx-auto max-w-4xl text-4xl leading-[1.02] md:text-5xl lg:text-6xl">
            {festive ? (
              <>
                Diamond Host
                <span className="theme-heading-accent block">Eid Sale On Hosting Plans</span>
              </>
            ) : (
              <>
                Next-Level
                <span className="theme-heading-accent block">Gaming Experience</span>
              </>
            )}
          </h1>

          <p className="theme-copy mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg">
            {festive
              ? 'Pick your plan, get online in minutes, and keep your community running with stable performance, low latency, and dependable support.'
              : 'Experience unparalleled performance with enterprise-grade servers, low latency routing, DDoS protection, and responsive support built for communities that want premium uptime.'}
          </p>

          {festive && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {festiveChips.map((chip, index) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 + index * 0.08 }}
                  className="theme-pill border-[#d4af37]/20 bg-[rgba(6,20,15,0.58)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#f7e7ce]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
                  {chip}
                </motion.span>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/plans" className="theme-button-primary">
              <Sparkles className="h-5 w-5" />
              {festive ? 'View Plans' : 'Get Started'}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/features" className="theme-button-secondary">
              <MoonStar className="h-5 w-5" />
              View Features
            </Link>
          </div>
        </motion.div>

        {festive ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="theme-panel-strong relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[30px] border border-[#d4af37]/15 p-5 md:p-6 lg:p-8"
          >
            <div className="absolute inset-0 islamic-pattern opacity-[0.12]" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f7e7ce]/10 to-transparent" />

            <div className="relative z-10 grid gap-3 lg:grid-cols-4">
              {festiveFeatures.map((card, index) => {
                const Icon = card.icon

                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                    className="theme-panel-soft rounded-[24px] px-5 py-4 text-left"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f3d2e] to-[#d4af37] text-[#fff8ea]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37]">{card.label}</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-[#f7e7ce]">{card.value}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.34 + index * 0.08 }}
                  className="theme-panel-soft rounded-[22px] px-4 py-4 text-center"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f3d2e] to-[#d4af37] text-[#fff8ea]">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <p className="theme-heading-tight text-2xl">{stat.value}</p>
                  <p className="theme-copy mt-1 text-xs uppercase tracking-[0.22em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 + index * 0.08 }}
                className="theme-panel theme-card-hover rounded-[24px] p-4 text-center md:p-5"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="theme-heading-tight text-2xl md:text-3xl">{stat.value}</p>
                <p className="theme-copy mt-1 text-xs uppercase tracking-[0.22em] md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
