'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Diamond, Lock, LogOut, Plus, Edit2, Trash2, Save, X, 
  Eye, EyeOff, Loader2, Check, AlertCircle, Package,
  Globe, MessageSquare, Send, Clock, User, Image as ImageIcon,
  ShoppingCart, CheckCircle, XCircle, CreditCard, Server, RefreshCw, Ban, Play, Users, Calendar
} from 'lucide-react'
import { 
  getAllPlans, createPlan, updatePlan, deletePlan, HostingPlan,
  getAllLocations, createLocation, updateLocation, deleteLocation, Location,
  getAllTickets, getTicketMessages, sendTicketMessage, updateTicketStatus, uploadTicketImage,
  SupportTicket, TicketMessage,
  getAllOrders, approveOrder, rejectOrder, Order,
  getAllPaymentMethods, updatePaymentMethod, PaymentMethod, uploadQRCode,
  getAllServers, suspendServer, markServerForRenewal, reactivateServer, deleteServer, createServerFromOrder, UserServer,
  getAllUsers, banUser, unbanUser, getServersByUserId, getOrdersByUserId, AdminUser
} from '@/lib/supabase'

// No client-side secret - verification happens on server

// Currency symbols
const currencySymbols: Record<string, string> = {
  USD: '$',
  INR: '₹',
  PKR: 'Rs',
  AED: 'AED',
}

// Get currency symbol
function getCurrencySymbol(currency: string): string {
  return currencySymbols[currency] || currency
}

const iconOptions = ['Medal', 'Star', 'Crown', 'Award', 'Diamond', 'Gem', 'Trophy', 'Sparkles']
const colorOptions = [
  { from: 'gray-400', to: 'gray-600', label: 'Silver' },
  { from: 'yellow-400', to: 'yellow-600', label: 'Gold' },
  { from: 'blue-400', to: 'cyan-600', label: 'Blue' },
  { from: 'purple-400', to: 'pink-600', label: 'Purple' },
  { from: 'green-400', to: 'emerald-600', label: 'Green' },
  { from: 'red-400', to: 'rose-600', label: 'Red' },
]
const flagOptions = ['🇦🇪', '🇸🇬', '🇩🇪', '🇺🇸', '🇬🇧', '🇯🇵', '🇮🇳', '🇦🇺', '']

const fallbackLocations: Location[] = [
  { id: '1', name: 'UAE', code: 'UAE', flag: '🇦🇪', active: true, sort_order: 1, created_at: '' },
  { id: '2', name: 'India', code: 'India', flag: '🇮🇳', active: true, sort_order: 2, created_at: '' },
  { id: '3', name: 'Germany', code: 'Germany', flag: '🇩🇪', active: true, sort_order: 3, created_at: '' },
]

function getColorValue(color: string): string {
  const colors: Record<string, string> = {
    'gray-400': '#9ca3af', 'gray-600': '#4b5563', 'yellow-400': '#facc15', 'yellow-600': '#ca8a04',
    'blue-400': '#60a5fa', 'cyan-600': '#0891b2', 'purple-400': '#c084fc', 'pink-600': '#db2777',
    'green-400': '#4ade80', 'emerald-600': '#059669', 'red-400': '#f87171', 'rose-600': '#e11d48',
    'orange-400': '#fb923c', 'orange-600': '#ea580c',
  }
  return colors[color] || '#60a5fa'
}


