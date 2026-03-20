'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Headphones, MoonStar, Server, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/lib/ThemeContext'
import { CrescentMoon, FestiveRibbon, Lantern, MosqueSilhouette, StarField } from './FestiveDecor'

const stats = [
  { icon: Server, value: '99.9%', label: 'Uptime' },
  { icon: Zap, value: 'Ultra', label: 'Low Latency' },
  { icon: Headphones, value: '24/7', label: 'Support' },
]

export default function Hero() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-10 pt-28 md:pt-32">
      {festive && (
        <>
          <StarField className="opacity-75" count={10} />
          <div className="absolute inset-x-0 bottom-0 z-0">
            <MosqueSilhouette className="h-36 w-full md:h-44 lg:h-52" />
          </div>
          <div className="absolute left-2 top-28 hidden md:block">
            <Lantern className="h-44 w-28 lg:h-52 lg:w-32" delay={0.4} />
          </div>
          <div className="absolute right-2 top-36 hidden md:block">
            <Lantern className="h-40 w-24 lg:h-48 lg:w-28" delay={1.1} />
          </div>
          <div className="absolute right-[10%] top-24 hidden h-28 w-28 md:block lg:h-36 lg:w-36">
            <CrescentMoon />
          </div>
        </>
      )}

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {festive ? (
              <FestiveRibbon className="mb-6" label="Diamond Host Eid Sale" />
            ) : (
              <span className="theme-badge mb-6 text-sm">
                <Sparkles className="h-4 w-4" />
                Premium Game Hosting
              </span>
            )}

            <h1 className="theme-heading text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              {festive ? (
                <>
                  Celebrate <span className="theme-heading-accent">Eid</span> With
                  <br />
                  Powerful Hosting
                </>
              ) : (
                <>
                  Next-Level
                  <br />
                  <span className="theme-heading-accent">Gaming Experience</span>
                </>
              )}
            </h1>

            <p className="theme-copy mt-6 max-w-2xl text-base leading-8 md:text-lg">
              {festive
                ? 'Ramadan nights and Eid celebrations deserve a fast, reliable server. Launch your Minecraft world with deep-emerald elegance, glowing performance, and support that stays awake with your community.'
                : 'Experience unparalleled performance with enterprise-grade servers, low latency routing, DDoS protection, and responsive support built for communities that want premium uptime.'}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/plans" className="theme-button-primary">
                <Sparkles className="h-5 w-5" />
                {festive ? 'Explore Sale Plans' : 'Get Started'}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/features" className="theme-button-secondary">
                <MoonStar className="h-5 w-5" />
                {festive ? 'See Festive Features' : 'View Features'}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 md:max-w-2xl md:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
                  className="theme-panel theme-card-hover rounded-[24px] p-4 text-center md:p-5"
                >
                  <div
                    className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${
                      festive
                        ? 'bg-gradient-to-br from-[#0f3d2e] to-[#d4af37] text-[#fff8ea]'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <p className="theme-heading-tight text-2xl md:text-3xl">{stat.value}</p>
                  <p className="theme-copy mt-1 text-xs uppercase tracking-[0.22em] md:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="relative"
          >
            <div className="theme-panel-strong relative overflow-hidden rounded-[32px] p-6 md:p-8">
              <div className="absolute inset-0 opacity-70">
                <div className={`absolute inset-0 ${festive ? 'islamic-pattern opacity-35' : 'grid-bg opacity-35'}`} />
                <div
                  className={`absolute inset-x-0 top-0 h-40 ${
                    festive
                      ? 'bg-gradient-to-b from-[#f7e7ce]/12 to-transparent'
                      : 'bg-gradient-to-b from-cyan-400/10 to-transparent'
                  }`}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="theme-badge text-xs">
                    <MoonStar className="h-4 w-4" />
                    {festive ? 'Ramadan Ready' : 'Power Stack'}
                  </span>
                  <span className="theme-pill text-xs uppercase tracking-[0.22em]">
                    {festive ? 'Diamond Host Eid Sale' : 'Diamond Host'}
                  </span>
                </div>

                <div className="mt-8 rounded-[28px] border border-white/10 bg-black/15 p-6 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-xs uppercase tracking-[0.32em] ${festive ? 'text-[#d4af37]' : 'text-cyan-300/80'}`}>
                        {festive ? 'Festive Launch' : 'Performance Core'}
                      </p>
                      <h2 className="theme-heading-tight mt-3 text-3xl md:text-4xl">
                        {festive ? 'Night Sky Control Panel' : 'Premium Hosting Stack'}
                      </h2>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${festive ? 'bg-[#d4af37]/15 text-[#f7e7ce]' : 'bg-cyan-500/10 text-cyan-300'}`}>
                      {festive ? 'Gold tier' : 'Live ready'}
                    </div>
                  </div>

                  <div className="theme-divider my-6" />

                  <div className="space-y-3">
                    {[
                      festive ? 'Crescent-inspired premium UI' : 'Enterprise AMD EPYC and Intel Platinum',
                      festive ? 'Golden glass cards and festive glow' : 'Low-latency routes across UAE, India, and Germany',
                      festive ? 'Elegant Eid theme without changing core logic' : 'Secure payments, instant setup, and 24/7 support',
                    ].map((item) => (
                      <div key={item} className="theme-panel-soft flex items-center gap-3 rounded-2xl px-4 py-3">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${
                            festive
                              ? 'bg-[#d4af37]/14 text-[#f7e7ce]'
                              : 'bg-cyan-500/10 text-cyan-300'
                          }`}
                        >
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <p className="theme-copy text-sm leading-7">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
