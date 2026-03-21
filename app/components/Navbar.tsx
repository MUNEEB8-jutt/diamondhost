'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Home,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  MoonStar,
  Package,
  Server,
  User,
  X,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { useCurrency } from '@/lib/CurrencyContext'
import { useTheme } from '@/lib/ThemeContext'

type CurrencyCode = 'USD' | 'INR' | 'PKR'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plans', label: 'Plans', icon: Package },
  { href: '/features', label: 'Features', icon: Zap },
  { href: '/servers', label: 'My Servers', icon: Server },
  { href: '/support', label: 'Support', icon: MessageCircle },
]

const currencies = [
  { code: 'PKR' as CurrencyCode, label: 'PKR', emoji: 'PK' },
  { code: 'USD' as CurrencyCode, label: 'USD', emoji: 'US' },
  { code: 'INR' as CurrencyCode, label: 'INR', emoji: 'IN' },
]

function FlagChip({ code }: { code: string }) {
  const palette =
    code === 'PK'
      ? ['#115e3b', '#f8fafc']
      : code === 'IN'
        ? ['#f97316', '#f8fafc', '#16a34a']
        : ['#1d4ed8', '#ef4444', '#f8fafc']

  return (
    <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/20">
      <span
        className="absolute inset-0"
        style={{
          background:
            palette.length === 2
              ? `linear-gradient(90deg, ${palette[1]} 0 28%, ${palette[0]} 28% 100%)`
              : `linear-gradient(180deg, ${palette[0]} 0 33%, ${palette[1]} 33% 66%, ${palette[2]} 66% 100%)`,
        }}
      />
      <span className="relative text-[10px] font-semibold tracking-[0.16em] text-slate-900">{code}</span>
    </span>
  )
}

