'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <RefreshCcw className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
              <p className="text-gray-400 text-sm">Last updated: January 10, 2026</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-cyan max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                At Diamond Host, we want you to be completely satisfied with our services. This Refund Policy outlines the conditions under which refunds may be granted for our Minecraft hosting services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Money-Back Guarantee</h2>
              <p className="text-gray-300 leading-relaxed">
                We offer a <span className="text-cyan-400 font-semibold">48-hour money-back guarantee</span> for all new customers. If you are not satisfied with our services within the first 48 hours of your purchase, you may request a full refund.
              </p>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 mt-4">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Note:</strong> The 48-hour period begins from the moment your server is activated, not from the time of payment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Eligible Refunds</h2>
              <p className="text-gray-300 leading-relaxed">Refunds may be granted in the following situations:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Service not delivered as described</li>
                <li>Persistent technical issues that we cannot resolve</li>
                <li>Accidental duplicate payments</li>
                <li>Service cancellation within the 48-hour guarantee period</li>
                <li>Extended downtime exceeding our SLA commitments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Non-Refundable Situations</h2>
              <p className="text-gray-300 leading-relaxed">Refunds will NOT be provided in the following cases:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Requests made after the 48-hour guarantee period</li>
                <li>Account suspension due to Terms of Service violations</li>
                <li>Change of mind after the guarantee period</li>
                <li>Issues caused by user error or misconfiguration</li>
                <li>Third-party plugin or mod conflicts</li>
                <li>Partial month usage (no pro-rata refunds)</li>
                <li>Promotional or discounted purchases (unless service is defective)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. How to Request a Refund</h2>
              <p className="text-gray-300 leading-relaxed">To request a refund, please follow these steps:</p>
              <ol className="list-decimal list-inside text-gray-300 space-y-3 mt-3">
                <li>
                  <span className="text-white font-medium">Join our Discord server</span> at{' '}
                  <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                    discord.gg/tKDRWYNcuE
                  </a>
                </li>
                <li>
                  <span className="text-white font-medium">Create a support ticket</span> in the appropriate channel
                </li>
                <li>
                  <span className="text-white font-medium">Provide the following information:</span>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
                    <li>Your account email or Discord username</li>
                    <li>Order/Transaction ID</li>
                    <li>Reason for refund request</li>
                    <li>Date of purchase</li>
                  </ul>
                </li>
                <li>
                  <span className="text-white font-medium">Wait for our team</span> to review your request (usually within 24-48 hours)
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Refund Processing</h2>
              <p className="text-gray-300 leading-relaxed">
                Once your refund is approved:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Refunds are processed within <span className="text-cyan-400">3-5 business days</span></li>
                <li>Funds will be returned to the original payment method</li>
                <li>You will receive a confirmation email once processed</li>
                <li>Your server and data will be terminated upon refund completion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Service Credits</h2>
              <p className="text-gray-300 leading-relaxed">
                In some cases, instead of a monetary refund, we may offer service credits that can be applied to future purchases. Service credits:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Do not expire</li>
                <li>Are non-transferable</li>
                <li>Cannot be converted to cash</li>
                <li>Can be used for any Diamond Host service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Chargebacks</h2>
              <p className="text-gray-300 leading-relaxed">
                If you initiate a chargeback with your bank or payment provider without first contacting us, your account will be immediately suspended. We encourage you to contact our support team first to resolve any issues. Fraudulent chargebacks may result in permanent account termination and potential legal action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting. The policy in effect at the time of your purchase will apply to that transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                For refund requests or questions about this policy, please contact us through Discord at{' '}
                <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                  discord.gg/tKDRWYNcuE
                </a>{' '}
                or email us at support@diamondhost.site
              </p>
            </section>

            {/* Summary Box */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-white mb-3">Quick Summary</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  48-hour money-back guarantee for new customers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Refunds processed within 3-5 business days
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Contact support via Discord for fastest response
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">!</span>
                  No refunds after 48-hour period
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
