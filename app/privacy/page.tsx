'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
              <p className="text-gray-400 text-sm">Last updated: January 10, 2026</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-cyan max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Diamond Host ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Minecraft hosting services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed">We may collect the following types of information:</p>
              
              <h3 className="text-lg font-medium text-white mt-4 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Name and email address</li>
                <li>Discord username and ID</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>IP address and location data</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Server usage statistics and logs</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Connection timestamps</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed">We use the collected information for:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Providing and maintaining our hosting services</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Communicating with you about service updates and support</li>
                <li>Improving our services and user experience</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
              <p className="text-gray-300 leading-relaxed">
                Your data is stored on secure servers located in UAE, India, and Germany. We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted storage for sensitive information</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>DDoS protection on all servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing</h2>
              <p className="text-gray-300 leading-relaxed">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Payment processors for transaction handling</li>
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                We use essential cookies to ensure proper functioning of our website. These cookies do not track personal information and are necessary for service delivery. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal data for as long as your account is active or as needed to provide services. After account termination, we may retain certain data for up to 30 days for backup purposes, after which it will be permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us through Discord at{' '}
                <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                  discord.gg/tKDRWYNcuE
                </a>{' '}
                or email us at support@diamondhost.site
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
