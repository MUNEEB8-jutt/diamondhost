'use client'

import Navbar from '../components/Navbar'
import PricingCards from '../components/PricingCards'
import Footer from '../components/Footer'
import Background from '../components/Background'

export default function PlansPage() {
  return (
    <main className="site-shell relative">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <PricingCards />
        </div>
        <Footer />
      </div>
    </main>
  )
}
