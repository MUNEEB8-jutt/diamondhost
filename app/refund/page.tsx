'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function RefundPolicy() {
  return (
    <div className="theme-legal-shell">
      <div className="theme-legal-header">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="theme-link inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-4xl"
        >
          <div className="theme-legal-card">
            <div className="theme-legal-body">
              <div className="mb-10 flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--theme-button-start),var(--theme-button-end))] text-[#fffdf7]">
                  <RefreshCcw className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="theme-heading text-4xl md:text-5xl">Refund Policy</h1>
                  <p className="theme-copy mt-2 text-sm">Last updated: January 10, 2026</p>
                </div>
              </div>

              <section>
                <h2>1. Overview</h2>
                <p>
                  At Diamond Host, we want you to be completely satisfied with our services. This Refund Policy outlines the conditions under which refunds may be granted for our Minecraft hosting services.
                </p>
              </section>

              <section>
                <h2>2. Money-Back Guarantee</h2>
                <p>
                  We offer a 48-hour money-back guarantee for all new customers. If you are not satisfied with our services within the first 48 hours of your purchase, you may request a full refund.
                </p>
                <div className="theme-panel-soft mt-4 rounded-2xl p-4">
                  <p>
                    <strong>Note:</strong> The 48-hour period begins from the moment your server is activated, not from the time of payment.
                  </p>
                </div>
              </section>

              <section>
                <h2>3. Eligible Refunds</h2>
                <p>Refunds may be granted in the following situations:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Service not delivered as described</li>
                  <li>Persistent technical issues that we cannot resolve</li>
                  <li>Accidental duplicate payments</li>
                  <li>Service cancellation within the 48-hour guarantee period</li>
                  <li>Extended downtime exceeding our SLA commitments</li>
                </ul>
              </section>

              <section>
                <h2>4. Non-Refundable Situations</h2>
                <p>Refunds will not be provided in the following cases:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Requests made after the 48-hour guarantee period</li>
                  <li>Account suspension due to Terms of Service violations</li>
                  <li>Change of mind after the guarantee period</li>
                  <li>Issues caused by user error or misconfiguration</li>
                  <li>Third-party plugin or mod conflicts</li>
                  <li>Partial month usage</li>
                  <li>Promotional or discounted purchases unless service is defective</li>
                </ul>
              </section>

              <section>
                <h2>5. How to Request a Refund</h2>
                <ol className="list-decimal space-y-3 pl-6">
                  <li>Join our Discord server at <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer">discord.gg/tKDRWYNcuE</a>.</li>
                  <li>Create a support ticket in the appropriate channel.</li>
                  <li>Provide your email or Discord username, transaction ID, purchase date, and reason for the request.</li>
                  <li>Wait for our team to review your request, usually within 24 to 48 hours.</li>
                </ol>
              </section>

              <section>
                <h2>6. Refund Processing</h2>
                <p>Once approved, refunds are processed within 3 to 5 business days and returned to the original payment method.</p>
              </section>

              <section>
                <h2>7. Service Credits</h2>
                <p>
                  In some cases, instead of a monetary refund, we may offer service credits that do not expire, are non-transferable, and can be used for future Diamond Host purchases.
                </p>
              </section>

              <section>
                <h2>8. Chargebacks</h2>
                <p>
                  If you initiate a chargeback without first contacting us, your account may be suspended immediately. We encourage you to contact support first so we can resolve the issue directly.
                </p>
              </section>

              <section>
                <h2>9. Changes to This Policy</h2>
                <p>
                  We reserve the right to modify this Refund Policy at any time. The policy in effect at the time of your purchase will apply to that transaction.
                </p>
              </section>

              <section>
                <h2>10. Contact Us</h2>
                <p>
                  For refund requests or questions about this policy, please contact us through Discord at{' '}
                  <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer">
                    discord.gg/tKDRWYNcuE
                  </a>{' '}
                  or email us at support@diamondhost.site.
                </p>
              </section>

              <div className="theme-panel-soft mt-8 rounded-[28px] p-6">
                <h3>Quick Summary</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>48-hour money-back guarantee for new customers</li>
                  <li>Refunds usually processed within 3 to 5 business days</li>
                  <li>Contact support through Discord for the fastest response</li>
                  <li>No refunds after the 48-hour period ends</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
