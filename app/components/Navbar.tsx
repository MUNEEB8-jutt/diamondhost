'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle, Home, Package, Zap, Loader2, Server, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCurrency } from '@/lib/CurrencyContext'
import { useAuth } from '@/lib/AuthContext'
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

// SVG Flag Components - Circular style (bigger)
const USFlag = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 rounded-full shadow-sm flex-shrink-0">
    <defs>
      <clipPath id="usCircle">
        <circle cx="50" cy="50" r="48" />
      </clipPath>
    </defs>
    <g clipPath="url(#usCircle)">
      <rect width="100" height="100" fill="#B22234"/>
      <rect y="7.7" width="100" height="7.7" fill="white"/>
      <rect y="23.1" width="100" height="7.7" fill="white"/>
      <rect y="38.5" width="100" height="7.7" fill="white"/>
      <rect y="53.8" width="100" height="7.7" fill="white"/>
      <rect y="69.2" width="100" height="7.7" fill="white"/>
      <rect y="84.6" width="100" height="7.7" fill="white"/>
      <rect width="40" height="53.8" fill="#3C3B6E"/>
    </g>
    <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
  </svg>
)

const INFlag = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 rounded-full shadow-sm flex-shrink-0">
    <defs>
      <clipPath id="inCircle">
        <circle cx="50" cy="50" r="48" />
      </clipPath>
    </defs>
    <g clipPath="url(#inCircle)">
      <rect width="100" height="33.33" fill="#FF9933"/>
      <rect y="33.33" width="100" height="33.33" fill="white"/>
      <rect y="66.66" width="100" height="33.34" fill="#138808"/>
      <circle cx="50" cy="50" r="10" fill="none" stroke="#000080" strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="3" fill="#000080"/>
    </g>
    <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
  </svg>
)

const PKFlag = () => (
  <svg viewBox="0 0 100 100" className="w-7 h-7 rounded-full shadow-sm flex-shrink-0">
    <defs>
      <clipPath id="pkCircle">
        <circle cx="50" cy="50" r="48" />
      </clipPath>
    </defs>
    <g clipPath="url(#pkCircle)">
      <rect width="100" height="100" fill="#01411C"/>
      <rect width="25" height="100" fill="white"/>
      <circle cx="58" cy="50" r="16" fill="white"/>
      <circle cx="63" cy="50" r="13" fill="#01411C"/>
      <path d="M72 35 L75 44 L84 44 L77 50 L80 59 L72 53 L64 59 L67 50 L60 44 L69 44 Z" fill="white"/>
    </g>
    <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
  </svg>
)

type CurrencyCode = 'USD' | 'INR' | 'PKR'

const currencies = [
  { code: 'PKR' as CurrencyCode, symbol: 'Rs', Flag: PKFlag },
  { code: 'USD' as CurrencyCode, symbol: '$', Flag: USFlag },
  { code: 'INR' as CurrencyCode, symbol: '₹', Flag: INFlag },
]

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plans', label: 'Plans', icon: Package },
  { href: '/features', label: 'Features', icon: Zap },
  { href: '/servers', label: 'My Servers', icon: Server },
  { href: '/support', label: 'Support', icon: MessageCircle },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loadingPath, setLoadingPath] = useState<string | null>(null)
  const { currency, setCurrency } = useCurrency()
  const { user, logout, setShowAuthModal } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const currentCurrency = currencies.find(c => c.code === currency)
  const CurrentFlag = currentCurrency?.Flag

  useEffect(() => {
    setLoadingPath(null)
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      setCurrencyOpen(false)
      setUserMenuOpen(false)
    }
    if (currencyOpen || userMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [currencyOpen, userMenuOpen])

  const handleNavClick = (href: string) => {
    if (pathname !== href) {
      setLoadingPath(href)
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
        scrolled
          ? 'bg-[#070b14]/95 backdrop-blur-xl shadow-lg shadow-cyan-500/5 border-b border-cyan-500/10'
          : 'bg-[#070b14]/80 backdrop-blur-xl border-b border-blue-500/10'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <DiamondLogo />
            </motion.div>
            <span className="font-orbitron text-lg md:text-xl font-bold tracking-wide">
              <span className="text-blue-400">DIAMOND</span>
              <span className="text-white">HOST</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 backdrop-blur-sm rounded-full px-2 py-1.5 border border-slate-700/50">
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
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector - Premium Style */}
            <div className="relative">
              <motion.button
                onClick={(e) => { e.stopPropagation(); setCurrencyOpen(!currencyOpen); setUserMenuOpen(false) }}
                className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 text-white py-2.5 px-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.03, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                {CurrentFlag && <CurrentFlag />}
                <span className="font-semibold text-sm">{currency}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 bg-slate-900/98 backdrop-blur-xl border border-slate-600/50 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[160px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {currencies.map((curr) => {
                      const FlagIcon = curr.Flag
                      return (
                        <motion.button
                          key={curr.code}
                          onClick={() => { setCurrency(curr.code); setCurrencyOpen(false) }}
                          className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all ${
                            currency === curr.code ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700/80'
                          }`}
                          whileHover={{ x: 2 }}
                        >
                          <FlagIcon />
                          <span className="font-medium">{curr.code}</span>
                        </motion.button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu / Login Button */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); setCurrencyOpen(false) }}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 border border-cyan-500/30 text-white text-sm py-2 px-3 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-cyan-500/30">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium max-w-[80px] truncate">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl overflow-hidden shadow-xl z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-3 border-b border-slate-700/50 bg-gradient-to-r from-cyan-600/10 to-blue-600/10">
                        <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                        <p className="text-gray-400 text-xs truncate">{user.email}</p>
                      </div>
                      <motion.button
                        onClick={() => { handleNavClick('/servers'); setUserMenuOpen(false) }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all"
                        whileHover={{ x: 3 }}
                      >
                        <Server className="h-4 w-4 text-cyan-400" />
                        My Game Servers
                      </motion.button>
                      <motion.button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                        whileHover={{ x: 3 }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-gray-300 p-2 rounded-xl hover:bg-slate-800/50 border border-slate-700/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-slate-700/50 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  const isLoading = loadingPath === item.href
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Icon className="h-5 w-5" />}
                      {item.label}
                    </motion.button>
                  )
                })}

                {/* User Section - Mobile */}
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  {user ? (
                    <div className="px-4">
                      <div className="flex items-center gap-3 mb-3 p-3 bg-slate-800/50 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{user.name}</p>
                          <p className="text-gray-500 text-xs truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => logout()}
                        className="flex items-center gap-2 text-red-400 text-sm w-full px-3 py-2 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => setShowAuthModal(true)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm py-3 px-4 rounded-xl mx-4"
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="h-4 w-4" /> Login / Sign Up
                    </motion.button>
                  )}
                </div>

                {/* Currency - Mobile with Flags */}
                <div className="px-4 py-3 mt-2">
                  <p className="text-gray-500 text-xs mb-2 font-medium">Currency</p>
                  <div className="flex gap-2">
                    {currencies.map((curr) => {
                      const FlagIcon = curr.Flag
                      return (
                        <button
                          key={curr.code}
                          onClick={() => setCurrency(curr.code)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                            currency === curr.code
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                          }`}
                        >
                          <FlagIcon />
                          <span>{curr.code}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
