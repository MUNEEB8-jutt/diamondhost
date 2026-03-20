'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Server, Eye, EyeOff, ExternalLink, CheckCircle, 
  Loader2, AlertCircle, Copy, Check, Mail, Key, Link as LinkIcon,
  ArrowLeft, RefreshCw, Ban
} from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useTheme } from '@/lib/ThemeContext'
import { getUserServers, UserServer } from '@/lib/supabase'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Background from '../components/Background'

export default function ServersPage() {
  const { user, loading: authLoading, setShowAuthModal } = useAuth()
  const { theme } = useTheme()
  const festive = theme === 'eid'
  const [servers, setServers] = useState<UserServer[]>([])
  const [loading, setLoading] = useState(true)
  const [revealedPasswords, setRevealedPasswords] = useState<Set<string>>(new Set())
  const [revealedEmails, setRevealedEmails] = useState<Set<string>>(new Set())
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadServers()
    } else if (!authLoading) {
      setLoading(false)
      setShowAuthModal(true)
    }
  }, [user, authLoading, setShowAuthModal])

  const loadServers = async () => {
    if (!user) return
    setLoading(true)
    const userServers = await getUserServers(user.id)
    setServers(userServers)
    setLoading(false)
  }

  const togglePassword = (serverId: string) => {
    setRevealedPasswords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(serverId)) {
        newSet.delete(serverId)
      } else {
        newSet.add(serverId)
      }
      return newSet
    })
  }

  const toggleEmail = (serverId: string) => {
    setRevealedEmails(prev => {
      const newSet = new Set(prev)
      if (newSet.has(serverId)) {
        newSet.delete(serverId)
      } else {
        newSet.add(serverId)
      }
      return newSet
    })
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Active
          </span>
        )
      case 'suspended':
        return (
          <span className="flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
            <Ban className="h-3 w-3" />
            Suspended
          </span>
        )
      case 'renewal_required':
        return (
          <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-medium">
            <RefreshCw className="h-3 w-3" />
            Renewal Required
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Not logged in
  if (!authLoading && !user) {
    return (
      <>
        <Background />
        <Navbar />
        <main className="site-shell relative z-10 min-h-screen px-4 pb-16 pt-28">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="theme-panel-strong rounded-[28px] p-8 text-center"
            >
              <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${
                festive
                  ? 'bg-gradient-to-br from-[#0f3d2e] via-[#185742] to-[#d4af37] text-[#fff8ea]'
                  : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
              }`}>
                <Server className="h-10 w-10 text-white" />
              </div>
              <h1 className="theme-heading text-2xl uppercase">My Game Servers</h1>
              <p className="theme-copy mb-6 mt-3">
                Please login to view your game servers
              </p>
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="theme-button-primary !rounded-xl px-8 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login / Sign Up
              </motion.button>
            </motion.div>
          </div>
        </main>
      </>
    )
  }

  // Loading
  if (loading || authLoading) {
    return (
      <>
        <Background />
        <Navbar />
        <main className="site-shell relative z-10 flex min-h-screen items-center justify-center px-4 pb-16 pt-28">
          <Loader2 className={`h-10 w-10 animate-spin ${festive ? 'text-[var(--theme-highlight)]' : 'text-cyan-400'}`} />
        </main>
      </>
    )
  }

  const activeServers = servers.filter(s => s.status === 'active')
  const suspendedServers = servers.filter(s => s.status === 'suspended' || s.status === 'renewal_required')

  return (
    <>
      <Background />
      <Navbar />
      <main className="site-shell relative z-10 min-h-screen px-4 pb-16 pt-28">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="theme-link transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <div className="flex items-center gap-3">
                <Server className={`h-6 w-6 ${festive ? 'text-[var(--theme-highlight)]' : 'text-cyan-400'}`} />
                <h1 className="theme-heading text-2xl uppercase">
                  <span className="text-white">My Game </span>
                  <span className={festive ? 'theme-heading-accent' : 'text-cyan-400'}>Servers</span>
                </h1>
              </div>
            </div>
            <p className="theme-copy">Manage your game servers</p>
          </motion.div>

          {/* No Servers */}
          {servers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="theme-panel-strong rounded-[28px] p-12 text-center"
            >
              <Server className="mx-auto mb-4 h-16 w-16 text-gray-600" />
              <h2 className="theme-heading-tight mb-2 text-xl">No Servers Available</h2>
              <p className="theme-copy mb-6">You don't have any game servers yet. Purchase a plan to get started!</p>
              <Link href="/#plans">
                <motion.button
                  className="theme-button-primary !rounded-xl px-8 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse Plans
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Active Servers */}
          {activeServers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className={`mb-4 flex items-center gap-2 text-lg font-semibold ${festive ? 'text-[var(--theme-highlight)]' : 'text-green-400'}`}>
                <CheckCircle className="h-5 w-5" />
                Active Servers ({activeServers.length})
              </h2>
              <div className="space-y-4">
                {activeServers.map((server) => (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`theme-panel-strong overflow-hidden rounded-[28px] p-6 ${
                      festive ? 'border-[#d4af37]/25' : 'border border-green-500/30'
                    }`}
                  >
                    {/* Server Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`font-mono text-sm ${festive ? 'text-[var(--theme-highlight)]' : 'text-cyan-400'}`}>{server.server_id}</span>
                          {getStatusBadge(server.status)}
                        </div>
                        <h3 className="theme-heading-tight text-lg">{server.plan_name}</h3>
                        <p className="text-gray-400 text-sm">{server.plan_ram} • {server.location} • {server.processor}</p>
                      </div>
                      <div className="text-right">
                        {server.expires_at && (
                          <p className="text-green-400 text-sm">Expires: {formatDate(server.expires_at)}</p>
                        )}
                        <p className="text-gray-500 text-xs">Created: {formatDate(server.created_at)}</p>
                      </div>
                    </div>

                    {/* Server Credentials */}
                    <div className="theme-panel-soft rounded-xl p-4">
                      <h4 className="theme-heading-tight mb-4 flex items-center gap-2 text-base">
                        <Key className={`h-4 w-4 ${festive ? 'text-[var(--theme-highlight)]' : 'text-cyan-400'}`} />
                        Server Credentials
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Panel Link */}
                        <div className="theme-panel-soft rounded-lg p-3">
                          <p className="theme-copy mb-1 flex items-center gap-1 text-xs">
                            <LinkIcon className="h-3 w-3" />
                            Panel Link
                          </p>
                          <div className="flex items-center gap-2">
                            <a 
                              href={server.panel_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="theme-link flex-1 truncate text-sm"
                            >
                              {server.panel_link}
                            </a>
                            <motion.button
                              onClick={() => window.open(server.panel_link, '_blank')}
                              className="theme-panel-soft rounded-lg p-1.5 text-[var(--theme-highlight)] transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Panel Password */}
                        <div className="theme-panel-soft rounded-lg p-3">
                          <p className="theme-copy mb-1 flex items-center gap-1 text-xs">
                            <Key className="h-3 w-3" />
                            Panel Password
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-mono flex-1 truncate">
                              {revealedPasswords.has(server.server_id) ? server.panel_password : '••••••••'}
                            </span>
                            <motion.button
                              onClick={() => togglePassword(server.server_id)}
                              className="theme-panel-soft rounded-lg p-1.5 text-gray-300 transition-colors hover:text-white"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {revealedPasswords.has(server.server_id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </motion.button>
                            <motion.button
                              onClick={() => copyToClipboard(server.panel_password, `pass-${server.server_id}`)}
                              className="theme-panel-soft rounded-lg p-1.5 text-gray-300 transition-colors hover:text-white"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {copiedField === `pass-${server.server_id}` ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                            </motion.button>
                          </div>
                        </div>

                        {/* Panel Gmail */}
                        <div className="theme-panel-soft rounded-lg p-3">
                          <p className="theme-copy mb-1 flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3" />
                            Panel Email
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-mono flex-1 truncate">
                              {revealedEmails.has(server.server_id) ? server.panel_gmail : '••••••••@••••'}
                            </span>
                            <motion.button
                              onClick={() => toggleEmail(server.server_id)}
                              className="theme-panel-soft rounded-lg p-1.5 text-gray-300 transition-colors hover:text-white"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {revealedEmails.has(server.server_id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </motion.button>
                            <motion.button
                              onClick={() => copyToClipboard(server.panel_gmail, `email-${server.server_id}`)}
                              className="theme-panel-soft rounded-lg p-1.5 text-gray-300 transition-colors hover:text-white"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {copiedField === `email-${server.server_id}` ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Open Panel Button */}
                      <motion.a
                        href={server.panel_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={festive ? 'theme-button-primary mt-4 flex w-full items-center justify-center gap-2 !rounded-xl' : 'mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2'}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <ExternalLink className="h-5 w-5" />
                        Open Panel
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Suspended / Renewal Required Servers */}
          {suspendedServers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-400">
                <AlertCircle className="h-5 w-5" />
                Suspended / Renewal Required ({suspendedServers.length})
              </h2>
              <div className="space-y-4">
                {suspendedServers.map((server) => (
                  <motion.div
                    key={server.id}
                    className="theme-panel rounded-[28px] border border-amber-500/30 p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-cyan-400 font-mono text-sm">{server.server_id}</span>
                          {getStatusBadge(server.status)}
                        </div>
                        <h3 className="text-white font-bold text-lg">{server.plan_name}</h3>
                        <p className="text-gray-400 text-sm">{server.plan_ram} • {server.location} • {server.processor}</p>
                      </div>
                      <div className="text-right">
                        {server.expires_at && (
                          <p className="text-red-400 text-sm">Expired: {formatDate(server.expires_at)}</p>
                        )}
                        <p className="text-gray-500 text-xs">Created: {formatDate(server.created_at)}</p>
                      </div>
                    </div>
                    
                    {/* Suspension Reason */}
                    <div className="mt-4 bg-amber-500/10 rounded-lg p-4 text-amber-400 text-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="font-semibold">
                          {server.status === 'renewal_required' ? 'Renewal Required' : 'Server Suspended'}
                        </span>
                      </div>
                      <p className="text-amber-300/80">
                        {server.suspension_reason || 'Please contact support for more information.'}
                      </p>
                      <Link href="/support" className="inline-block mt-3">
                        <motion.button
                          className="theme-button-secondary !rounded-lg px-6 py-2 text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Contact Support
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}
