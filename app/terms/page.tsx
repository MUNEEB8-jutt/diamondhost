'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
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
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="theme-heading text-4xl md:text-5xl">Terms of Service</h1>
                  <p className="theme-copy mt-2 text-sm">Last updated: January 10, 2026</p>
                </div>
              </div>

              <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Diamond Host services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2>2. Description of Services</h2>
                <p>Diamond Host provides Minecraft server hosting services including but not limited to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Intel Platinum powered game servers</li>
                  <li>AMD EPYC powered game servers</li>
                  <li>DDoS protection</li>
                  <li>24/7 technical support via Discord</li>
                  <li>Server management tools and control panel access</li>
                </ul>
              </section>

              <section>
                <h2>3. User Responsibilities</h2>
                <p>As a user of Diamond Host, you agree to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                  <li>Not host content that violates intellectual property rights</li>
                  <li>Not engage in activities that could harm our infrastructure or other users</li>
                  <li>Comply with Minecraft EULA and Mojang terms of service</li>
                </ul>
              </section>

              <section>
                <h2>4. Prohibited Activities</h2>
                <p>The following activities are strictly prohibited:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Hosting illegal content or engaging in illegal activities</li>
                  <li>Distributing malware, viruses, or harmful code</li>
                  <li>Launching DDoS attacks or attempting to compromise other systems</li>
                  <li>Reselling our services without authorization</li>
                  <li>Using excessive resources that negatively impact other users</li>
                  <li>Harassment, abuse, or threatening behavior towards staff or users</li>
                </ul>
              </section>

              <section>
                <h2>5. Payment Terms</h2>
                <p>
                  Services are billed monthly unless otherwise specified. Prices are listed in PKR and may change with prior notice. Failure to pay may result in service suspension.
                </p>
              </section>

              <section>
                <h2>6. Service Availability</h2>
                <p>
                  We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted service and are not liable for downtime caused by maintenance, technical issues, or events beyond our control.
                </p>
              </section>

              <section>
                <h2>7. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account at any time for violation of these terms. You may cancel your service at any time through Discord support.
                </p>
              </section>

              <section>
                <h2>8. Limitation of Liability</h2>
                <p>
                  Diamond Host shall not be liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the services in the past 30 days.
                </p>
              </section>

              <section>
                <h2>9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2>10. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us through Discord at{' '}
                  <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer">
                    discord.gg/tKDRWYNcuE
                  </a>{' '}
                  or email us at support@diamondhost.site.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
