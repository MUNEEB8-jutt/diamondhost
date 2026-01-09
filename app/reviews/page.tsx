'use client'

import Header from '../components/Header'
import Reviews from '../components/Reviews'
import PaymentMethods from '../components/PaymentMethods'
import Footer from '../components/Footer'
import Background from '../components/Background'

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-950 relative">
      <Background />
      <div className="relative z-10">
        <Header />
        <div className="pt-20">
          <Reviews />
          <PaymentMethods />
        </div>
        <Footer />
      </div>
    </main>
  )
}
