'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
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
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <FileText className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
              <p className="text-gray-400 text-sm">Last updated: January 10, 2026</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-cyan max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Diamond Host services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including visitors, customers, and contributors of content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Services</h2>
              <p className="text-gray-300 leading-relaxed">
                Diamond Host provides Minecraft server hosting services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Intel Platinum powered game servers</li>
                <li>AMD EPYC powered game servers</li>
                <li>DDoS protection</li>
                <li>24/7 technical support via Discord</li>
                <li>Server management tools and control panel access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="text-gray-300 leading-relaxed">As a user of Diamond Host, you agree to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not use our services for any illegal or unauthorized purpose</li>
                <li>Not host content that violates intellectual property rights</li>
                <li>Not engage in activities that could harm our infrastructure or other users</li>
                <li>Comply with Minecraft's EULA and Mojang's terms of service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Prohibited Activities</h2>
              <p className="text-gray-300 leading-relaxed">The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-3">
                <li>Hosting illegal content or engaging in illegal activities</li>
                <li>Distributing malware, viruses, or harmful code</li>
                <li>Launching DDoS attacks or attempting to compromise other systems</li>
                <li>Reselling our services without authorization</li>
                <li>Using excessive resources that negatively impact other users</li>
                <li>Harassment, abuse, or threatening behavior towards staff or users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                All payments are processed securely. Services are billed on a monthly basis unless otherwise specified. Prices are listed in PKR (Pakistani Rupees) and are subject to change with prior notice. Failure to pay may result in service suspension.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Service Availability</h2>
              <p className="text-gray-300 leading-relaxed">
                We strive to maintain 99.9% uptime for all services. However, we do not guarantee uninterrupted service and are not liable for any downtime due to maintenance, technical issues, or circumstances beyond our control. Scheduled maintenance will be announced in advance via Discord.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of these terms. You may cancel your service at any time through our Discord support. Upon termination, your data may be deleted after a grace period of 7 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                Diamond Host shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the services in the past 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about these Terms of Service, please contact us through our Discord server at{' '}
                <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                  discord.gg/tKDRWYNcuE
                </a>{' '}
                or email us at support@diamondhost.pk
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
