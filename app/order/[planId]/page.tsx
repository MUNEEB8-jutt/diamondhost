'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, ArrowRight, Copy, Check, Upload, X, Loader2, 
  CheckCircle, AlertCircle, Server, Cpu, MapPin, Sparkles
} from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { 
  PaymentMethod, getPaymentMethods, createOrder, 
  uploadOrderScreenshot, getPlans, HostingPlan 
} from '@/lib/supabase'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Background from '../../components/Background'

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading, setShowAuthModal } = useAuth()
  
  // Step: 1 = Select Payment, 2 = Payment Details, 3 = Success
  const [step, setStep] = useState(1)
  
  const [plan, setPlan] = useState<HostingPlan | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  
  const [transactionId, setTransactionId] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [params.planId])

  useEffect(() => {
    if (!authLoading && !user) {
      setShowAuthModal(true)
    }
  }, [authLoading, user, setShowAuthModal])

  const loadData = async () => {
    setLoading(true)
    const [plans, methods] = await Promise.all([
      getPlans(),
      getPaymentMethods()
    ])
    
    const planId = decodeURIComponent(params.planId as string)
    const foundPlan = plans.find(p => p.id === planId || p.name.toLowerCase().replace(/\s+/g, '-') === planId.toLowerCase())
    
    if (foundPlan) {
      setPlan(foundPlan)
    }
    setPaymentMethods(methods)
    setLoading(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }
      setScreenshot(file)
      setScreenshotPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!user || !plan || !selectedMethod) return
    
    // Validation - both required
    if (!transactionId.trim()) {
      setError('Transaction ID is required')
      return
    }
    if (!screenshot) {
      setError('Payment screenshot is required')
      return
    }
    
    setSubmitting(true)
    setError('')

    try {
      const screenshotUrl = await uploadOrderScreenshot(screenshot, `${user.id}-${Date.now()}`)

      const { error: orderError } = await createOrder({
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        plan_name: plan.name,
        plan_price: plan.price,
        plan_ram: plan.ram,
        location: plan.location,
        processor: plan.performance,
        payment_method: selectedMethod.name,
        transaction_id: transactionId || undefined,
        screenshot_url: screenshotUrl || undefined
      })

      if (orderError) {
        setError(orderError)
      } else {
        setStep(3)
      }
    } catch (err) {
      setError('Failed to submit order')
    }
    setSubmitting(false)
  }

  // Loading State
  if (loading || authLoading) {
    return (
      <>
        <Background />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <>
        <Background />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 max-w-md"
          >
            <AlertCircle className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
            <p className="text-gray-400 mb-6">Please login to place an order</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Login / Sign Up
            </button>
          </motion.div>
        </div>
      </>
    )
  }

  // Plan not found
  if (!plan) {
    return (
      <>
        <Background />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 max-w-md"
          >
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Plan Not Found</h2>
            <p className="text-gray-400 mb-6">The selected plan doesn't exist</p>
            <Link
              href="/#plans"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl inline-block"
            >
              View Plans
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Background />
      <Navbar />
      
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/#plans"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Plans</span>
            </Link>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                    : 'bg-slate-800 text-gray-500 border border-slate-700'
                }`}>
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-all ${
                    step > s ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Plan Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 mb-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Server className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                  <div className="flex items-center gap-3 text-gray-400 text-sm mt-1">
                    <span className="flex items-center gap-1"><Cpu className="h-4 w-4" /> {plan.ram}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {plan.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-cyan-400">PKR {plan.price}</p>
                <p className="text-gray-500 text-sm">per month</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Select Payment Method */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white">Select Payment Method</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      onClick={() => setSelectedMethod(method)}
                      className={`relative p-6 rounded-2xl border-2 transition-all text-center group ${
                        selectedMethod?.id === method.id
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                          : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50'
                      }`}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {selectedMethod?.id === method.id && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-5 w-5 text-cyan-400" />
                        </div>
                      )}
                      <span className="text-4xl mb-3 block">{method.icon}</span>
                      <p className="text-white font-semibold">{method.name}</p>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => selectedMethod && setStep(2)}
                  disabled={!selectedMethod}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                  whileHover={{ scale: selectedMethod ? 1.01 : 1 }}
                  whileTap={{ scale: selectedMethod ? 0.99 : 1 }}
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2: Payment Details & Instructions */}
            {step === 2 && selectedMethod && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl">{selectedMethod.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Payment Instructions</h2>
                    <p className="text-gray-400">Complete your payment using {selectedMethod.name}</p>
                  </div>
                </div>

                {/* Payment Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Left: QR Code */}
                  <div className="flex flex-col items-center">
                    {selectedMethod.qr_code_url ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                      >
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-2xl rounded-3xl" />
                        <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                          <img 
                            src={selectedMethod.qr_code_url} 
                            alt="Payment QR Code" 
                            className="w-64 h-64 object-contain"
                          />
                        </div>
                        <p className="text-center text-gray-400 text-sm mt-4">Scan QR Code to Pay</p>
                      </motion.div>
                    ) : (
                      <div className="w-64 h-64 bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-700/50">
                        <p className="text-gray-500 text-center px-4">No QR Code available<br/>Use account details</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Account Details + Instructions */}
                  <div className="space-y-4">
                    {/* Instructions Box */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/30">
                      <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        How to Pay
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">1.</span>
                          <span>Scan the QR code or use account details to send payment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">2.</span>
                          <span>After payment, enter your Transaction ID below</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">3.</span>
                          <span>Upload a screenshot of your payment confirmation</span>
                        </li>
                      </ul>
                    </div>

                    {/* Account Number */}
                    {selectedMethod.account_number && (
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Account Number</span>
                          <button
                            onClick={() => handleCopy(selectedMethod.account_number)}
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm transition-colors"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-white font-mono text-xl">{selectedMethod.account_number}</p>
                      </div>
                    )}

                    {/* Account Title */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                      <span className="text-gray-400 text-sm block mb-2">Account Title</span>
                      <p className="text-white font-semibold text-lg">{selectedMethod.account_title}</p>
                    </div>

                    {/* Amount */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/30">
                      <span className="text-gray-400 text-sm block mb-2">Amount to Pay</span>
                      <p className="text-cyan-400 font-bold text-2xl">PKR {plan.price}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700/50 my-8" />

                {/* Transaction Details Form */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Payment Confirmation</h3>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center gap-2 text-red-400"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  {/* Transaction ID */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Transaction ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter your transaction ID"
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Payment Screenshot <span className="text-red-400">*</span>
                    </label>
                    {screenshotPreview ? (
                      <div className="relative">
                        <img 
                          src={screenshotPreview} 
                          alt="Screenshot" 
                          className="w-full h-48 object-cover rounded-xl border border-slate-700/50" 
                        />
                        <button
                          onClick={() => { setScreenshot(null); setScreenshotPreview(null) }}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 bg-slate-800/50 border-2 border-dashed border-slate-600/50 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors group">
                        <Upload className="h-10 w-10 text-gray-500 group-hover:text-cyan-400 mb-2 transition-colors" />
                        <span className="text-gray-500 group-hover:text-gray-400 transition-colors">Click to upload screenshot</span>
                        <span className="text-gray-600 text-xs mt-1">Max 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-[2] bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: submitting ? 1 : 1.01 }}
                    whileTap={{ scale: submitting ? 1 : 0.99 }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Submit Order
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl p-12 border border-green-500/20 shadow-2xl text-center"
              >
                {/* Success Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="relative w-28 h-28 mx-auto mb-8"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
                  <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-14 w-14 text-white" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-white mb-4"
                >
                  Order Submitted Successfully!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg mb-8 max-w-md mx-auto"
                >
                  In the next <span className="text-cyan-400 font-semibold">2-3 hours</span>, your server will be set up and added to the <span className="text-cyan-400 font-semibold">My Servers</span> section.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link
                    href="/servers"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Server className="h-5 w-5" />
                    My Servers
                  </Link>
                  <Link
                    href="/"
                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-all inline-flex items-center justify-center gap-2"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
