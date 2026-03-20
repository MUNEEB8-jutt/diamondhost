'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, Gamepad2, Lock, Mail, MoonStar, User, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { useTheme } from '@/lib/ThemeContext'
import { CrescentMoon, FestiveRibbon, StarField } from './FestiveDecor'

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, register } = useAuth()
  const { theme } = useTheme()
  const festive = theme === 'eid'
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      if (!form.name.trim()) {
        setError('Name is required')
        setLoading(false)
        return
      }

      const result = await register(form.email, form.password, form.name)
      if (!result.success) {
        setError(result.error || 'Registration failed')
      }
    } else {
      const result = await login(form.email, form.password)
      if (!result.success) {
        setError(result.error || 'Login failed')
      }
    }

    setLoading(false)
  }

  const handleClose = () => {
    setShowAuthModal(false)
    setError('')
    setForm({ email: '', password: '', name: '' })
  }

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22 }}
            className="theme-panel-strong relative w-full max-w-lg overflow-hidden rounded-[32px] p-8"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {festive && (
              <>
                <StarField className="opacity-45" count={7} />
                <div className="absolute right-8 top-10 h-16 w-16 opacity-80">
                  <CrescentMoon glow={false} />
                </div>
              </>
            )}

            <div className="relative z-10">
              {festive ? (
                <FestiveRibbon className="mb-5" label="Diamond Host Eid Sale" />
              ) : (
                <span className="theme-badge mb-5 text-xs">
                  <Gamepad2 className="h-4 w-4" />
                  Secure Access
                </span>
              )}

              <div className="mb-8 text-center">
                <div
                  className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] ${
                    festive
                      ? 'bg-gradient-to-br from-[#0f3d2e] to-[#d4af37] text-[#fff8ea]'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                  }`}
                >
                  {festive ? <MoonStar className="h-10 w-10" /> : <Gamepad2 className="h-10 w-10" />}
                </div>
                <h2 className="theme-heading text-3xl">
                  {mode === 'login'
                    ? festive
                      ? 'Welcome to Diamond Host'
                      : 'Welcome Back'
                    : festive
                      ? 'Create Your Diamond Host Account'
                      : 'Join DiamondHost'}
                </h2>
                <p className="theme-copy mt-3 text-sm leading-7">
                  {mode === 'login'
                    ? festive
                      ? 'Sign in to continue with Diamond Host and access the Eid sale experience.'
                      : 'Sign in to continue to your premium hosting dashboard.'
                    : festive
                      ? 'Create your Diamond Host account and launch a beautifully hosted world.'
                      : 'Create your account and start building your next server.'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="mb-2 block text-sm font-medium theme-copy">Full Name</label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--theme-muted)]" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        placeholder="Enter your name"
                        className="theme-input pl-12"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium theme-copy">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--theme-muted)]" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      placeholder="Enter your email"
                      required
                      className="theme-input pl-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium theme-copy">Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--theme-muted)]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(event) => setForm({ ...form, password: event.target.value })}
                      placeholder="Enter your password"
                      required
                      minLength={6}
                      className="theme-input pl-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--theme-muted)] transition-colors hover:text-[color:var(--theme-text)]"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="theme-button-primary mt-2 w-full justify-center rounded-[20px] py-4"
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-flex"
                      >
                        <MoonStar className="h-5 w-5" />
                      </motion.span>
                      Processing...
                    </>
                  ) : mode === 'login' ? (
                    festive ? 'Enter Diamond Host' : 'Sign In'
                  ) : festive ? (
                    'Create Diamond Host Account'
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center text-sm theme-copy">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login')
                    setError('')
                  }}
                  className="font-semibold theme-link"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
