'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Loader2, AlertCircle, CheckCircle, Upload, Copy, Check } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { PaymentMethod, getPaymentMethods, createOrder, uploadOrderScreenshot } from '@/lib/supabase'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: number
    ram: string
    location: string
    processor: string
  } | null
}

export default function OrderModal({ isOpen, onClose, plan }: OrderModalProps) {
  const { user, setShowAuthModal } = useAuth()
  const [step, setStep] = useState<'payment' | 'details' | 'success'>('payment')
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadPaymentMethods()
      setStep('payment')
      setSelectedMethod(null)
      setTransactionId('')
      setScreenshot(null)
      setScreenshotPreview(null)
      setError('')
    }
  }, [isOpen])

  const loadPaymentMethods = async () => {
    const methods = await getPaymentMethods()
    setPaymentMethods(methods)
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

  const handleSubmitOrder = async () => {
    if (!user || !plan || !selectedMethod) return
    
    setLoading(true)
    setError('')

    try {
      let screenshotUrl = null
      if (screenshot) {
        screenshotUrl = await uploadOrderScreenshot(screenshot, `${user.id}-${Date.now()}`)
      }

      const { order, error: orderError } = await createOrder({
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        plan_name: plan.name,
        plan_price: plan.price,
        plan_ram: plan.ram,
        location: plan.location,
        processor: plan.processor,
        payment_method: selectedMethod.name,
        transaction_id: transactionId || undefined,
        screenshot_url: screenshotUrl || undefined
      })

      if (orderError) {
        setError(orderError)
      } else {
        setStep('success')
      }
    } catch (err) {
      setError('Failed to submit order')
    }
    setLoading(false)
  }

  if (!isOpen || !plan) return null

  // If not logged in, show auth modal
  if (!user) {
    setShowAuthModal(true)
    onClose()
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/20 blur-3xl" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative p-6">
            {/* Plan Info */}
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.ram} • {plan.location} • {plan.processor}</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold text-xl">${plan.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-xs">per month</p>
                </div>
              </div>
            </div>

            {/* Step: Payment Selection */}
            {step === 'payment' && (
              <>
                <h2 
                  className="text-xl font-bold text-white mb-4 uppercase"
                  style={{ fontFamily: "'Russo One', sans-serif", letterSpacing: '0.05em' }}
                >
                  SELECT PAYMENT METHOD
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      onClick={() => setSelectedMethod(method)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedMethod?.id === method.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl mb-2 block">{method.icon}</span>
                      <p className="text-white font-semibold text-sm">{method.name}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Selected Method Details */}
                {selectedMethod && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-cyan-500/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400 text-sm">Account Number</span>
                      <button
                        onClick={() => handleCopy(selectedMethod.account_number)}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-white font-mono text-lg mb-2">{selectedMethod.account_number}</p>
                    <p className="text-gray-400 text-sm">Account Title: <span className="text-white">{selectedMethod.account_title}</span></p>
                    
                    {selectedMethod.qr_code_url && (
                      <div className="mt-4 flex justify-center">
                        <img 
                          src={selectedMethod.qr_code_url} 
                          alt="QR Code" 
                          className="w-40 h-40 rounded-lg bg-white p-2"
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                <motion.button
                  onClick={() => selectedMethod && setStep('details')}
                  disabled={!selectedMethod}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: selectedMethod ? 1.02 : 1 }}
                  whileTap={{ scale: selectedMethod ? 0.98 : 1 }}
                >
                  Continue
                </motion.button>
              </>
            )}

            {/* Step: Payment Details */}
            {step === 'details' && (
              <>
                <h2 
                  className="text-xl font-bold text-white mb-4 uppercase"
                  style={{ fontFamily: "'Russo One', sans-serif", letterSpacing: '0.05em' }}
                >
                  PAYMENT DETAILS
                </h2>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Transaction ID (Optional)</label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter transaction ID"
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Payment Screenshot (Optional)</label>
                    <div className="relative">
                      {screenshotPreview ? (
                        <div className="relative">
                          <img src={screenshotPreview} alt="Screenshot" className="w-full h-40 object-cover rounded-xl" />
                          <button
                            onClick={() => { setScreenshot(null); setScreenshotPreview(null) }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 bg-slate-800/50 border-2 border-dashed border-slate-600/50 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors">
                          <Upload className="h-8 w-8 text-gray-500 mb-2" />
                          <span className="text-gray-500 text-sm">Click to upload</span>
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
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setStep('payment')}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Order'}
                  </motion.button>
                </div>
              </>
            )}

            {/* Step: Success */}
            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </motion.div>
                <h2 
                  className="text-2xl font-bold text-white mb-2 uppercase"
                  style={{ fontFamily: "'Russo One', sans-serif" }}
                >
                  ORDER SUBMITTED!
                </h2>
                <p className="text-gray-400 mb-6">
                  Your order has been submitted successfully. We'll review it and set up your server soon!
                </p>
                <motion.button
                  onClick={onClose}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Done
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
