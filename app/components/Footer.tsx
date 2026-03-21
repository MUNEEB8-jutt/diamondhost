'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Heart, Mail, MessageCircle, MoonStar, Sparkles } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'
import { RosetteMedallion } from './FestiveDecor'

function DiamondLogo({ festive }: { festive: boolean }) {
  const accentStart = festive ? '#0f3d2e' : '#00d4ff'
  const accentEnd = festive ? '#d4af37' : '#0099cc'
  const accentTop = festive ? '#f7e7ce' : '#66e0ff'

  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <defs>
        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentStart} />
          <stop offset="100%" stopColor={accentEnd} />
        </linearGradient>
      </defs>
      <polygon points="20,2 38,14 38,30 20,38 2,30 2,14" fill="url(#footerLogoGrad)" stroke={accentEnd} strokeWidth="1" />
      <polygon points="20,2 38,14 20,20 2,14" fill={accentTop} opacity="0.92" />
      <polygon points="20,20 38,14 38,30 20,38" fill={accentEnd} opacity="0.7" />
    </svg>
  )
}

export default function Footer() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <footer id="support" className="relative z-10 overflow-hidden border-t border-[var(--theme-border)] bg-[color:var(--theme-surface-soft)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
        <div className="absolute left-[-8%] top-0 h-64 w-64 rounded-full bg-[var(--theme-glow)] blur-[120px]" />
        <div className="absolute bottom-0 right-[-8%] h-72 w-72 rounded-full bg-[color:var(--theme-button-shadow)] blur-[140px]" />
        {festive && <RosetteMedallion className="absolute right-[10%] top-10 hidden h-16 w-16 opacity-75 lg:block" delay={0.5} />}
      </div>

      <div className="container mx-auto relative px-4 py-16">
        <div className="theme-panel-strong theme-spotlight mb-10 flex flex-col gap-4 rounded-[30px] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="theme-heading-tight text-2xl md:text-3xl">
              {festive ? 'Diamond Host Eid sale is live now.' : 'Reliable hosting for growing communities.'}
            </p>
            <p className="theme-copy mt-2 text-sm md:text-base">
              Choose a plan, get set up quickly, and keep your players online with dependable performance and support.
            </p>
          </div>
          <span className="theme-badge text-sm">
            {festive ? <MoonStar className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {festive ? 'Eid Sale Live' : 'Diamond Host Live'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <DiamondLogo festive={festive} />
              <span className="theme-heading-tight text-xl">
                <span className="theme-heading-accent">Diamond</span> Host
              </span>
            </div>
            <p className="theme-copy max-w-sm text-sm leading-7">
              High-performance Minecraft hosting with fast setup, reliable uptime, and support for every stage of your community.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.a
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-panel-soft flex h-10 w-10 items-center justify-center rounded-xl text-[var(--theme-text)]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                <MessageCircle className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="mailto:support@diamondhost.site"
                className="theme-panel-soft flex h-10 w-10 items-center justify-center rounded-xl text-[var(--theme-text)]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            viewport={{ once: true }}
          >
            <h3 className="theme-heading-tight mb-5 text-lg">Our Services</h3>
            <ul className="space-y-3">
              {[
                { label: 'Discord Server', href: 'https://discord.gg/tKDRWYNcuE', external: true },
                { label: 'Minecraft Hosting', href: '/plans' },
                { label: 'Intel Platinum', href: '/plans' },
                { label: 'AMD EPYC', href: '/plans' },
                { label: 'Contact Us', href: 'https://discord.gg/tKDRWYNcuE', external: true },
              ].map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="theme-link inline-flex items-center gap-1 text-sm"
                    whileHover={{ x: 3 }}
                  >
                    {item.label}
                    {item.external ? <ExternalLink className="h-3 w-3" /> : null}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            viewport={{ once: true }}
          >
            <h3 className="theme-heading-tight mb-5 text-lg">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy', href: '/refund' },
              ].map((item) => (
                <li key={item.label}>
                  <motion.a href={item.href} className="theme-link text-sm" whileHover={{ x: 3 }}>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            viewport={{ once: true }}
          >
            <h3 className="theme-heading-tight mb-5 text-lg">Contact</h3>
            <motion.a
              href="mailto:support@diamondhost.site"
              className="theme-panel-soft flex items-center gap-3 rounded-2xl px-4 py-4"
              whileHover={{ y: -2 }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--theme-button-start),var(--theme-button-end))] text-[#fffdf7]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="theme-copy text-xs uppercase tracking-[0.25em]">Email Support</p>
                <p className="theme-heading-tight text-sm">support@diamondhost.site</p>
              </div>
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-4 border-t border-[var(--theme-border)] pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="theme-copy flex items-center gap-2 text-sm">
            <span>Copyright 2026 Diamond Host.</span>
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </span>
            <span>in Pakistan</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="theme-pill text-xs uppercase tracking-[0.24em]">Intel Platinum and AMD EPYC Powered</span>
            <span className="theme-panel-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="theme-copy">All Systems Operational</span>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
