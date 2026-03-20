'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="theme-heading text-4xl md:text-5xl">Privacy Policy</h1>
                  <p className="theme-copy mt-2 text-sm">Last updated: January 10, 2026</p>
                </div>
              </div>

              <section>
                <h2>1. Introduction</h2>
                <p>
                  Diamond Host ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Minecraft hosting services.
                </p>
              </section>

              <section>
                <h2>2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>

                <h3>Personal Information</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Name and email address</li>
                  <li>Discord username and ID</li>
                  <li>Payment information processed securely through third-party providers</li>
                  <li>IP address and location data</li>
                </ul>

                <h3>Technical Information</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Server usage statistics and logs</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Connection timestamps</li>
                </ul>
              </section>

              <section>
                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information for:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Providing and maintaining our hosting services</li>
                  <li>Processing payments and managing subscriptions</li>
                  <li>Communicating with you about service updates and support</li>
                  <li>Improving our services and user experience</li>
                  <li>Detecting and preventing fraud or abuse</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2>4. Data Storage and Security</h2>
                <p>
                  Your data is stored on secure servers located in UAE, India, and Germany. We implement industry-standard security measures including SSL or TLS encryption, encrypted storage for sensitive information, regular audits, access controls, and DDoS protection.
                </p>
              </section>

              <section>
                <h2>5. Data Sharing</h2>
                <p>We do not sell your personal information. We may share your data with payment processors, service providers who assist our operations, and law enforcement when required by law.</p>
              </section>

              <section>
                <h2>6. Your Rights</h2>
                <p>You have the right to access, correct, delete, export, or limit certain uses of your personal data.</p>
              </section>

              <section>
                <h2>7. Cookies</h2>
                <p>
                  We use essential cookies to ensure proper functioning of our website. These cookies do not track personal information and are necessary for service delivery.
                </p>
              </section>

              <section>
                <h2>8. Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2>9. Data Retention</h2>
                <p>
                  We retain your personal data for as long as your account is active or as needed to provide services. After account termination, we may retain certain data for up to 30 days for backup purposes.
                </p>
              </section>

              <section>
                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the last updated date.
                </p>
              </section>

              <section>
                <h2>11. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us through Discord at{' '}
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
