'use client'

import { motion } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useCurrency } from '@/lib/CurrencyContext'
import Link from 'next/link'

const DiamondLogo = () => (
  <svg viewBox="0 0 50 50" className="w-10 h-10">
    <defs>
      <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa"/>
        <stop offset="50%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
      <linearGradient id="diamondShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93c5fd"/>
        <stop offset="100%" stopColor="#3b82f6"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <polygon points="25,3 45,18 45,35 25,47 5,35 5,18" fill="url(#diamondGrad)" filter="url(#glow)"/>
    <polygon points="25,3 45,18 25,25 5,18" fill="url(#diamondShine)" opacity="0.95"/>
    <polygon points="25,25 45,18 45,35 25,47" fill="#2563eb" opacity="0.8"/>
    <polygon points="25,25 5,18 5,35 25,47" fill="#1d4ed8" opacity="0.7"/>
    <polygon points="25,10 32,18 25,25 18,18" fill="#bfdbfe" opacity="0.6"/>
    <circle cx="20" cy="12" r="1.5" fill="white" opacity="0.8"/>
  </svg>
)

const currencies = [
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'PKR', symbol: 'Rs', flag: '🇵🇰' },
] as const

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const { currency, setCurrency } = useCurrency()

  const currentCurrency = currencies.find(c => c.code === currency)

  const navItems = [
    { href: '#', label: 'Home', isLink: false },
    { href: '#plans', label: 'Plans', isLink: false },
    { href: '#features', label: 'Features', isLink: false },
    { href: '/support', label: 'Support', isLink: true },
  ]

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/80 backdrop-blur-xl border-b border-blue-500/10"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a href="/" className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
            <DiamondLogo />
            <span className="font-orbitron text-lg font-bold tracking-wide">
              <span className="text-blue-400">DIAMOND</span>
              <span className="text-white">HOST</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-6 py-2.5 text-base font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    activeItem === item.label ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  {item.label}
                </Link>
              ) : (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={`relative px-6 py-2.5 text-base font-medium transition-all duration-300 ${
                    activeItem === item.label ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 text-white text-sm py-2 px-3 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{currentCurrency?.flag}</span>
                <span className="font-medium">{currency}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {currencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-600/50 rounded-lg overflow-hidden shadow-xl z-50"
                >
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => { setCurrency(curr.code); setCurrencyOpen(false) }}
                      className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors ${
                        currency === curr.code ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      <span>{curr.flag}</span>
                      <span className="font-medium">{curr.code}</span>
                      <span className="text-gray-400 text-xs">({curr.symbol})</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Discord Button */}
            <motion.a
              href="https://discord.gg/tKDRWYNcuE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="h-4 w-4" />
              Join Discord
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-blue-500/10"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                item.isLink ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => { setActiveItem(item.label); setIsMenuOpen(false) }}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeItem === item.label ? 'text-white bg-blue-600/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              {/* Mobile Currency */}
              <div className="px-4 py-3">
                <p className="text-gray-500 text-xs mb-2">Currency</p>
                <div className="flex gap-2">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => setCurrency(curr.code)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        currency === curr.code ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300'
                      }`}
                    >
                      <span>{curr.flag}</span>
                      <span>{curr.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <a 
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm py-3 px-4 rounded-lg mt-2"
              >
                <Sparkles className="h-4 w-4" />
                Join Discord
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
