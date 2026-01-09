'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, Send, Plus, LogOut, User, Mail, Lock, Eye, EyeOff,
  Loader2, Ticket, Clock, X, Image as ImageIcon, CheckCircle, AlertCircle,
  ArrowLeft, Home
} from 'lucide-react'
import { 
  registerUser, loginUser, getUserById, createTicket, getUserTickets, 
  getTicketMessages, sendTicketMessage, updateTicketStatus, uploadTicketImage,
  subscribeToTicketMessages, SupportUser, SupportTicket, TicketMessage 
} from '@/lib/supabase'
import Link from 'next/link'

type View = 'auth' | 'tickets' | 'chat' | 'create'

export default function SupportPage() {
  // Auth state
  const [user, setUser] = useState<SupportUser | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' })

  // View state
  const [view, setView] = useState<View>('auth')
  const [loading, setLoading] = useState(true)

  // Tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [messages, setMessages] = useState<TicketMessage[]>([])

  // Chat state
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Create ticket state
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '' })
  const [creating, setCreating] = useState(false)

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
      const savedUserId = localStorage.getItem('support_user_id')
      if (savedUserId) {
        const userData = await getUserById(savedUserId)
        if (userData) {
          setUser(userData)
          setView('tickets')
          const userTickets = await getUserTickets(savedUserId)
          setTickets(userTickets)
        } else {
          localStorage.removeItem('support_user_id')
        }
      }
      setLoading(false)
    }
    checkSession()
  }, [])

  // Subscribe to realtime messages + polling fallback
  useEffect(() => {
    if (selectedTicket?.ticket_id) {
      // Realtime subscription
      const channel = subscribeToTicketMessages(selectedTicket.ticket_id, (newMsg) => {
        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(m => m.id === newMsg.id)) return prev
          return [...prev, newMsg]
        })
      })

      // Polling fallback every 3 seconds
      const pollInterval = setInterval(async () => {
        const msgs = await getTicketMessages(selectedTicket.ticket_id)
        setMessages(msgs)
      }, 3000)

      return () => { 
        channel.unsubscribe()
        clearInterval(pollInterval)
      }
    }
  }, [selectedTicket?.ticket_id])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB')
        return
      }
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Auth handlers
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')

    if (authMode === 'signup') {
      if (!authForm.name.trim()) {
        setAuthError('Name is required')
        setAuthLoading(false)
        return
      }
      const { user: newUser, error } = await registerUser(authForm.email, authForm.password, authForm.name)
      if (error) {
        setAuthError(error)
        setAuthLoading(false)
        return
      }
      if (newUser) {
        localStorage.setItem('support_user_id', newUser.id)
        setUser(newUser)
        setView('tickets')
      }
    } else {
      const { user: loggedUser, error } = await loginUser(authForm.email, authForm.password)
      if (error) {
        setAuthError(error)
        setAuthLoading(false)
        return
      }
      if (loggedUser) {
        localStorage.setItem('support_user_id', loggedUser.id)
        setUser(loggedUser)
        const userTickets = await getUserTickets(loggedUser.id)
        setTickets(userTickets)
        setView('tickets')
      }
    }
    setAuthLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('support_user_id')
    setUser(null)
    setView('auth')
    setTickets([])
    setSelectedTicket(null)
    setMessages([])
    setAuthForm({ email: '', password: '', name: '' })
  }

  // Ticket handlers
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !ticketForm.subject.trim() || !ticketForm.message.trim()) return
    
    setCreating(true)
    const { ticket, error } = await createTicket(user.id, user.name, user.email, ticketForm.subject, ticketForm.message)
    if (ticket) {
      setTickets(prev => [ticket, ...prev])
      setTicketForm({ subject: '', message: '' })
      setView('tickets')
    }
    setCreating(false)
  }

  const handleSelectTicket = async (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
    const msgs = await getTicketMessages(ticket.ticket_id)
    setMessages(msgs)
    setView('chat')
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!newMessage.trim() && !selectedImage) || !selectedTicket || !user) return

    setSending(true)
    let imageUrl: string | null = null

    if (selectedImage) {
      imageUrl = await uploadTicketImage(selectedImage, selectedTicket.ticket_id)
    }

    await sendTicketMessage(
      selectedTicket.ticket_id, 
      'customer', 
      user.name, 
      newMessage.trim() || null, 
      imageUrl
    )
    
    setNewMessage('')
    clearImage()
    setSending(false)
  }

  const handleCloseTicket = async () => {
    if (!selectedTicket) return
    if (confirm('Are you sure you want to close this ticket?')) {
      const success = await updateTicketStatus(selectedTicket.ticket_id, 'closed')
      if (success) {
        setSelectedTicket({ ...selectedTicket, status: 'closed' })
        setTickets(prev => prev.map(t => 
          t.ticket_id === selectedTicket.ticket_id ? { ...t, status: 'closed' } : t
        ))
      }
    }
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'resolved': return 'bg-blue-500/20 text-blue-400'
      case 'closed': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0c1929] to-[#070b14]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-blue-500/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <Home className="h-5 w-5" />
            </Link>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-cyan-400" />
              <h1 className="text-xl font-bold text-white">Support Center</h1>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-white font-medium text-sm">{user.name}</p>
                <p className="text-gray-500 text-xs">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Auth View */}
          {view === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {authMode === 'login' ? 'Sign in to access your tickets' : 'Sign up to create support tickets'}
                  </p>
                </div>

                {authError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          type="text"
                          value={authForm.name}
                          onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                      <input
                        type="email"
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authForm.password}
                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                        minLength={6}
                        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {authLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      authMode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    <button
                      onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError('') }}
                      className="text-cyan-400 hover:text-cyan-300 ml-1 font-medium"
                    >
                      {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tickets List View */}
          {view === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">My Tickets</h2>
                <motion.button
                  onClick={() => setView('create')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="h-5 w-5" />
                  New Ticket
                </motion.button>
              </div>

              {tickets.length === 0 ? (
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-12 text-center">
                  <Ticket className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Tickets Yet</h3>
                  <p className="text-gray-400 mb-6">Create your first support ticket to get help</p>
                  <motion.button
                    onClick={() => setView('create')}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Plus className="h-5 w-5" />
                    Create Ticket
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <motion.button
                      key={ticket.id}
                      onClick={() => handleSelectTicket(ticket)}
                      className="w-full text-left bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:border-blue-500/30 p-5 transition-all"
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-cyan-400 font-mono text-sm">{ticket.ticket_id}</span>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{ticket.subject}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Created: {formatDate(ticket.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated: {formatDate(ticket.updated_at)}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Create Ticket View */}
          {view === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => setView('tickets')}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Tickets
              </button>

              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Ticket className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Create New Ticket</h2>
                  <p className="text-gray-400 text-sm">Describe your issue and we'll help you out</p>
                </div>

                <form onSubmit={handleCreateTicket} className="space-y-5">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Subject</label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder="What do you need help with?"
                      required
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Message</label>
                    <textarea
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      placeholder="Describe your issue in detail..."
                      required
                      rows={6}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={creating}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {creating ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Ticket className="h-5 w-5" />
                        Create Ticket
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Chat View */}
          {view === 'chat' && selectedTicket && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => { setView('tickets'); setSelectedTicket(null); setMessages([]) }}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Tickets
              </button>

              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 overflow-hidden flex flex-col h-[calc(100vh-250px)]">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-cyan-400 font-mono">{selectedTicket.ticket_id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold">{selectedTicket.subject}</h3>
                  </div>
                  {selectedTicket.status !== 'closed' && (
                    <motion.button
                      onClick={handleCloseTicket}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="h-4 w-4" />
                      Close Ticket
                    </motion.button>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => {
                    const isCustomer = msg.sender_type === 'customer'
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[75%] ${isCustomer ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-end gap-2 ${isCustomer ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isCustomer ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                            } text-white`}>
                              {isCustomer ? user?.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div className={`rounded-2xl px-4 py-3 ${
                              isCustomer 
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-md' 
                                : 'bg-slate-800 text-gray-200 rounded-bl-md'
                            }`}>
                              {msg.image_url && (
                                <a href={msg.image_url} target="_blank" rel="noopener noreferrer" className="block mb-2">
                                  <img src={msg.image_url} alt="Attachment" className="max-w-[300px] rounded-lg" />
                                </a>
                              )}
                              {msg.message && <p className="text-sm whitespace-pre-wrap">{msg.message}</p>}
                            </div>
                          </div>
                          <p className={`text-[10px] text-gray-500 mt-1 ${isCustomer ? 'text-right mr-10' : 'ml-10'}`}>
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {selectedTicket.status !== 'closed' ? (
                  <div className="p-4 border-t border-slate-700/50">
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mb-3 relative inline-block">
                        <img src={imagePreview} alt="Preview" className="h-20 rounded-lg" />
                        <button
                          onClick={clearImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <motion.button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white p-3 rounded-xl transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ImageIcon className="h-5 w-5" />
                      </motion.button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                      <motion.button
                        type="submit"
                        disabled={sending || (!newMessage.trim() && !selectedImage)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </motion.button>
                    </form>
                  </div>
                ) : (
                  <div className="p-4 border-t border-slate-700/50 text-center">
                    <p className="text-gray-500 flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      This ticket has been closed
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
