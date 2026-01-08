'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Diamond, Lock, LogOut, Plus, Edit2, Trash2, Save, X, 
  Eye, EyeOff, Loader2, Check, AlertCircle, MapPin, Package,
  Globe, Settings, ChevronRight
} from 'lucide-react'
import { 
  getAllPlans, createPlan, updatePlan, deletePlan, HostingPlan,
  getAllLocations, createLocation, updateLocation, deleteLocation, Location
} from '@/lib/supabase'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'diamondhost2024'

const iconOptions = ['Medal', 'Star', 'Crown', 'Award', 'Diamond', 'Gem', 'Trophy', 'Sparkles']
const colorOptions = [
  { from: 'gray-400', to: 'gray-600', label: 'Silver' },
  { from: 'yellow-400', to: 'yellow-600', label: 'Gold' },
  { from: 'blue-400', to: 'cyan-600', label: 'Blue' },
  { from: 'purple-400', to: 'pink-600', label: 'Purple' },
  { from: 'green-400', to: 'emerald-600', label: 'Green' },
  { from: 'red-400', to: 'rose-600', label: 'Red' },
  { from: 'orange-400', to: 'orange-600', label: 'Orange' },
]

const flagOptions = ['🇦🇪', '🇸🇬', '🇩🇪', '🇺🇸', '🇬🇧', '🇯🇵', '🇮🇳', '🇦🇺', '🇨🇦', '🇫🇷', '🇳🇱', '🌍']

// Fallback data
const fallbackLocations: Location[] = [
  { id: '1', name: 'UAE', code: 'UAE', flag: '🇦🇪', active: true, sort_order: 1, created_at: '' },
  { id: '2', name: 'Singapore', code: 'Singapore', flag: '🇸🇬', active: true, sort_order: 2, created_at: '' },
  { id: '3', name: 'Germany', code: 'Germany', flag: '🇩🇪', active: true, sort_order: 3, created_at: '' },
]


