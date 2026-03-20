'use client'

import { motion } from 'framer-motion'
import {
  Banknote,
  Bitcoin,
  CreditCard,
  Landmark,
  Smartphone,
  Wallet,
} from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'
import { FestiveRibbon } from './FestiveDecor'

const paymentMethods = [
  {
    name: 'JazzCash',
    icon: Smartphone,
    description: 'Mobile Wallet',
  },
  {
    name: 'Easypaisa',
    icon: Wallet,
    description: 'Mobile Wallet',
  },
  {
    name: 'SadaPay',
    icon: CreditCard,
    description: 'Digital Bank',
  },
  {
    name: 'Bank Transfer',
    icon: Landmark,
    description: 'All Banks',
  },
  {
    name: 'PayPal',
    icon: Banknote,
    description: 'International',
  },
  {
    name: 'Crypto',
    icon: Bitcoin,
    description: 'BTC, ETH, USDT',
  },
  {
    name: 'UPI',
    icon: CreditCard,
    description: 'Indian Payments',
  },
]

export default function PaymentMethods() {
  const { theme } = useTheme()
  const festive = theme === 'eid'

  return (
    <section id="payments" className="relative overflow-hidden px-4 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
        <div className="absolute left-[8%] top-10 h-56 w-56 rounded-full bg-[var(--theme-glow)] blur-[110px]" />
        <div className="absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-[color:var(--theme-button-shadow)] blur-[120px]" />
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
            <FestiveRibbon className="mb-6" label="Easy Payments For Eid Rush" />
          ) : (
            <span className="theme-badge mb-6 text-sm">
              <Wallet className="h-4 w-4" />
              Payment Methods
            </span>
          )}

          <h2 className="theme-heading text-4xl md:text-5xl">
            Flexible Payments,
            <br />
            <span className="theme-heading-accent">Fast Checkout Experience</span>
          </h2>

          <p className="theme-copy mx-auto mt-6 max-w-2xl text-base leading-8 md:text-lg">
            Multiple payment options keep ordering simple for local and international customers, while the festive theme keeps the whole experience polished and premium.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="theme-panel theme-card-hover min-w-[220px] rounded-[28px] px-5 py-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    festive
                      ? 'bg-gradient-to-br from-[#0f3d2e] via-[#185742] to-[#d4af37] text-[#fff8ea]'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                  }`}
                >
                  <method.icon className="h-6 w-6" />
                </div>

                <div>
                  <p className="theme-heading-tight text-lg">{method.name}</p>
                  <p className="theme-copy text-sm">{method.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="theme-panel-soft inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-5 py-3 text-sm">
            <span className="theme-copy">Secure and instant payments</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-highlight)]" />
            <span className="theme-copy">Smooth checkout for Ramadan and Eid offers</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