export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [secretCode, setSecretCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'plans' | 'locations' | 'tickets' | 'orders' | 'payments' | 'servers' | 'users'>('plans')
  
  // Plans state
  const [plans, setPlans] = useState<HostingPlan[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [editingPlan, setEditingPlan] = useState<HostingPlan | null>(null)
  const [isCreatingPlan, setIsCreatingPlan] = useState(false)
  
  // Location state
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [isCreatingLocation, setIsCreatingLocation] = useState(false)
  
  // Tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [ticketMessages, setTicketMessages] = useState<TicketMessage[]>([])
  const [newReply, setNewReply] = useState('')
  const [sendingReply, setSendingReply] = useState(false)
  const [ticketFilter, setTicketFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved' | 'closed'>('all')
  const [adminImage, setAdminImage] = useState<File | null>(null)
  const [adminImagePreview, setAdminImagePreview] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const adminFileInputRef = useRef<HTMLInputElement>(null)
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([])
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [approvalForm, setApprovalForm] = useState({ panel_link: '', panel_password: '', panel_gmail: '' })
  const [rejectReason, setRejectReason] = useState('')
  const [processingOrder, setProcessingOrder] = useState(false)
  
  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null)
  const [paymentForm, setPaymentForm] = useState({ account_number: '', account_title: '', qr_code_url: '' })
  const qrFileInputRef = useRef<HTMLInputElement>(null)
  
  // Servers state
  const [servers, setServers] = useState<UserServer[]>([])
  const [serverFilter, setServerFilter] = useState<'all' | 'active' | 'suspended' | 'renewal_required'>('all')
  const [selectedServer, setSelectedServer] = useState<UserServer | null>(null)
  const [suspendReason, setSuspendReason] = useState('')
  const [processingServer, setProcessingServer] = useState(false)
  
  // Users state
  const [users, setUsers] = useState<AdminUser[]>([])
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [userServers, setUserServers] = useState<UserServer[]>([])
  const [userOrders, setUserOrders] = useState<Order[]>([])
  const [banReason, setBanReason] = useState('')
  const [processingUser, setProcessingUser] = useState(false)
  const [loadingUserData, setLoadingUserData] = useState(false)
  
  const [saving, setSaving] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const [planForm, setPlanForm] = useState({
    name: '', icon: 'Star', ram: '', performance: '', location: 'UAE',
    price: 0, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600',
    features: ['24/7 Support', 'DDoS Protection', 'Instant Setup'],
    popular: false, sort_order: 1, active: true,
  })

  const [locationForm, setLocationForm] = useState({
    name: '', code: '', flag: '🌍', active: true, sort_order: 1,
  })


  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (session) {
      const parsed = JSON.parse(session)
      if (parsed.expires_at > Date.now()) {
        setAuthenticated(true)
        fetchData()
      } else {
        localStorage.removeItem('admin_session')
      }
    }
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [ticketMessages])

  // Polling for new messages in admin
  useEffect(() => {
    if (selectedTicket?.ticket_id) {
      const pollInterval = setInterval(async () => {
        const msgs = await getTicketMessages(selectedTicket.ticket_id)
        setTicketMessages(msgs)
      }, 3000)
      return () => clearInterval(pollInterval)
    }
  }, [selectedTicket?.ticket_id])

  const fetchData = async () => {
    setLoading(true)
    const [plansData, locationsData, ticketsData, ordersData, paymentsData, serversData, usersData] = await Promise.all([
      getAllPlans(), getAllLocations(), getAllTickets(), getAllOrders(), getAllPaymentMethods(), getAllServers(), getAllUsers()
    ])
    setPlans(plansData)
    setLocations(locationsData.length > 0 ? locationsData : fallbackLocations)
    setTickets(ticketsData)
    setOrders(ordersData)
    setPaymentMethods(paymentsData)
    setServers(serversData)
    setUsers(usersData)
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setError('')
    
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretCode })
      })
      
      const data = await response.json()
      
      if (data.success) {
        const session = { authenticated: true, token: data.token, expires_at: data.expires_at }
        localStorage.setItem('admin_session', JSON.stringify(session))
        setAuthenticated(true)
        fetchData()
      } else {
        setError(data.error || 'Invalid secret code')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    }
    
    setLoggingIn(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    setAuthenticated(false)
    setSecretCode('')
  }


  // Plan handlers
  const resetPlanForm = () => {
    setPlanForm({
      name: '', icon: 'Star', ram: '', performance: '', location: locations[0]?.code || 'UAE',
      price: 0, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600',
      features: ['24/7 Support', 'DDoS Protection', 'Instant Setup'],
      popular: false, sort_order: plans.length + 1, active: true,
    })
  }

  const handleEditPlan = (plan: HostingPlan) => {
    setEditingPlan(plan)
    setPlanForm({
      name: plan.name, icon: plan.icon, ram: plan.ram, performance: plan.performance,
      location: plan.location, price: plan.price, currency: plan.currency,
      color_from: plan.color_from, color_to: plan.color_to,
      features: plan.features || [], popular: plan.popular,
      sort_order: plan.sort_order, active: plan.active,
    })
    setIsCreatingPlan(false)
  }

  const handleCreatePlan = () => { resetPlanForm(); setEditingPlan(null); setIsCreatingPlan(true) }

  const handleSavePlan = async () => {
    setSaving(true)
    try {
      if (editingPlan) {
        const updated = await updatePlan(editingPlan.id, planForm)
        if (updated) { setNotification({ type: 'success', message: 'Plan updated!' }); fetchData(); setEditingPlan(null) }
        else { setNotification({ type: 'error', message: 'Failed to update' }) }
      } else if (isCreatingPlan) {
        const created = await createPlan(planForm)
        if (created) { setNotification({ type: 'success', message: 'Plan created!' }); fetchData(); setIsCreatingPlan(false) }
        else { setNotification({ type: 'error', message: 'Failed to create' }) }
      }
    } catch { setNotification({ type: 'error', message: 'An error occurred' }) }
    setSaving(false)
  }

  const handleDeletePlan = async (id: string) => {
    if (confirm('Delete this plan?')) {
      const success = await deletePlan(id)
      if (success) { setNotification({ type: 'success', message: 'Plan deleted!' }); fetchData() }
    }
  }


  // Location handlers
  const resetLocationForm = () => {
    setLocationForm({ name: '', code: '', flag: '🌍', active: true, sort_order: locations.length + 1 })
  }

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location)
    setLocationForm({ name: location.name, code: location.code, flag: location.flag, active: location.active, sort_order: location.sort_order })
    setIsCreatingLocation(false)
  }

  const handleCreateLocation = () => { resetLocationForm(); setEditingLocation(null); setIsCreatingLocation(true) }

  const handleSaveLocation = async () => {
    setSaving(true)
    try {
      if (editingLocation) {
        const updated = await updateLocation(editingLocation.id, locationForm)
        if (updated) { setNotification({ type: 'success', message: 'Location updated!' }); fetchData(); setEditingLocation(null) }
        else { setNotification({ type: 'error', message: 'Failed to update' }) }
      } else if (isCreatingLocation) {
        const created = await createLocation(locationForm)
        if (created) { setNotification({ type: 'success', message: 'Location created!' }); fetchData(); setIsCreatingLocation(false) }
        else { setNotification({ type: 'error', message: 'Failed to create' }) }
      }
    } catch { setNotification({ type: 'error', message: 'An error occurred' }) }
    setSaving(false)
  }

  const handleDeleteLocation = async (id: string) => {
    if (confirm('Delete this location?')) {
      const success = await deleteLocation(id)
      if (success) { setNotification({ type: 'success', message: 'Location deleted!' }); fetchData() }
    }
  }

  // Ticket handlers
  const handleSelectTicket = async (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
    const msgs = await getTicketMessages(ticket.ticket_id)
    setTicketMessages(msgs)
  }

  const handleAdminImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ type: 'error', message: 'Image must be less than 5MB' })
        return
      }
      setAdminImage(file)
      setAdminImagePreview(URL.createObjectURL(file))
    }
  }

  const clearAdminImage = () => {
    setAdminImage(null)
    setAdminImagePreview(null)
    if (adminFileInputRef.current) adminFileInputRef.current.value = ''
  }

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!newReply.trim() && !adminImage) || !selectedTicket) return
    setSendingReply(true)
    
    let imageUrl: string | null = null
    if (adminImage) {
      imageUrl = await uploadTicketImage(adminImage, selectedTicket.ticket_id)
    }
    
    const sent = await sendTicketMessage(selectedTicket.ticket_id, 'admin', 'Support Team', newReply.trim() || null, imageUrl)
    if (sent) {
      setTicketMessages(prev => [...prev, sent])
      setNewReply('')
      clearAdminImage()
    }
    setSendingReply(false)
  }

  const handleUpdateStatus = async (status: SupportTicket['status']) => {
    if (!selectedTicket) return
    const success = await updateTicketStatus(selectedTicket.ticket_id, status)
    if (success) {
      setSelectedTicket({ ...selectedTicket, status })
      setTickets(prev => prev.map(t => t.ticket_id === selectedTicket.ticket_id ? { ...t, status } : t))
      setNotification({ type: 'success', message: `Ticket ${status}` })
    }
  }

  const filteredPlans = selectedLocation === 'all' ? plans : plans.filter(p => p.location === selectedLocation)
  const filteredTickets = ticketFilter === 'all' ? tickets : tickets.filter(t => t.status === ticketFilter)
  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)
  const filteredServers = serverFilter === 'all' ? servers : servers.filter(s => s.status === serverFilter)

  const formatTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  
  // Calculate days since date
  const getDaysSince = (dateStr: string) => {
    const created = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  // Handle user selection
  const handleSelectUser = async (user: AdminUser) => {
    setSelectedUser(user)
    setLoadingUserData(true)
    const [serversData, ordersData] = await Promise.all([
      getServersByUserId(user.id),
      getOrdersByUserId(user.id)
    ])
    setUserServers(serversData)
    setUserOrders(ordersData)
    setLoadingUserData(false)
  }

  // Order handlers
  const handleApproveOrder = async () => {
    if (!selectedOrder || !approvalForm.panel_link || !approvalForm.panel_password || !approvalForm.panel_gmail) {
      setNotification({ type: 'error', message: 'Please fill all fields' })
      return
    }
    setProcessingOrder(true)
    const success = await approveOrder(selectedOrder.order_id, approvalForm.panel_link, approvalForm.panel_password, approvalForm.panel_gmail)
    if (success) {
      // Also create server entry
      const updatedOrder = { ...selectedOrder, panel_link: approvalForm.panel_link, panel_password: approvalForm.panel_password, panel_gmail: approvalForm.panel_gmail }
      await createServerFromOrder(updatedOrder)
      setNotification({ type: 'success', message: 'Order approved & server created!' })
      fetchData()
      setSelectedOrder(null)
      setApprovalForm({ panel_link: '', panel_password: '', panel_gmail: '' })
    } else {
      setNotification({ type: 'error', message: 'Failed to approve order' })
    }
    setProcessingOrder(false)
  }

  const handleRejectOrder = async () => {
    if (!selectedOrder) return
    setProcessingOrder(true)
    const success = await rejectOrder(selectedOrder.order_id, rejectReason)
    if (success) {
      setNotification({ type: 'success', message: 'Order rejected' })
      fetchData()
      setSelectedOrder(null)
      setRejectReason('')
    } else {
      setNotification({ type: 'error', message: 'Failed to reject order' })
    }
    setProcessingOrder(false)
  }

  // Payment method handlers
  const handleEditPayment = (method: PaymentMethod) => {
    setEditingPayment(method)
    setPaymentForm({ account_number: method.account_number, account_title: method.account_title, qr_code_url: method.qr_code_url || '' })
  }

  const handleSavePayment = async () => {
    if (!editingPayment) return
    setSaving(true)
    const updated = await updatePaymentMethod(editingPayment.id, paymentForm)
    if (updated) {
      setNotification({ type: 'success', message: 'Payment method updated!' })
      fetchData()
      setEditingPayment(null)
    } else {
      setNotification({ type: 'error', message: 'Failed to update' })
    }
    setSaving(false)
  }

  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingPayment) {
      setNotification({ type: 'success', message: 'Uploading QR code...' })
      const url = await uploadQRCode(file, editingPayment.id)
      if (url) {
        // Update form state
        setPaymentForm({ ...paymentForm, qr_code_url: url })
        // Also save to database immediately
        const updated = await updatePaymentMethod(editingPayment.id, { qr_code_url: url })
        if (updated) {
          setNotification({ type: 'success', message: 'QR code uploaded & saved!' })
          fetchData()
        } else {
          setNotification({ type: 'error', message: 'QR uploaded but failed to save' })
        }
      } else {
        setNotification({ type: 'error', message: 'Failed to upload QR code' })
      }
    }
  }


  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-slate-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-cyan-400">Admin Access</h1>
            <p className="text-gray-400 mt-2">Enter your secret code</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)} placeholder="Enter secret code"
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-cyan-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle className="h-4 w-4" />{error}</p>}
            <button type="submit" disabled={loggingIn} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
              {loggingIn ? <><Loader2 className="h-5 w-5 animate-spin" /> Verifying...</> : 'Access Admin Panel'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-gray-400 hover:text-cyan-400 text-sm">← Back to Website</a>
          </div>
        </motion.div>
      </div>
    )
  }


  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {notification.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Diamond className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">Diamond Host Admin</h1>
              <p className="text-xs text-gray-500">Manage plans, locations & tickets</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-gray-400 hover:text-white text-sm">View Website →</a>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'plans' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <Package className="h-5 w-5" /> Plans
          </button>
          <button onClick={() => setActiveTab('locations')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'locations' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <Globe className="h-5 w-5" /> Locations
          </button>
          <button onClick={() => { setActiveTab('orders'); fetchData() }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'orders' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <ShoppingCart className="h-5 w-5" /> Orders
            {orders.filter(o => o.status === 'pending').length > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{orders.filter(o => o.status === 'pending').length}</span>
            )}
          </button>
          <button onClick={() => { setActiveTab('payments'); fetchData() }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'payments' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <CreditCard className="h-5 w-5" /> Payments
          </button>
          <button onClick={() => { setActiveTab('servers'); fetchData() }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'servers' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <Server className="h-5 w-5" /> Servers
            {servers.filter(s => s.status !== 'active').length > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{servers.filter(s => s.status !== 'active').length}</span>
            )}
          </button>
          <button onClick={() => { setActiveTab('users'); fetchData() }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'users' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <Users className="h-5 w-5" /> Users
            <span className="bg-slate-600 text-white text-xs px-2 py-0.5 rounded-full">{users.length}</span>
          </button>
          <button onClick={() => { setActiveTab('tickets'); fetchData() }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'tickets' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <MessageSquare className="h-5 w-5" /> Tickets
            {tickets.filter(t => t.status === 'open').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{tickets.filter(t => t.status === 'open').length}</span>
            )}
          </button>
        </div>


        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-gray-400 text-sm mr-2">Filter:</span>
                <button onClick={() => setSelectedLocation('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedLocation === 'all' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>All</button>
                {locations.filter(l => l.active).map(loc => (
                  <button key={loc.id} onClick={() => setSelectedLocation(loc.code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedLocation === loc.code ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
                    <span>{loc.flag}</span> {loc.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Plans <span className="text-gray-500 text-lg">({filteredPlans.length})</span></h2>
                <motion.button onClick={handleCreatePlan} className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Plus className="h-5 w-5" /> Add Plan</motion.button>
              </div>
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
              ) : (
                <div className="space-y-3">
                  {filteredPlans.map((plan, index) => (
                    <motion.div key={plan.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                      className={`bg-slate-900 rounded-xl p-4 border ${editingPlan?.id === plan.id ? 'border-cyan-500' : 'border-slate-800'} ${!plan.active ? 'opacity-60' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-gray-600">#{plan.sort_order}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white">{plan.name}</h3>
                              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-gray-400">{plan.location}</span>
                              {plan.popular && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">Popular</span>}
                            </div>
                            <p className="text-gray-500 text-sm">{plan.ram} • {plan.performance} • Rs {plan.price} PKR</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEditPlan(plan)} className="p-2 hover:bg-slate-800 rounded-lg"><Edit2 className="h-5 w-5 text-cyan-400" /></button>
                          <button onClick={() => handleDeletePlan(plan.id)} className="p-2 hover:bg-slate-800 rounded-lg"><Trash2 className="h-5 w-5 text-red-400" /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>


            {/* Plan Edit Form */}
            <AnimatePresence>
              {(editingPlan || isCreatingPlan) && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[400px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">{editingPlan ? 'Edit Plan' : 'New Plan'}</h3>
                      <button onClick={() => { setEditingPlan(null); setIsCreatingPlan(false) }} className="p-2 hover:bg-slate-800 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Plan Name</label>
                        <input type="text" value={planForm.name} onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., Diamond Plan" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Icon</label>
                          <select value={planForm.icon} onChange={(e) => setPlanForm({ ...planForm, icon: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500">
                            {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Location</label>
                          <select value={planForm.location} onChange={(e) => setPlanForm({ ...planForm, location: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500">
                            {locations.map(loc => <option key={loc.id} value={loc.code}>{loc.flag} {loc.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">RAM</label>
                          <input type="text" value={planForm.ram} onChange={(e) => setPlanForm({ ...planForm, ram: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., 8GB RAM" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Performance</label>
                          <input type="text" value={planForm.performance} onChange={(e) => setPlanForm({ ...planForm, performance: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., 250%" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Price</label>
                          <input type="number" value={planForm.price} onChange={(e) => setPlanForm({ ...planForm, price: parseInt(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
                          <input type="number" value={planForm.sort_order} onChange={(e) => setPlanForm({ ...planForm, sort_order: parseInt(e.target.value) || 1 })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Color Theme</label>
                        <div className="grid grid-cols-3 gap-2">
                          {colorOptions.map((color) => (
                            <button key={color.label} onClick={() => setPlanForm({ ...planForm, color_from: color.from, color_to: color.to })}
                              className={`p-3 rounded-lg border-2 transition-all ${planForm.color_from === color.from ? 'border-white scale-105' : 'border-transparent hover:border-white/30'}`}
                              style={{ background: `linear-gradient(to right, ${getColorValue(color.from)}, ${getColorValue(color.to)})` }} title={color.label} />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={planForm.popular} onChange={(e) => setPlanForm({ ...planForm, popular: e.target.checked })} className="w-4 h-4 rounded" />
                          <span className="text-sm">Popular</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={planForm.active} onChange={(e) => setPlanForm({ ...planForm, active: e.target.checked })} className="w-4 h-4 rounded" />
                          <span className="text-sm">Active</span>
                        </label>
                      </div>
                    </div>
                    <button onClick={handleSavePlan} disabled={saving || !planForm.name || !planForm.ram}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold py-3 rounded-xl mt-6 flex items-center justify-center gap-2">
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      {saving ? 'Saving...' : 'Save Plan'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}


        {/* Locations Tab */}
        {activeTab === 'locations' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Locations <span className="text-gray-500 text-lg">({locations.length})</span></h2>
                <motion.button onClick={handleCreateLocation} className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Plus className="h-5 w-5" /> Add Location</motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((loc, index) => (
                  <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                    className={`bg-slate-900 rounded-xl p-6 border ${editingLocation?.id === loc.id ? 'border-cyan-500' : 'border-slate-800'} ${!loc.active ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{loc.flag}</div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEditLocation(loc)} className="p-2 hover:bg-slate-800 rounded-lg"><Edit2 className="h-4 w-4 text-cyan-400" /></button>
                        <button onClick={() => handleDeleteLocation(loc.id)} className="p-2 hover:bg-slate-800 rounded-lg"><Trash2 className="h-4 w-4 text-red-400" /></button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{loc.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">Code: {loc.code}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Order: #{loc.sort_order}</span>
                      <span className={`text-xs px-2 py-1 rounded ${loc.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {loc.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Location Edit Form */}
            <AnimatePresence>
              {(editingLocation || isCreatingLocation) && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[350px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">{editingLocation ? 'Edit Location' : 'New Location'}</h3>
                      <button onClick={() => { setEditingLocation(null); setIsCreatingLocation(false) }} className="p-2 hover:bg-slate-800 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Location Name</label>
                        <input type="text" value={locationForm.name} onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., Singapore" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Code</label>
                        <input type="text" value={locationForm.code} onChange={(e) => setLocationForm({ ...locationForm, code: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., Singapore" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Flag</label>
                        <div className="grid grid-cols-5 gap-2">
                          {flagOptions.map((flag) => (
                            <button key={flag} onClick={() => setLocationForm({ ...locationForm, flag })}
                              className={`text-2xl p-2 rounded-lg border-2 transition-all ${locationForm.flag === flag ? 'border-cyan-500 bg-slate-800' : 'border-transparent hover:bg-slate-800'}`}>{flag}</button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
                          <input type="number" value={locationForm.sort_order} onChange={(e) => setLocationForm({ ...locationForm, sort_order: parseInt(e.target.value) || 1 })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={locationForm.active} onChange={(e) => setLocationForm({ ...locationForm, active: e.target.checked })} className="w-4 h-4 rounded" />
                            <span className="text-sm">Active</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleSaveLocation} disabled={saving || !locationForm.name || !locationForm.code}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold py-3 rounded-xl mt-6 flex items-center justify-center gap-2">
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      {saving ? 'Saving...' : 'Save Location'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}


        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
            {/* Tickets List */}
            <div className="lg:w-[400px] flex flex-col">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                {(['all', 'open', 'in_progress', 'resolved', 'closed'] as const).map(status => (
                  <button key={status} onClick={() => setTicketFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${ticketFilter === status ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
                    {status === 'all' ? 'All' : status.replace('_', ' ').toUpperCase()}
                    {status !== 'all' && <span className="ml-1">({tickets.filter(t => t.status === status).length})</span>}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {loading ? (
                  <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
                ) : filteredTickets.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No tickets found</div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <motion.button key={ticket.id} onClick={() => handleSelectTicket(ticket)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${selectedTicket?.id === ticket.id ? 'bg-slate-800 border-cyan-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                      whileHover={{ scale: 1.01 }}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-cyan-400 font-mono text-sm">{ticket.ticket_id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          ticket.status === 'open' ? 'bg-green-500/20 text-green-400' :
                          ticket.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          ticket.status === 'resolved' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>{ticket.status.replace('_', ' ')}</span>
                      </div>
                      <h4 className="text-white font-medium text-sm mb-1 truncate">{ticket.subject}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{ticket.customer_name}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(ticket.created_at)}</span>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </div>


            {/* Chat Panel */}
            <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              {selectedTicket ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold">{selectedTicket.ticket_id}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedTicket.status === 'open' ? 'bg-green-500/20 text-green-400' :
                          selectedTicket.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          selectedTicket.status === 'resolved' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>{selectedTicket.status.replace('_', ' ')}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{selectedTicket.subject}</p>
                      <p className="text-gray-500 text-xs">Customer: {selectedTicket.customer_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select value={selectedTicket.status} onChange={(e) => handleUpdateStatus(e.target.value as SupportTicket['status'])}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500">
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {ticketMessages.map((msg) => {
                      const isAdmin = msg.sender_type === 'admin'
                      return (
                        <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] ${isAdmin ? 'order-2' : 'order-1'}`}>
                            <div className={`flex items-end gap-2 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isAdmin ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                              }`}>{isAdmin ? 'A' : msg.sender_name.charAt(0).toUpperCase()}</div>
                              <div className={`rounded-2xl px-4 py-2 ${
                                isAdmin ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md' : 'bg-slate-800 text-gray-200 rounded-bl-md'
                              }`}>
                                {msg.image_url && (
                                  <a href={msg.image_url} target="_blank" rel="noopener noreferrer" className="block mb-2">
                                    <img src={msg.image_url} alt="Attachment" className="max-w-[250px] rounded-lg" />
                                  </a>
                                )}
                                {msg.message && <p className="text-sm whitespace-pre-wrap">{msg.message}</p>}
                              </div>
                            </div>
                            <p className={`text-[10px] text-gray-500 mt-1 ${isAdmin ? 'text-right mr-10' : 'ml-10'}`}>{formatTime(msg.created_at)}</p>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Reply Input */}
                  <form onSubmit={handleSendReply} className="p-4 border-t border-slate-800">
                    {/* Image Preview */}
                    {adminImagePreview && (
                      <div className="mb-3 relative inline-block">
                        <img src={adminImagePreview} alt="Preview" className="h-20 rounded-lg" />
                        <button
                          type="button"
                          onClick={clearAdminImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={adminFileInputRef}
                        onChange={handleAdminImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <motion.button
                        type="button"
                        onClick={() => adminFileInputRef.current?.click()}
                        disabled={selectedTicket.status === 'closed'}
                        className="bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white p-3 rounded-xl transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ImageIcon className="h-5 w-5" />
                      </motion.button>
                      <input type="text" value={newReply} onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Type your reply..." disabled={selectedTicket.status === 'closed'}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 disabled:opacity-50" />
                      <motion.button type="submit" disabled={sendingReply || (!newReply.trim() && !adminImage) || selectedTicket.status === 'closed'}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white p-3 rounded-xl disabled:opacity-50"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {sendingReply ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p>Select a ticket to view conversation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}


        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Orders List */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
                  <button key={status} onClick={() => setOrderFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${orderFilter === status ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
                    {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="ml-2">({status === 'all' ? orders.length : orders.filter(o => o.status === status).length})</span>
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>No orders found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`bg-slate-900 rounded-xl p-5 border transition-all cursor-pointer ${
                        selectedOrder?.id === order.id ? 'border-cyan-500' : 'border-slate-800 hover:border-slate-700'
                      }`}
                      onClick={() => setSelectedOrder(order)}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-cyan-400 font-mono text-sm">{order.order_id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              order.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>{order.status}</span>
                          </div>
                          <h3 className="text-white font-bold">{order.plan_name}</h3>
                          <p className="text-gray-500 text-sm">{order.plan_ram} • {order.location} • {order.processor}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            <User className="h-3 w-3 inline mr-1" />
                            {order.user_name} ({order.user_email})
                          </p>
                          
                          {/* Transaction ID */}
                          {order.transaction_id && (
                            <div className="mt-2 flex items-center gap-2">
                              <CreditCard className="h-3 w-3 text-purple-400" />
                              <span className="text-purple-400 text-sm font-mono">TXN: {order.transaction_id}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-cyan-400 font-bold text-xl">{getCurrencySymbol(order.plan_currency || 'PKR')} {order.plan_price.toLocaleString()}</p>
                          <p className="text-gray-500 text-xs">{order.payment_method}</p>
                          <p className="text-gray-500 text-xs">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      
                      {/* Payment Proof Screenshot */}
                      {order.screenshot_url && (
                        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                          <p className="text-gray-400 text-xs mb-2 flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" /> Payment Proof
                          </p>
                          <a href={order.screenshot_url} target="_blank" rel="noopener noreferrer">
                            <img 
                              src={order.screenshot_url} 
                              alt="Payment Screenshot" 
                              className="max-h-32 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                            />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Actions Panel */}
            <AnimatePresence>
              {selectedOrder && selectedOrder.status === 'pending' && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[400px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Process Order</h3>
                      <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                      <p className="text-cyan-400 font-mono text-sm mb-1">{selectedOrder.order_id}</p>
                      <p className="text-white font-bold">{selectedOrder.plan_name}</p>
                      <p className="text-gray-400 text-sm">{selectedOrder.user_name}</p>
                      <p className="text-gray-500 text-xs">{selectedOrder.user_email}</p>
                      
                      {/* Payment Method Info */}
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <p className="text-gray-400 text-xs mb-1">Payment Method</p>
                        <p className="text-white font-semibold">{selectedOrder.payment_method}</p>
                        {/* Show QR Code for the payment method */}
                        {(() => {
                          const method = paymentMethods.find(m => m.name === selectedOrder.payment_method)
                          return method?.qr_code_url ? (
                            <div className="mt-2">
                              <img 
                                src={method.qr_code_url} 
                                alt={`${method.name} QR Code`}
                                className="w-24 h-24 rounded-lg bg-white p-1"
                              />
                            </div>
                          ) : null
                        })()}
                      </div>
                      
                      {/* Transaction ID in Panel */}
                      {selectedOrder.transaction_id && (
                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <p className="text-gray-400 text-xs mb-1">Transaction ID</p>
                          <p className="text-purple-400 font-mono text-sm">{selectedOrder.transaction_id}</p>
                        </div>
                      )}
                      
                      {/* Payment Proof in Panel */}
                      {selectedOrder.screenshot_url && (
                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <p className="text-gray-400 text-xs mb-2 flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" /> Payment Proof
                          </p>
                          <a href={selectedOrder.screenshot_url} target="_blank" rel="noopener noreferrer">
                            <img 
                              src={selectedOrder.screenshot_url} 
                              alt="Payment Screenshot" 
                              className="w-full max-h-48 object-contain rounded-lg hover:opacity-80 transition-opacity cursor-pointer bg-slate-900"
                            />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Approve Section */}
                    <div className="mb-6">
                      <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Approve Order
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Panel Link *</label>
                          <input type="text" value={approvalForm.panel_link} onChange={(e) => setApprovalForm({ ...approvalForm, panel_link: e.target.value })}
                            placeholder="https://panel.example.com" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Panel Password *</label>
                          <input type="text" value={approvalForm.panel_password} onChange={(e) => setApprovalForm({ ...approvalForm, panel_password: e.target.value })}
                            placeholder="Enter password" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Panel Gmail *</label>
                          <input type="email" value={approvalForm.panel_gmail} onChange={(e) => setApprovalForm({ ...approvalForm, panel_gmail: e.target.value })}
                            placeholder="user@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" />
                        </div>
                        <button onClick={handleApproveOrder} disabled={processingOrder}
                          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                          {processingOrder ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="h-5 w-5" />}
                          Approve Order
                        </button>
                      </div>
                    </div>

                    {/* Reject Section */}
                    <div className="border-t border-slate-700 pt-6">
                      <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                        <XCircle className="h-4 w-4" /> Reject Order
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Reason (Optional)</label>
                          <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason..." rows={2}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 resize-none" />
                        </div>
                        <button onClick={handleRejectOrder} disabled={processingOrder}
                          className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                          {processingOrder ? <Loader2 className="h-5 w-5 animate-spin" /> : <XCircle className="h-5 w-5" />}
                          Reject Order
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}


        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <motion.div key={method.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`bg-slate-900 rounded-xl p-5 border transition-all ${
                      editingPayment?.id === method.id ? 'border-cyan-500' : 'border-slate-800'
                    }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{method.icon}</span>
                        <div>
                          <h3 className="text-white font-bold">{method.name}</h3>
                          <p className="text-gray-500 text-sm">{method.account_title}</p>
                        </div>
                      </div>
                      <button onClick={() => handleEditPayment(method)} className="p-2 hover:bg-slate-800 rounded-lg">
                        <Edit2 className="h-4 w-4 text-cyan-400" />
                      </button>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">Account Number</p>
                      <p className="text-white font-mono text-sm">{method.account_number}</p>
                    </div>
                    {method.qr_code_url && (
                      <div className="mt-3">
                        <img src={method.qr_code_url} alt="QR Code" className="w-24 h-24 rounded-lg bg-white p-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Edit Payment Form */}
            <AnimatePresence>
              {editingPayment && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[350px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Edit {editingPayment.name}</h3>
                      <button onClick={() => setEditingPayment(null)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Account Number</label>
                        <input type="text" value={paymentForm.account_number} onChange={(e) => setPaymentForm({ ...paymentForm, account_number: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Account Title</label>
                        <input type="text" value={paymentForm.account_title} onChange={(e) => setPaymentForm({ ...paymentForm, account_title: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">QR Code</label>
                        {paymentForm.qr_code_url && (
                          <img src={paymentForm.qr_code_url} alt="QR" className="w-32 h-32 rounded-lg bg-white p-1 mb-2" />
                        )}
                        <input type="file" ref={qrFileInputRef} onChange={handleQRUpload} accept="image/*" className="hidden" />
                        <button onClick={() => qrFileInputRef.current?.click()}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-gray-400 py-2 rounded-lg text-sm">
                          Upload QR Code
                        </button>
                      </div>
                    </div>
                    <button onClick={handleSavePayment} disabled={saving}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold py-3 rounded-xl mt-6 flex items-center justify-center gap-2">
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}


        {/* Servers Tab */}
        {activeTab === 'servers' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Servers List */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {(['all', 'active', 'suspended', 'renewal_required'] as const).map(status => (
                  <button key={status} onClick={() => setServerFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${serverFilter === status ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
                    {status === 'all' ? 'All Servers' : status === 'renewal_required' ? 'Renewal Required' : status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="ml-2">({status === 'all' ? servers.length : servers.filter(s => s.status === status).length})</span>
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
              ) : filteredServers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Server className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>No servers found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredServers.map((server) => (
                    <motion.div key={server.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`bg-slate-900 rounded-xl p-5 border transition-all cursor-pointer ${
                        selectedServer?.id === server.id ? 'border-cyan-500' : 'border-slate-800 hover:border-slate-700'
                      }`}
                      onClick={() => setSelectedServer(server)}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-cyan-400 font-mono text-sm">{server.server_id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              server.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              server.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>{server.status === 'renewal_required' ? 'Renewal Required' : server.status}</span>
                          </div>
                          <h3 className="text-white font-bold">{server.plan_name}</h3>
                          <p className="text-gray-500 text-sm">{server.plan_ram} • {server.location} • {server.processor}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            <User className="h-3 w-3 inline mr-1" />
                            {server.user_name} ({server.user_email})
                          </p>
                          {server.suspension_reason && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {server.suspension_reason}
                            </p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end text-cyan-400 text-sm mb-1">
                            <Calendar className="h-3 w-3" />
                            <span className="font-semibold">{getDaysSince(server.created_at)} days</span>
                          </div>
                          <p className="text-gray-400 text-xs">Order: {server.order_id}</p>
                          <p className="text-gray-500 text-xs">Created: {formatDate(server.created_at)}</p>
                          {server.expires_at && (
                            <p className={`text-xs mt-1 ${new Date(server.expires_at) < new Date() ? 'text-red-400' : 'text-green-400'}`}>
                              Expires: {formatDate(server.expires_at)}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Server Actions Panel */}
            <AnimatePresence>
              {selectedServer && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[400px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Manage Server</h3>
                      <button onClick={() => setSelectedServer(null)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>

                    {/* Server Info */}
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                      <p className="text-cyan-400 font-mono text-sm mb-1">{selectedServer.server_id}</p>
                      <p className="text-white font-bold">{selectedServer.plan_name}</p>
                      <p className="text-gray-400 text-sm">{selectedServer.user_name}</p>
                      <p className="text-gray-500 text-xs">{selectedServer.user_email}</p>
                      
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <p className="text-gray-400 text-xs mb-1">Panel Link</p>
                        <a href={selectedServer.panel_link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm hover:underline truncate block">{selectedServer.panel_link}</a>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Status</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          selectedServer.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          selectedServer.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>{selectedServer.status === 'renewal_required' ? 'Renewal Required' : selectedServer.status}</span>
                      </div>
                    </div>

                    {/* Actions based on status */}
                    {selectedServer.status === 'active' && (
                      <>
                        {/* Suspend Options */}
                        <div className="mb-6">
                          <h4 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                            <Ban className="h-4 w-4" /> Suspend Server
                          </h4>
                          
                          {/* Quick Actions */}
                          <div className="space-y-2 mb-4">
                            <button 
                              onClick={async () => {
                                setProcessingServer(true)
                                await markServerForRenewal(selectedServer.server_id)
                                setNotification({ type: 'success', message: 'Server marked for renewal' })
                                fetchData()
                                setSelectedServer(null)
                                setProcessingServer(false)
                              }}
                              disabled={processingServer}
                              className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                              <RefreshCw className="h-4 w-4" />
                              Mark for Renewal (1 Month Passed)
                            </button>
                            
                            <button 
                              onClick={async () => {
                                setProcessingServer(true)
                                await suspendServer(selectedServer.server_id, 'Server suspended by admin')
                                setNotification({ type: 'success', message: 'Server suspended' })
                                fetchData()
                                setSelectedServer(null)
                                setProcessingServer(false)
                              }}
                              disabled={processingServer}
                              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                              <Ban className="h-4 w-4" />
                              Suspend Server
                            </button>
                          </div>
                          
                          {/* Custom Reason */}
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              value={suspendReason} 
                              onChange={(e) => setSuspendReason(e.target.value)}
                              placeholder="Custom suspension reason..."
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 text-sm"
                            />
                            <button 
                              onClick={async () => {
                                if (!suspendReason.trim()) {
                                  setNotification({ type: 'error', message: 'Please enter a reason' })
                                  return
                                }
                                setProcessingServer(true)
                                await suspendServer(selectedServer.server_id, suspendReason)
                                setNotification({ type: 'success', message: 'Server suspended with custom reason' })
                                fetchData()
                                setSelectedServer(null)
                                setSuspendReason('')
                                setProcessingServer(false)
                              }}
                              disabled={processingServer || !suspendReason.trim()}
                              className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-2 rounded-xl text-sm">
                              Suspend with Custom Reason
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Reactivate for suspended/renewal servers */}
                    {(selectedServer.status === 'suspended' || selectedServer.status === 'renewal_required') && (
                      <div className="mb-6">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                          <Play className="h-4 w-4" /> Reactivate Server
                        </h4>
                        <button 
                          onClick={async () => {
                            setProcessingServer(true)
                            await reactivateServer(selectedServer.server_id)
                            setNotification({ type: 'success', message: 'Server reactivated!' })
                            fetchData()
                            setSelectedServer(null)
                            setProcessingServer(false)
                          }}
                          disabled={processingServer}
                          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                          {processingServer ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
                          Reactivate Server (+1 Month)
                        </button>
                      </div>
                    )}

                    {/* Delete Server */}
                    <div className="border-t border-slate-700 pt-6">
                      <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> Delete Server
                      </h4>
                      <button 
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this server? This action cannot be undone.')) {
                            setProcessingServer(true)
                            await deleteServer(selectedServer.server_id)
                            setNotification({ type: 'success', message: 'Server deleted' })
                            fetchData()
                            setSelectedServer(null)
                            setProcessingServer(false)
                          }
                        }}
                        disabled={processingServer}
                        className="w-full bg-red-900/50 hover:bg-red-900 border border-red-500/30 disabled:opacity-50 text-red-400 font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                        <Trash2 className="h-5 w-5" />
                        Delete Server Permanently
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}


        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Users List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Users <span className="text-gray-500 text-lg">({users.length})</span></h2>
              </div>

              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
              ) : users.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>No users found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {users.map((user) => (
                    <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`bg-slate-900 rounded-xl p-4 border transition-all cursor-pointer ${
                        selectedUser?.id === user.id ? 'border-cyan-500' : 'border-slate-800 hover:border-slate-700'
                      } ${user.is_banned ? 'opacity-60' : ''}`}
                      onClick={() => handleSelectUser(user)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-semibold">{user.name}</h3>
                              {user.is_banned && (
                                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Banned</span>
                              )}
                            </div>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-cyan-400 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{getDaysSince(user.created_at)} days ago</span>
                          </div>
                          <p className="text-gray-500 text-xs">{formatDate(user.created_at)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* User Details Panel */}
            <AnimatePresence>
              {selectedUser && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[450px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">User Details</h3>
                      <button onClick={() => { setSelectedUser(null); setUserServers([]); setUserOrders([]) }} className="p-2 hover:bg-slate-800 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>

                    {/* User Info */}
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                          {selectedUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{selectedUser.name}</h4>
                          <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-500 text-xs">Joined {getDaysSince(selectedUser.created_at)} days ago</span>
                          </div>
                        </div>
                      </div>
                      {selectedUser.is_banned && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                          <p className="font-semibold flex items-center gap-1"><Ban className="h-4 w-4" /> User is Banned</p>
                          {selectedUser.ban_reason && <p className="text-red-300/80 mt-1">Reason: {selectedUser.ban_reason}</p>}
                        </div>
                      )}
                    </div>

                    {loadingUserData ? (
                      <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 text-cyan-400 animate-spin" /></div>
                    ) : (
                      <>
                        {/* User's Servers */}
                        <div className="mb-6">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Server className="h-4 w-4 text-cyan-400" />
                            Servers ({userServers.length})
                          </h4>
                          {userServers.length === 0 ? (
                            <p className="text-gray-500 text-sm">No servers</p>
                          ) : (
                            <div className="space-y-2">
                              {userServers.map(server => (
                                <div key={server.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-white font-medium text-sm">{server.plan_name}</p>
                                      <p className="text-gray-500 text-xs">{server.server_id}</p>
                                    </div>
                                    <div className="text-right">
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        server.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                        server.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                                        'bg-amber-500/20 text-amber-400'
                                      }`}>{server.status}</span>
                                      <p className="text-gray-500 text-xs mt-1">{getDaysSince(server.created_at)} days</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* User's Orders */}
                        <div className="mb-6">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-cyan-400" />
                            Orders ({userOrders.length})
                          </h4>
                          {userOrders.length === 0 ? (
                            <p className="text-gray-500 text-sm">No orders</p>
                          ) : (
                            <div className="space-y-2">
                              {userOrders.map(order => (
                                <div key={order.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-white font-medium text-sm">{order.plan_name}</p>
                                      <p className="text-gray-500 text-xs">{order.order_id}</p>
                                    </div>
                                    <div className="text-right">
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        order.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                      }`}>{order.status}</span>
                                      <p className="text-cyan-400 text-xs mt-1">{getCurrencySymbol(order.plan_currency || 'PKR')} {order.plan_price.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Ban/Unban Actions */}
                    <div className="border-t border-slate-700 pt-6">
                      {selectedUser.is_banned ? (
                        <div>
                          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                            <Play className="h-4 w-4" /> Unban User
                          </h4>
                          <button 
                            onClick={async () => {
                              setProcessingUser(true)
                              await unbanUser(selectedUser.id)
                              setNotification({ type: 'success', message: 'User unbanned!' })
                              fetchData()
                              setSelectedUser(null)
                              setProcessingUser(false)
                            }}
                            disabled={processingUser}
                            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                            {processingUser ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
                            Unban User
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                            <Ban className="h-4 w-4" /> Ban User
                          </h4>
                          <div className="space-y-3">
                            <input 
                              type="text" 
                              value={banReason} 
                              onChange={(e) => setBanReason(e.target.value)}
                              placeholder="Ban reason (optional)..."
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 text-sm"
                            />
                            <button 
                              onClick={async () => {
                                setProcessingUser(true)
                                await banUser(selectedUser.id, banReason || 'Banned by admin')
                                setNotification({ type: 'success', message: 'User banned!' })
                                fetchData()
                                setSelectedUser(null)
                                setBanReason('')
                                setProcessingUser(false)
                              }}
                              disabled={processingUser}
                              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                              {processingUser ? <Loader2 className="h-5 w-5 animate-spin" /> : <Ban className="h-5 w-5" />}
                              Ban User
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