export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [secretCode, setSecretCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'plans' | 'locations'>('plans')
  
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
  
  const [saving, setSaving] = useState(false)
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

  const fetchData = async () => {
    setLoading(true)
    const [plansData, locationsData] = await Promise.all([getAllPlans(), getAllLocations()])
    setPlans(plansData)
    setLocations(locationsData.length > 0 ? locationsData : fallbackLocations)
    setLoading(false)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (secretCode === ADMIN_SECRET) {
      const session = { authenticated: true, expires_at: Date.now() + 24 * 60 * 60 * 1000 }
      localStorage.setItem('admin_session', JSON.stringify(session))
      setAuthenticated(true)
      setError('')
      fetchData()
    } else {
      setError('Invalid secret code')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    setAuthenticated(false)
    setSecretCode('')
  }


  // Plan handlers
  const resetPlanForm = () => {
    setPlanForm({
      name: '', icon: 'Star', ram: '', performance: '', 
      location: locations[0]?.code || 'UAE',
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

  const handleCreatePlan = () => {
    resetPlanForm()
    setEditingPlan(null)
    setIsCreatingPlan(true)
  }

  const handleSavePlan = async () => {
    setSaving(true)
    try {
      if (editingPlan) {
        const updated = await updatePlan(editingPlan.id, planForm)
        if (updated) {
          setNotification({ type: 'success', message: 'Plan updated!' })
          fetchData()
          setEditingPlan(null)
        } else {
          setNotification({ type: 'error', message: 'Failed to update' })
        }
      } else if (isCreatingPlan) {
        const created = await createPlan(planForm)
        if (created) {
          setNotification({ type: 'success', message: 'Plan created!' })
          fetchData()
          setIsCreatingPlan(false)
        } else {
          setNotification({ type: 'error', message: 'Failed to create' })
        }
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'An error occurred' })
    }
    setSaving(false)
  }

  const handleDeletePlan = async (id: string) => {
    if (confirm('Delete this plan?')) {
      const success = await deletePlan(id)
      if (success) {
        setNotification({ type: 'success', message: 'Plan deleted!' })
        fetchData()
      }
    }
  }


  // Location handlers
  const resetLocationForm = () => {
    setLocationForm({
      name: '', code: '', flag: '🌍', active: true, sort_order: locations.length + 1,
    })
  }

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location)
    setLocationForm({
      name: location.name, code: location.code, flag: location.flag,
      active: location.active, sort_order: location.sort_order,
    })
    setIsCreatingLocation(false)
  }

  const handleCreateLocation = () => {
    resetLocationForm()
    setEditingLocation(null)
    setIsCreatingLocation(true)
  }

  const handleSaveLocation = async () => {
    setSaving(true)
    try {
      if (editingLocation) {
        const updated = await updateLocation(editingLocation.id, locationForm)
        if (updated) {
          setNotification({ type: 'success', message: 'Location updated!' })
          fetchData()
          setEditingLocation(null)
        } else {
          setNotification({ type: 'error', message: 'Failed to update' })
        }
      } else if (isCreatingLocation) {
        const created = await createLocation(locationForm)
        if (created) {
          setNotification({ type: 'success', message: 'Location created!' })
          fetchData()
          setIsCreatingLocation(false)
        } else {
          setNotification({ type: 'error', message: 'Failed to create' })
        }
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'An error occurred' })
    }
    setSaving(false)
  }

  const handleDeleteLocation = async (id: string) => {
    if (confirm('Delete this location? Plans with this location will remain.')) {
      const success = await deleteLocation(id)
      if (success) {
        setNotification({ type: 'success', message: 'Location deleted!' })
        fetchData()
      }
    }
  }

  const filteredPlans = selectedLocation === 'all' 
    ? plans 
    : plans.filter(p => p.location === selectedLocation)


  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-slate-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-cyan-400">Admin Access</h1>
            <p className="text-gray-400 mt-2">Enter your secret code</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Enter secret code"
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-cyan-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />{error}
              </p>
            )}
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition-all">
              Access Admin Panel
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
              <p className="text-xs text-gray-500">Manage plans & locations</p>
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
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'plans' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <Package className="h-5 w-5" /> Plans
          </button>
          <button onClick={() => setActiveTab('locations')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'locations' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            <Globe className="h-5 w-5" /> Locations
          </button>
        </div>


        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Location Filter */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-gray-400 text-sm mr-2">Filter:</span>
                <button onClick={() => setSelectedLocation('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedLocation === 'all' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
                  All
                </button>
                {locations.filter(l => l.active).map(loc => (
                  <button key={loc.id} onClick={() => setSelectedLocation(loc.code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedLocation === loc.code ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
                    <span>{loc.flag}</span> {loc.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Plans {selectedLocation !== 'all' && `(${selectedLocation})`}
                  <span className="text-gray-500 text-lg ml-2">({filteredPlans.length})</span>
                </h2>
                <motion.button onClick={handleCreatePlan} className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Plus className="h-5 w-5" /> Add Plan
                </motion.button>
              </div>

              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
              ) : filteredPlans.length === 0 ? (
                <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
                  <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No plans found</p>
                </div>
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
                              {!plan.active && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">Inactive</span>}
                            </div>
                            <p className="text-gray-500 text-sm">{plan.ram} • {plan.performance} • {plan.price} {plan.currency}</p>
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
                      <button onClick={() => { setEditingPlan(null); setIsCreatingPlan(false) }} className="p-2 hover:bg-slate-800 rounded-lg">
                        <X className="h-5 w-5" />
                      </button>
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
                        <div className="grid grid-cols-4 gap-2">
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
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Plus className="h-5 w-5" /> Add Location
                </motion.button>
              </div>

              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-cyan-400 animate-spin" /></div>
              ) : (
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
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <p className="text-xs text-gray-500">{plans.filter(p => p.location === loc.code).length} plans</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Edit Form */}
            <AnimatePresence>
              {(editingLocation || isCreatingLocation) && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="lg:w-[350px]">
                  <div className="bg-slate-900 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">{editingLocation ? 'Edit Location' : 'New Location'}</h3>
                      <button onClick={() => { setEditingLocation(null); setIsCreatingLocation(false) }} className="p-2 hover:bg-slate-800 rounded-lg">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Location Name</label>
                        <input type="text" value={locationForm.name} onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., Singapore" />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Code (for filtering)</label>
                        <input type="text" value={locationForm.code} onChange={(e) => setLocationForm({ ...locationForm, code: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" placeholder="e.g., Singapore" />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Flag</label>
                        <div className="grid grid-cols-6 gap-2">
                          {flagOptions.map((flag) => (
                            <button key={flag} onClick={() => setLocationForm({ ...locationForm, flag })}
                              className={`p-2 text-2xl rounded-lg border-2 transition-all ${locationForm.flag === flag ? 'border-cyan-500 bg-slate-800' : 'border-transparent hover:bg-slate-800'}`}>
                              {flag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
                        <input type="number" value={locationForm.sort_order} onChange={(e) => setLocationForm({ ...locationForm, sort_order: parseInt(e.target.value) || 1 })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={locationForm.active} onChange={(e) => setLocationForm({ ...locationForm, active: e.target.checked })} className="w-4 h-4 rounded" />
                        <span className="text-sm">Active</span>
                      </label>
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
      </div>
    </div>
  )
}

function getColorValue(colorName: string): string {
  const colors: { [key: string]: string } = {
    'gray-400': '#9ca3af', 'gray-600': '#4b5563',
    'yellow-400': '#facc15', 'yellow-600': '#ca8a04',
    'blue-400': '#60a5fa', 'cyan-600': '#0891b2',
    'purple-400': '#c084fc', 'pink-600': '#db2777',
    'green-400': '#4ade80', 'emerald-600': '#059669',
    'red-400': '#f87171', 'rose-600': '#e11d48',
    'orange-400': '#fb923c', 'orange-600': '#ea580c',
  }
  return colors[colorName] || '#60a5fa'
}