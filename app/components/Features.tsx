'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  Cpu,
  Globe,
  Headphones,
  MoonStar,
  Shield,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'
import { CrescentMoon, FestiveRibbon, Lantern, MosqueSilhouette } from './FestiveDecor'

const features = [
  {
    icon: Cpu,
    title: 'AMD EPYC Powered',
    subtitle: 'Premium Performance',
    description: 'All servers are powered by modern hardware for fast response times and stable gameplay.',
  },
  {
    icon: Shield,
    title: 'DDoS Protection',
    subtitle: 'Always Guarded',
    description: 'Advanced protection helps keep your server online and your community uninterrupted.',
  },
  {
    icon: Zap,
    title: 'Smooth Gameplay',
    subtitle: 'Low Lag Experience',
    description: 'Optimized resources keep world loading, combat, and events feeling fluid.',
  },
  {
    icon: Globe,
    title: 'Multiple Locations',
    subtitle: 'UAE, India, Germany',
    description: 'Choose the region that gives your players the best connection and stability.',
  },
  {
    icon: Clock,
    title: 'Instant Setup',
    subtitle: 'Ready In Minutes',
    description: 'Your server is provisioned quickly so you can start building and inviting players fast.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Real Help Anytime',
    description: 'The support team stays available whenever you need assistance with hosting.',
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
  { value: '<20ms', label: 'Latency' },
  { value: '500+', label: 'Happy Users' },
]

export default function Features() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <section id="features" className="relative z-10 overflow-hidden px-4 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 islamic-pattern opacity-[0.08]" />
        <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-[var(--theme-glow)] blur-[120px]" />
        <div className="absolute bottom-6 right-[-8%] h-80 w-80 rounded-full bg-[color:var(--theme-button-shadow)] blur-[140px]" />
        {festive ? (
          <>
            <CrescentMoon className="absolute right-[10%] top-10 h-28 w-28 opacity-80 md:h-36 md:w-36" />
            <Lantern className="absolute left-[8%] top-10 hidden opacity-70 md:block" delay={0.4} />
            <Lantern className="absolute right-[8%] top-20 hidden opacity-70 lg:block" delay={1.2} />
            <MosqueSilhouette className="absolute bottom-0 left-0 right-0 h-32 opacity-35" />
          </>
        ) : (
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/8 to-transparent" />
        )}
      </div>

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {festive ? (
            <FestiveRibbon className="mb-6" label="Ramadan Ready Infrastructure" />
          ) : (
            <span className="theme-badge mb-6 text-sm">
              <Sparkles className="h-4 w-4" />
              Why Choose Diamond Host
            </span>
          )}

          <h2 className="theme-heading text-4xl md:text-6xl">
            {festive ? (
              <>
                Celebrate Eid With
                <br />
                <span className="theme-heading-accent">Powerful Hosting Features</span>
              </>
            ) : (
              <>
                Powerful Features,
                <br />
                <span className="theme-heading-accent">Built To Perform</span>
              </>
            )}
          </h2>

          <p className="theme-copy mx-auto mt-6 max-w-2xl text-base leading-8 md:text-lg">
            Every layer of the experience is designed to feel premium, from fast deployment and low latency to elegant festive visuals that turn the whole hosting journey into something special.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="theme-panel-strong relative overflow-hidden rounded-[34px] p-7 md:p-9"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,231,206,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.12),transparent_32%)]" />
            <div className="relative z-10">
              <span className="theme-badge text-xs uppercase tracking-[0.28em]">
                {festive ? <MoonStar className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                {festive ? 'Eid Inspired Experience' : 'Premium Hosting Stack'}
              </span>

              <h3 className="theme-heading-tight mt-6 text-3xl md:text-4xl">
                {festive ? 'Elegant visuals outside, serious performance inside.' : 'Hosting that feels polished at every step.'}
              </h3>

              <p className="theme-copy mt-5 text-base leading-8">
                We kept the website structure and business logic intact, then elevated the presentation with richer surfaces, premium typography, glow accents, and a smooth festive atmosphere across your browsing experience.
              </p>

              <div className="theme-divider my-7" />

              <div className="grid gap-3">
                {[
                  'Emerald and gold surfaces with subtle glass depth',
                  'Crescent, lantern, and star-inspired festive accents',
                  'Responsive layouts that stay clean across mobile and desktop',
                ].map((item) => (
                  <div key={item} className="theme-panel-soft flex items-center gap-3 rounded-2xl px-4 py-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(247,231,206,0.12)] text-[var(--theme-highlight)]">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <p className="theme-copy text-sm leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true }}
            className="grid gap-5 md:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="theme-panel theme-card-hover rounded-[30px] p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      festive
                        ? 'bg-gradient-to-br from-[#0f3d2e] via-[#185742] to-[#d4af37] text-[#fff8ea]'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                    }`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="theme-pill text-[11px] uppercase tracking-[0.28em]">{feature.subtitle}</span>
                </div>

                <h3 className="theme-heading-tight text-2xl">{feature.title}</h3>
                <p className="theme-copy mt-3 text-sm leading-7">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="theme-panel rounded-[28px] p-5 text-center md:p-6"
            >
              <p className="theme-heading-tight text-3xl md:text-4xl">{stat.value}</p>
              <p className="theme-copy mt-2 text-xs uppercase tracking-[0.26em] md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
