'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, Send, Plus,
  Loader2, Ticket, Clock, X, Paperclip,
  ArrowLeft, Sparkles, Shield, Headphones
} from 'lucide-react'
import { 
  createTicket, getUserTickets, 
  getTicketMessages, sendTicketMessage, updateTicketStatus, uploadTicketImage,
  subscribeToTicketMessages, SupportTicket, TicketMessage 
} from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Background from '../components/Background'

type View = 'tickets' | 'chat' | 'create'

export default function SupportPage() {
  const { user, loading: authLoading, setShowAuthModal } = useAuth()
  
  // View state
  const [view, setView] = useState<View>('tickets')
  const [loading, setLoading] = useState(true)

  // Tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [messages, setMessages] = useState<TicketMessage[]>([])

  // Chat state
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<{ url: string; name: string; type: string; size: string } | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Create ticket state
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '' })
  const [creating, setCreating] = useState(false)

  // Load tickets when user is available
  useEffect(() => {
    if (user) {
      loadTickets()
    } else if (!authLoading) {
      setLoading(false)
      // Auto show login modal if not logged in
      setShowAuthModal(true)
    }
  }, [user, authLoading, setShowAuthModal])

  const loadTickets = async () => {
    if (!user) return
    setLoading(true)
    const userTickets = await getUserTickets(user.id)
    setTickets(userTickets)
    setLoading(false)
  }

  // Subscribe to realtime messages + polling fallback
  useEffect(() => {
    if (selectedTicket?.ticket_id) {
      const channel = subscribeToTicketMessages(selectedTicket.ticket_id, (newMsg) => {
        setMessages(prev => {
          if (prev.some(m => m.id === newMsg.id)) return prev
          return [...prev, newMsg]
        })
      })

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

  // Handle file selection (images + documents)
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadError(null)
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File must be less than 5MB')
        return
      }
      
      // Allowed file types
      const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      const documentTypes = [
        'text/plain', 
        'application/pdf',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar-compressed',
        'application/json',
        'text/csv',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      const allowedExtensions = ['.txt', '.pdf', '.zip', '.rar', '.json', '.csv', '.doc', '.docx', '.xls', '.xlsx', '.log', '.xml', '.yml', '.yaml', '.md']
      
      const isImage = imageTypes.includes(file.type)
      const isDocument = documentTypes.includes(file.type) || allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
      
      if (!isImage && !isDocument) {
        setUploadError('Allowed: Images (JPG, PNG, GIF, WEBP) or Files (TXT, PDF, ZIP, RAR, JSON, CSV, DOC, XLS)')
        return
      }
      
      // Format file size
      const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
      }
      
      setSelectedFile(file)
      setFilePreview({
        url: isImage ? URL.createObjectURL(file) : '',
        name: file.name,
        type: isImage ? 'image' : 'file',
        size: formatSize(file.size)
      })
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    setUploadError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
  
  // Get file icon based on extension
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf': return '📄'
      case 'zip': case 'rar': return '📦'
      case 'txt': case 'log': return '📝'
      case 'json': case 'xml': case 'yml': case 'yaml': return '⚙️'
      case 'doc': case 'docx': return '📃'
      case 'xls': case 'xlsx': case 'csv': return '📊'
      case 'md': return '📋'
      default: return '📎'
    }
  }

  // Ticket handlers
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !ticketForm.subject.trim() || !ticketForm.message.trim()) return
    
    setCreating(true)
    const { ticket } = await createTicket(user.id, user.name, user.email, ticketForm.subject, ticketForm.message)
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
    if ((!newMessage.trim() && !selectedFile) || !selectedTicket || !user) return

    setSending(true)
    setUploadError(null)
    let fileUrl: string | null = null

    if (selectedFile) {
      setUploading(true)
      try {
        fileUrl = await uploadTicketImage(selectedFile, selectedTicket.ticket_id)
        if (!fileUrl) {
          setUploadError('Failed to upload file. Please try again.')
          setSending(false)
          setUploading(false)
          return
        }
      } catch (err) {
        console.error('Upload error:', err)
        setUploadError('Failed to upload file. Please try again.')
        setSending(false)
        setUploading(false)
        return
      }
      setUploading(false)
    }

    await sendTicketMessage(
      selectedTicket.ticket_id, 
      'customer', 
      user.name, 
      newMessage.trim() || null, 
      fileUrl
    )
    
    setNewMessage('')
    clearFile()
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
      case 'open': return 'bg-green-500/20 text-green-400 border border-green-500/30'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
      case 'resolved': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      case 'closed': return 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
    }
  }

  // Not logged in - show login prompt
  if (!authLoading && !user) {
    return (
      <>
        <Background />
        <Navbar />
        <main className="min-h-screen pt-28 pb-16 px-4 relative z-10">
          <div className="container mx-auto max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 text-center">
                {/* Icon with glow */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-50" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Headphones className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-3 tracking-wide">
                  SUPPORT CENTER
                </h1>
                <p className="text-gray-400 mb-8 text-lg">
                  Get help from our expert team 24/7
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <Shield className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300">Secure Chat</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <Sparkles className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300">Fast Response</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-cyan-500/25 transition-all"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login to Continue
                </motion.button>
                
                <p className="text-gray-500 text-sm mt-4">
                  Don't have an account? Sign up for free!
                </p>
              </div>
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
        <main className="min-h-screen pt-28 pb-16 px-4 relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
              <Loader2 className="h-12 w-12 text-cyan-400 animate-spin relative" />
            </div>
            <p className="text-gray-400 mt-4">Loading support center...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Background />
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {/* Tickets List View */}
            {view === 'tickets' && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl text-gray-400 hover:text-white transition-all border border-slate-700/50">
                      <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                        <Headphones className="h-7 w-7 text-cyan-400" />
                        Support Center
                      </h1>
                      <p className="text-gray-400 text-sm mt-1">We're here to help you 24/7</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setView('create')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="h-5 w-5" />
                    New Ticket
                  </motion.button>
                </div>

                {tickets.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />
                    <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-slate-700/50 rounded-full blur-lg" />
                        <div className="relative w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700/50">
                          <Ticket className="h-12 w-12 text-gray-500" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">No Tickets Yet</h3>
                      <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                        Create your first support ticket to get help from our team
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button
                          onClick={() => setView('create')}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Plus className="h-5 w-5" />
                          Create Ticket
                        </motion.button>
                        <motion.a
                          href="https://discord.gg/tKDRWYNcuE"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                        >
                          <MessageCircle className="h-5 w-5" />
                          Join Discord
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((ticket, index) => (
                      <motion.button
                        key={ticket.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelectTicket(ticket)}
                        className="w-full text-left group"
                      >
                        <div className="relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700/50 group-hover:border-cyan-500/30 p-5 transition-all">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2 py-1 rounded-lg">{ticket.ticket_id}</span>
                              <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${getStatusColor(ticket.status)}`}>
                                {ticket.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-cyan-300 transition-colors">{ticket.subject}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                Created: {formatDate(ticket.created_at)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                Updated: {formatDate(ticket.updated_at)}
                              </span>
                            </div>
                          </div>
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
                  className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Tickets
                </button>

                <div className="relative overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8">
                    <div className="text-center mb-8">
                      <div className="relative inline-block mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur-lg opacity-50" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Ticket className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">Create New Ticket</h2>
                      <p className="text-gray-400">Describe your issue and we'll help you out</p>
                    </div>

                    <form onSubmit={handleCreateTicket} className="space-y-6">
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Subject</label>
                        <input
                          type="text"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                          placeholder="What do you need help with?"
                          required
                          className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Message</label>
                        <textarea
                          value={ticketForm.message}
                          onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                          placeholder="Describe your issue in detail..."
                          required
                          rows={6}
                          className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={creating}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-cyan-500/20"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {creating ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Submit Ticket
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
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
              >
                <button
                  onClick={() => { setView('tickets'); setSelectedTicket(null); setMessages([]) }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors group"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Tickets
                </button>

                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-220px)]">
                    
                    {/* Chat Header */}
                    <div className="p-4 sm:p-5 border-b border-slate-700/50 bg-slate-800/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2.5 py-1 rounded-lg">{selectedTicket.ticket_id}</span>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(selectedTicket.status)}`}>
                              {selectedTicket.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-white font-semibold text-lg truncate">{selectedTicket.subject}</h3>
                        </div>
                        {selectedTicket.status !== 'closed' && (
                          <motion.button
                            onClick={handleCloseTicket}
                            className="flex-shrink-0 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-red-500/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <X className="h-4 w-4" />
                            <span className="hidden sm:inline">Close</span>
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/30">
                      {messages.length === 0 && (
                        <div className="text-center py-12">
                          <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-500">No messages yet</p>
                        </div>
                      )}
                      {messages.map((msg, index) => {
                        const isCustomer = msg.sender_type === 'customer'
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[85%] sm:max-w-[75%] ${isCustomer ? 'order-2' : 'order-1'}`}>
                              <div className={`flex items-end gap-2 ${isCustomer ? 'flex-row-reverse' : ''}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-lg ${
                                  isCustomer 
                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                                } text-white`}>
                                  {isCustomer ? user?.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                                
                                {/* Message Bubble */}
                                <div className={`rounded-2xl px-4 py-3 shadow-lg ${
                                  isCustomer 
                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-sm' 
                                    : 'bg-slate-800 text-gray-100 rounded-bl-sm border border-slate-700/50'
                                }`}>
                                  {/* Sender name for admin */}
                                  {!isCustomer && (
                                    <p className="text-xs text-purple-400 font-medium mb-1">Support Team</p>
                                  )}
                                  {msg.message && (
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                  )}
                                  {msg.image_url && (
                                    (() => {
                                      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(msg.image_url)
                                      const fileName = msg.image_url.split('/').pop() || 'file'
                                      
                                      if (isImage) {
                                        return (
                                          <a href={msg.image_url} target="_blank" rel="noopener noreferrer" className="block mt-2">
                                            <img 
                                              src={msg.image_url} 
                                              alt="Attachment" 
                                              className="max-w-[250px] rounded-xl border border-white/10 hover:opacity-90 transition-opacity" 
                                            />
                                          </a>
                                        )
                                      } else {
                                        // File attachment - show download card
                                        const ext = fileName.split('.').pop()?.toLowerCase()
                                        const getIcon = () => {
                                          switch (ext) {
                                            case 'pdf': return '📄'
                                            case 'zip': case 'rar': return '📦'
                                            case 'txt': case 'log': return '📝'
                                            case 'json': case 'xml': case 'yml': case 'yaml': return '⚙️'
                                            case 'doc': case 'docx': return '📃'
                                            case 'xls': case 'xlsx': case 'csv': return '📊'
                                            default: return '📎'
                                          }
                                        }
                                        return (
                                          <a 
                                            href={msg.image_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            download
                                            className={`mt-2 flex items-center gap-3 p-3 rounded-xl transition-all ${
                                              isCustomer 
                                                ? 'bg-white/10 hover:bg-white/20' 
                                                : 'bg-slate-700/50 hover:bg-slate-700/80 border border-slate-600/50'
                                            }`}
                                          >
                                            <span className="text-2xl">{getIcon()}</span>
                                            <div className="flex-1 min-w-0">
                                              <p className={`text-sm font-medium truncate ${isCustomer ? 'text-white' : 'text-gray-200'}`}>
                                                {fileName.length > 25 ? fileName.substring(0, 22) + '...' + fileName.split('.').pop() : fileName}
                                              </p>
                                              <p className={`text-xs ${isCustomer ? 'text-cyan-200' : 'text-cyan-400'}`}>
                                                Click to download
                                              </p>
                                            </div>
                                            <svg className={`w-5 h-5 ${isCustomer ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                          </a>
                                        )
                                      }
                                    })()
                                  )}
                                </div>
                              </div>
                              <p className={`text-xs text-gray-500 mt-1.5 ${isCustomer ? 'text-right mr-10' : 'ml-10'}`}>
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
                      <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
                        {/* File Preview */}
                        {filePreview && (
                          <div className="mb-3 relative inline-block">
                            <div className="relative">
                              {filePreview.type === 'image' ? (
                                <img src={filePreview.url} alt="Preview" className="h-24 rounded-xl border border-slate-600" />
                              ) : (
                                <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl px-4 py-3 border border-slate-600">
                                  <span className="text-2xl">{getFileIcon(filePreview.name)}</span>
                                  <div>
                                    <p className="text-white text-sm font-medium truncate max-w-[200px]">{filePreview.name}</p>
                                    <p className="text-gray-400 text-xs">{filePreview.size}</p>
                                  </div>
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={clearFile}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {/* Upload Error */}
                        {uploadError && (
                          <div className="mb-3 text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                            {uploadError}
                          </div>
                        )}
                        
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/jpeg,image/png,image/gif,image/webp,.txt,.pdf,.zip,.rar,.json,.csv,.doc,.docx,.xls,.xlsx,.log,.xml,.yml,.yaml,.md"
                            className="hidden"
                          />
                          
                          {/* Attach Button */}
                          <motion.button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="p-3 bg-slate-700/80 hover:bg-slate-600/80 text-gray-400 hover:text-white rounded-xl transition-all border border-slate-600/50 disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Attach file (Images, PDF, ZIP, TXT, etc.)"
                          >
                            {uploading ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <Paperclip className="h-5 w-5" />
                            )}
                          </motion.button>
                          
                          {/* Message Input */}
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          />
                          
                          {/* Send Button */}
                          <motion.button
                            type="submit"
                            disabled={sending || (!newMessage.trim() && !selectedFile)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                          </motion.button>
                        </form>
                      </div>
                    ) : (
                      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30 text-center">
                        <p className="text-gray-500 flex items-center justify-center gap-2">
                          <X className="h-4 w-4" />
                          This ticket is closed
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}
