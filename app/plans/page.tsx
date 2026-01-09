'use client'

import Header from '../components/Header'
import PricingCards from '../components/PricingCards'
import Footer from '../components/Footer'
import Background from '../components/Background'

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-slate-950 relative">
      <Background />
      <div className="relative z-10">
        <Header />
        <div className="pt-20">
          <PricingCards />
        </div>
        <Footer />
      </div>
    </main>
  )
}
