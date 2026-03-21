import type { Metadata } from 'next'

import Navbar from '../components/Navbar'
import Features from '../components/Features'
import PaymentMethods from '../components/PaymentMethods'
import Footer from '../components/Footer'
import Background from '../components/Background'

export const metadata: Metadata = {
  title: 'Hosting Features',
  description:
    'See Diamond Host features including premium hardware, low-latency routing, DDoS protection, instant setup, and festive Eid presentation across the public website.',
  alternates: {
    canonical: 'https://www.diamondhost.site/features',
  },
}

export default function FeaturesPage() {
  return (
    <main className="site-shell relative">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Features />
          <PaymentMethods />
        </div>
        <Footer />
      </div>
    </main>
  )
}
