'use client'

import { motion } from 'framer-motion'
import { Globe, Headphones, Heart, MoonStar, Rocket, Server, Shield, Sparkles, Users, Zap } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'
import { FestiveRibbon } from './FestiveDecor'
import PaymentMethods from './PaymentMethods'
import Reviews from './Reviews'

const stats = [
  { icon: Users, value: '500+', label: 'Happy Gamers' },
  { icon: Server, value: '99.9%', label: 'Uptime' },
  { icon: Globe, value: '3', label: 'Global Locations' },
  { icon: Headphones, value: '24/7', label: 'Support' },
]

const values = [
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Your server stays online with enterprise-grade infrastructure, smart monitoring, and dependable protection.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Fast AMD EPYC and Intel Platinum resources keep gameplay smooth during events, communities, and peak hours.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every plan, support flow, and setup step is designed to keep your hosting journey simple and premium.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We keep polishing the platform so your world looks modern, feels fast, and scales with confidence.',
  },
]

export default function AboutUs() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <>
      <section className="relative z-10 px-4 py-20 md:py-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            {festive ? (
              <FestiveRibbon className="mb-6" label="Ramadan Nights • Diamond Host Sale" />
            ) : (
              <span className="theme-badge mb-6 text-sm">
                <Sparkles className="h-4 w-4" />
                About DiamondHost
              </span>
            )}

            <h2 className="theme-heading text-4xl md:text-6xl">
              {festive ? (
                <>
                  Crafted For <span className="theme-heading-accent">Festive Nights</span>
                  <br />
                  And Big Communities
                </>
              ) : (
                <>
                  Premium Hosting,
                  <br />
                  <span className="theme-heading-accent">Exceptional Experience</span>
                </>
              )}
            </h2>

            <p className="theme-copy mx-auto mt-6 max-w-2xl text-base leading-8 md:text-lg">
              Diamond Host was built to give gamers dependable performance without the usual setup stress. In Eid mode, that same promise now feels warmer, richer, and more memorable while the underlying experience stays just as strong.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="theme-panel theme-card-hover rounded-[28px] p-5 text-center md:p-6"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                    festive
                      ? 'bg-gradient-to-br from-[#0f3d2e] to-[#d4af37] text-[#fff8ea]'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                  }`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="theme-heading-tight text-3xl md:text-4xl">{stat.value}</p>
                <p className="theme-copy mt-2 text-sm uppercase tracking-[0.24em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-18 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="theme-panel-strong overflow-hidden rounded-[32px] p-7 md:p-9"
            >
              <div className={`mb-6 inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] ${festive ? 'border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f7e7ce]' : 'border-cyan-500/20 bg-cyan-500/10 text-cyan-200'}`}>
                {festive ? <MoonStar className="mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Why We Stand Out
              </div>

              <h3 className="theme-heading-tight text-3xl md:text-4xl">
                {festive ? 'An Elegant Hosting Experience, End To End' : 'Hosting That Feels Premium Everywhere'}
              </h3>

              <p className="theme-copy mt-5 text-base leading-8">
                From high-performance plans to support that stays responsive, Diamond Host focuses on making every touchpoint feel polished. The Eid design extends that same premium feeling with crescent accents, lantern glow, rich emerald layers, and refined typography.
              </p>

              <div className="theme-divider my-7" />

              <div className="space-y-3">
                {[
                  'Elegant festive visuals without changing hosting logic',
                  'Consistent premium surfaces, glow, and mobile responsiveness',
                  'A design system that still respects performance',
                ].map((item) => (
                  <div key={item} className="theme-panel-soft flex items-center gap-3 rounded-2xl px-4 py-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${festive ? 'bg-[#d4af37]/14 text-[#f7e7ce]' : 'bg-cyan-500/10 text-cyan-300'}`}>
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <p className="theme-copy text-sm leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              viewport={{ once: true }}
              className="grid gap-5 md:grid-cols-2"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="theme-panel theme-card-hover rounded-[30px] p-6"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                      festive
                        ? 'bg-gradient-to-br from-[#0f3d2e] to-[#d4af37] text-[#fff8ea]'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                    }`}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="theme-heading-tight text-2xl">{value.title}</h3>
                  <p className="theme-copy mt-3 text-sm leading-7">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Reviews />
      <PaymentMethods />
    </>
  )
}
