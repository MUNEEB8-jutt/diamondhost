'use client'

import { motion } from 'framer-motion'
import { CreditCard, Wallet } from 'lucide-react'

const paymentMethods = [
  {
    name: 'JazzCash',
    icon: '📱',
    color: 'from-red-500 to-red-600',
    description: 'Mobile Wallet',
  },
  {
    name: 'Easypaisa',
    icon: '💚',
    color: 'from-green-500 to-green-600',
    description: 'Mobile Wallet',
  },
  {
    name: 'Bank Transfer',
    icon: '🏦',
    color: 'from-blue-500 to-blue-600',
    description: 'All Pakistani Banks',
  },
  {
    name: 'Crypto',
    icon: '₿',
    color: 'from-orange-500 to-yellow-500',
    description: 'BTC, ETH, USDT',
  },
  {
    name: 'UPI',
    icon: '🇮🇳',
    color: 'from-purple-500 to-indigo-600',
    description: 'Indian Payments',
  },
]

export default function PaymentMethods() {
  return (
    <section id="payments" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#070b14]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-cyan-400 text-sm mb-4"
          >
            <Wallet className="h-4 w-4" />
            <span>Easy Payments</span>
          </motion.span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Payment </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Methods</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Multiple payment options for your convenience
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 rounded-2xl px-6 py-4 flex items-center gap-4 transition-all duration-300">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-xl shadow-lg`}>
                  {method.icon}
                </div>
                
                {/* Info */}
                <div>
                  <p className="text-white font-semibold">{method.name}</p>
                  <p className="text-gray-500 text-xs">{method.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <CreditCard className="h-4 w-4" />
            <span>Secure & Instant Payments</span>
            <span className="text-green-400">•</span>
            <span>100% Safe</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
