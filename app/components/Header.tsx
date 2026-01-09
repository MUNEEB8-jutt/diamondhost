'use client'

import { motion } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown, MessageCircle, Home, Package, Zap, Star, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCurrency } from '@/lib/CurrencyContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

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

type CurrencyCode = 'USD' | 'INR' | 'PKR'

const currencies: { code: CurrencyCode; symbol: string; flag: string }[] = [
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'PKR', symbol: 'Rs', flag: '🇵🇰' },
]

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plans', label: 'Plans', icon: Package },
  { href: '/features', label: 'Features', icon: Zap },
  { href: '/reviews', label: 'Reviews', icon: Star },
  { href: '/support', label: 'Support', icon: MessageCircle },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loadingPath, setLoadingPath] = useState<string | null>(null)
  const { currency, setCurrency } = useCurrency()
  const pathname = usePathname()
  const router = useRouter()

  const currentCurrency = currencies.find(c => c.code === currency)

  // Reset loading when pathname changes
  useEffect(() => {
    setLoadingPath(null)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    if (pathname !== href) {
      setLoadingPath(href)
      // Dispatch custom event for loading overlay
      window.dispatchEvent(new CustomEvent('navigation-start'))
      router.push(href)
    }
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#070b14]/95 backdrop-blur-xl shadow-lg shadow-blue-500/5' : 'bg-[#070b14]/80 backdrop-blur-xl'
      } border-b border-blue-500/10`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DiamondLogo />
            </motion.div>
            <span className="font-orbitron text-base md:text-lg font-bold tracking-wide">
              <span className="text-blue-400">DIAMOND</span>
              <span className="text-white">HOST</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-slate-700/50">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const isLoading = loadingPath === item.href
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navBg"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 relative z-10 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4 relative z-10" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <motion.button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 text-white text-sm py-2 px-3 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{currentCurrency?.flag}</span>
                <span className="font-medium">{currency}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${currencyOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {currencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-600/50 rounded-xl overflow-hidden shadow-xl z-50"
                >
                  {currencies.map((curr) => (
                    <motion.button
                      key={curr.code}
                      onClick={() => { setCurrency(curr.code); setCurrencyOpen(false) }}
                      className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-all ${
                        currency === curr.code ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
                      }`}
                      whileHover={{ x: 3 }}
                    >
                      <span>{curr.flag}</span>
                      <span className="font-medium">{curr.code}</span>
                      <span className="text-gray-400 text-xs">({curr.symbol})</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.a
              href="https://discord.gg/tKDRWYNcuE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden xl:inline">Join Discord</span>
              <span className="xl:hidden">Discord</span>
            </motion.a>
          </div>

          <motion.button 
            className="lg:hidden text-gray-300 p-2 rounded-lg hover:bg-slate-800/50" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden py-4 border-t border-blue-500/10"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                const isLoading = loadingPath === item.href
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => { handleNavClick(item.href); setIsMenuOpen(false) }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                      {item.label}
                    </button>
                  </motion.div>
                )
              })}
              
              <motion.div className="px-4 py-3 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <p className="text-gray-500 text-xs mb-2">Currency</p>
                <div className="flex gap-2">
                  {currencies.map((curr) => (
                    <motion.button
                      key={curr.code}
                      onClick={() => setCurrency(curr.code)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        currency === curr.code 
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                          : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{curr.flag}</span>
                      <span>{curr.code}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.a 
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm py-3 px-4 rounded-xl mt-2 mx-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="h-4 w-4" />
                Join Discord
              </motion.a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
