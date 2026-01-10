'use client'

import Navbar from '../components/Navbar'
import Features from '../components/Features'
import PaymentMethods from '../components/PaymentMethods'
import Footer from '../components/Footer'
import Background from '../components/Background'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 relative">
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