function DiamondLogo({ festive }: { festive: boolean }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 56 56" className="h-11 w-11 drop-shadow-[0_12px_26px_rgba(0,0,0,0.22)]">
        <defs>
          <linearGradient id="logoPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={festive ? '#0F3D2E' : '#38bdf8'} />
            <stop offset="100%" stopColor={festive ? '#D4AF37' : '#2563eb'} />
          </linearGradient>
          <linearGradient id="logoSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={festive ? '#f7e7ce' : '#bfdbfe'} />
            <stop offset="100%" stopColor={festive ? '#d4af37' : '#67e8f9'} />
          </linearGradient>
        </defs>
        <polygon points="28,4 49,18 49,38 28,52 7,38 7,18" fill="url(#logoPrimary)" />
        <polygon points="28,4 49,18 28,24 7,18" fill="url(#logoSecondary)" opacity="0.92" />
        <polygon points="28,24 49,18 49,38 28,52" fill={festive ? '#8f6b18' : '#2563eb'} opacity="0.76" />
        <polygon points="28,24 7,18 7,38 28,52" fill={festive ? '#0a2c21' : '#1d4ed8'} opacity="0.72" />
      </svg>
      {festive && (
        <span className="absolute -right-1 -top-1 rounded-full border border-[#f7e7ce]/70 bg-[#06140f] p-1 text-[#f7e7ce] shadow-[0_8px_20px_rgba(212,175,55,0.22)]">
          <MoonStar className="h-3 w-3" />
        </span>
      )}
    </div>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loadingPath, setLoadingPath] = useState<string | null>(null)
  const { currency, setCurrency } = useCurrency()
  const { user, logout, setShowAuthModal } = useAuth()
  const { theme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  const festive = theme === 'eid'
  const currentCurrency = currencies.find((item) => item.code === currency)

  useEffect(() => {
    setLoadingPath(null)
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
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
    if (pathname === href) {
      setIsMenuOpen(false)
      return
    }

    setLoadingPath(href)
    window.dispatchEvent(new CustomEvent('navigation-start'))
    router.push(href)
  }

  const shellClass = festive
    ? `border-[#d4af37]/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(6,20,15,0.82))] shadow-[0_28px_85px_rgba(0,0,0,0.34)] ${scrolled ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'}`
    : `border-cyan-500/15 bg-[rgba(7,24,39,0.72)] shadow-[0_24px_70px_rgba(2,132,199,0.12)] ${scrolled ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'}`

  const navPillClass = festive
    ? 'border border-[#d4af37]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]'
    : 'border border-cyan-500/10 bg-slate-900/55'

  const activeNavClass = festive
    ? 'bg-gradient-to-r from-[#0f3d2e] via-[#145842] to-[#d4af37] text-[#fff8ea] shadow-[0_14px_28px_rgba(212,175,55,0.26)] ring-1 ring-[#f7e7ce]/18'
    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_12px_24px_rgba(34,211,238,0.2)]'

  const hoverTextClass = festive
    ? 'text-[#d7ccb7] hover:bg-white/5 hover:text-[#f7e7ce]'
    : 'text-gray-400 hover:text-white'

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="fixed inset-x-0 top-0 z-50 px-3 md:px-4"
    >
      <div className={`relative mx-auto mt-3 max-w-7xl overflow-hidden rounded-[30px] border ${shellClass}`}>
        <div className="pointer-events-none absolute inset-x-0 top-3 mx-auto h-[74px] max-w-7xl overflow-hidden rounded-[30px]">
          <div className={`absolute inset-x-10 top-0 h-px ${festive ? 'bg-gradient-to-r from-transparent via-[#f7e7ce]/45 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent'}`} />
          <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${festive ? 'bg-[#d4af37]/14' : 'bg-cyan-400/10'} blur-3xl`} />
        </div>
        <div className="flex h-[74px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <DiamondLogo festive={festive} />
              <div className="leading-none">
                <p
                  className={`text-base font-semibold uppercase tracking-[0.28em] ${festive ? 'text-[#f7e7ce]' : 'text-white'}`}
                  style={{ fontFamily: festive ? 'var(--font-playfair), serif' : "'Russo One', sans-serif" }}
                >
                  DiamondHost
                </p>
                <p className={`mt-1 text-[10px] uppercase tracking-[0.3em] ${festive ? 'text-[#d4af37]' : 'text-cyan-300/80'}`}>
                  {festive ? 'Eid Sale' : 'Premium Hosting'}
                </p>
              </div>
            </Link>
            {festive && (
              <div className="hidden items-center gap-2 xl:flex">
                <span className="rounded-full border border-[#d4af37]/30 bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f7e7ce]">
                  Eid Sale Live
                </span>
              </div>
            )}
          </div>

          <nav className={`hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex ${navPillClass}`}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const isLoading = loadingPath === item.href

              return (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive ? activeNavClass : hoverTextClass
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </motion.button>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <motion.button
                onClick={(event) => {
                  event.stopPropagation()
                  setCurrencyOpen((open) => !open)
                  setUserMenuOpen(false)
                }}
                className={`flex items-center gap-3 rounded-full border px-3 py-2 ${festive ? 'border-[#d4af37]/30 bg-[rgba(255,255,255,0.05)] text-[#f7e7ce]' : 'border-cyan-500/15 bg-slate-900/55 text-white'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FlagChip code={currentCurrency?.emoji || 'PK'} />
                <span className="text-sm font-medium">{currentCurrency?.label || currency}</span>
              </motion.button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    className={`absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border p-2 ${festive ? 'border-[#d4af37]/30 bg-[rgba(8,20,14,0.96)]' : 'border-cyan-500/15 bg-slate-900/95'}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {currencies.map((entry) => (
                      <button
                        key={entry.code}
                        onClick={() => {
                          setCurrency(entry.code)
                          setCurrencyOpen(false)
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-all ${
                          currency === entry.code
                            ? festive
                              ? 'bg-gradient-to-r from-[#0f3d2e] to-[#d4af37] text-white'
                              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                            : festive
                              ? 'text-[#d7ccb7] hover:bg-white/5 hover:text-[#f7e7ce]'
                              : 'text-gray-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <FlagChip code={entry.emoji} />
                        {entry.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="relative">
                <motion.button
                  onClick={(event) => {
                    event.stopPropagation()
                    setUserMenuOpen((open) => !open)
                    setCurrencyOpen(false)
                  }}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 ${festive ? 'border-[#d4af37]/30 bg-[rgba(255,255,255,0.05)] text-[#f7e7ce]' : 'border-cyan-500/15 bg-slate-900/55 text-white'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${festive ? 'bg-gradient-to-br from-[#d4af37] to-[#8f6b18] text-[#06140f]' : 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white'}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[90px] truncate text-sm font-medium">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      className={`absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border ${festive ? 'border-[#d4af37]/30 bg-[rgba(8,20,14,0.96)]' : 'border-cyan-500/15 bg-slate-900/95'}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className={`border-b px-4 py-3 ${festive ? 'border-[#d4af37]/20 bg-[rgba(212,175,55,0.06)]' : 'border-slate-800/80 bg-slate-800/40'}`}>
                        <p className={`truncate text-sm font-semibold ${festive ? 'text-[#f7e7ce]' : 'text-white'}`}>{user.name}</p>
                        <p className={`truncate text-xs ${festive ? 'text-[#d7ccb7]' : 'text-gray-400'}`}>{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleNavClick('/servers')
                          setUserMenuOpen(false)
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${festive ? 'text-[#d7ccb7] hover:bg-white/5 hover:text-[#f7e7ce]' : 'text-gray-300 hover:bg-slate-800/70 hover:text-white'}`}
                      >
                        <Server className="h-4 w-4" />
                        My Game Servers
                      </button>
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="theme-button-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="h-4 w-4" />
                Login
              </motion.button>
            )}
          </div>

          <motion.button
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${festive ? 'border-[#d4af37]/30 bg-[rgba(255,255,255,0.05)] text-[#f7e7ce]' : 'border-cyan-500/15 bg-slate-900/55 text-white'}`}
            whileTap={{ scale: 0.94 }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`border-t px-4 pb-4 md:hidden ${festive ? 'border-[#d4af37]/20' : 'border-cyan-500/10'}`}
            >
              <div className="flex flex-col gap-2 pt-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  const isLoading = loadingPath === item.href

                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium ${
                        isActive
                          ? activeNavClass
                          : festive
                            ? 'theme-panel-soft text-[#f7e7ce]'
                            : 'theme-panel-soft text-white'
                      }`}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                      {item.label}
                    </button>
                  )
                })}

                <div className={`mt-2 rounded-2xl border p-3 ${festive ? 'border-[#d4af37]/20 bg-[rgba(255,255,255,0.04)]' : 'border-cyan-500/10 bg-slate-900/40'}`}>
                  <p className={`mb-3 text-xs uppercase tracking-[0.26em] ${festive ? 'text-[#d4af37]' : 'text-cyan-300/80'}`}>Currency</p>
                  <div className="flex gap-2">
                    {currencies.map((entry) => (
                      <button
                        key={entry.code}
                        onClick={() => setCurrency(entry.code)}
                        className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs ${
                          currency === entry.code
                            ? festive
                              ? 'bg-gradient-to-r from-[#0f3d2e] to-[#d4af37] text-white'
                              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                            : festive
                              ? 'bg-white/5 text-[#d7ccb7]'
                              : 'bg-slate-800 text-gray-300'
                        }`}
                      >
                        <FlagChip code={entry.emoji} />
                        {entry.label}
                      </button>
                    ))}
                  </div>
                </div>

                {user ? (
                  <div className={`rounded-2xl border p-4 ${festive ? 'border-[#d4af37]/20 bg-[rgba(255,255,255,0.04)]' : 'border-cyan-500/10 bg-slate-900/40'}`}>
                    <p className={`text-sm font-semibold ${festive ? 'text-[#f7e7ce]' : 'text-white'}`}>{user.name}</p>
                    <p className={`mt-1 text-xs ${festive ? 'text-[#d7ccb7]' : 'text-gray-400'}`}>{user.email}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleNavClick('/servers')}
                        className="theme-button-secondary flex-1 text-sm"
                      >
                        <Server className="h-4 w-4" />
                        Servers
                      </button>
                      <button
                        onClick={() => logout()}
                        className="theme-button-ghost flex-1 justify-center rounded-full border border-red-500/20 text-sm text-red-400 hover:border-red-500/40"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowAuthModal(true)} className="theme-button-primary w-full">
                    <User className="h-4 w-4" />
                    Login / Sign Up
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
