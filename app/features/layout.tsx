import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - DiamondHost Minecraft Server Hosting',
  description: 'Discover DiamondHost features: Intel Platinum & AMD EPYC processors, DDoS protection, 99.9% uptime, instant setup, 24/7 support, multiple payment methods including Easypaisa, JazzCash & PayPal.',
  keywords: ['minecraft hosting features', 'ddos protection minecraft', 'intel platinum server', 'amd epyc minecraft', 'diamondhost features', '24/7 support minecraft'],
  openGraph: {
    title: 'Features | DiamondHost Minecraft Hosting',
    description: 'Premium features: DDoS protection, 99.9% uptime, instant setup & 24/7 support.',
    url: 'https://www.diamondhost.site/features',
  },
  alternates: {
    canonical: 'https://www.diamondhost.site/features',
  },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
