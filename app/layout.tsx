import type { Metadata, Viewport } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import './globals.css'
import { CurrencyProvider } from '@/lib/CurrencyContext'
import { AuthProvider } from '@/lib/AuthContext'
import LoadingOverlay from './components/LoadingOverlay'
import CustomCursor from './components/CustomCursor'
import AuthModal from './components/AuthModal'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06b6d4',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://diamondhost.pk'),
  title: {
    default: 'Diamond Host - Best Minecraft Server Hosting in Pakistan | Low Latency Gaming Servers',
    template: '%s | Diamond Host'
  },
  description: 'Diamond Host offers premium Minecraft server hosting in Pakistan, UAE, Singapore & Germany. Get Intel Platinum & AMD EPYC powered servers with 99.9% uptime, DDoS protection, instant setup & 24/7 support. Starting from just Rs 240/month.',
  keywords: [
    'minecraft server hosting',
    'minecraft hosting pakistan',
    'game server hosting',
    'minecraft server pakistan',
    'cheap minecraft hosting',
    'best minecraft hosting',
    'minecraft server UAE',
    'low latency minecraft server',
    'ddos protected minecraft',
    'premium minecraft hosting',
    'minecraft server rental',
    'gaming server hosting',
    'intel platinum minecraft',
    'amd epyc minecraft server',
    'minecraft hosting asia',
    'affordable minecraft server',
    'minecraft server singapore',
    'minecraft server germany',
    'diamond host',
    'diamondhost',
    'minecraft pk',
    '24/7 minecraft server',
    'instant minecraft server',
    'minecraft server cheap pakistan'
  ],
  authors: [{ name: 'Diamond Host', url: 'https://diamondhost.pk' }],
  creator: 'Diamond Host',
  publisher: 'Diamond Host',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://diamondhost.pk',
    siteName: 'Diamond Host',
    title: 'Diamond Host - Best Minecraft Server Hosting in Pakistan',
    description: 'Premium Minecraft server hosting with Intel Platinum & AMD EPYC processors. 99.9% uptime, DDoS protection, instant setup & 24/7 support. Servers in UAE, Singapore & Germany.',
    images: [
      {
        url: '/linklogo.png',
        width: 1200,
        height: 630,
        alt: 'Diamond Host - Premium Minecraft Server Hosting',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diamond Host - Best Minecraft Server Hosting',
    description: 'Premium Minecraft hosting with Intel Platinum & AMD EPYC. 99.9% uptime, DDoS protection & 24/7 support.',
    images: ['/linklogo.png'],
    creator: '@diamondhostpk',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://diamondhost.pk',
  },
  category: 'technology',
  classification: 'Game Server Hosting',
  other: {
    'google-site-verification': 'Xdq-rWVqZilANxxJr2c55PYCcNdzr-ZLNa-G_FOtbhU',
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Diamond Host',
  url: 'https://diamondhost.pk',
  logo: 'https://diamondhost.pk/linklogo.png',
  description: 'Premium Minecraft server hosting with Intel Platinum & AMD EPYC processors. Servers in UAE, Singapore & Germany.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@diamondhost.pk',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [
    'https://discord.gg/tKDRWYNcuE',
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'PKR',
    lowPrice: '240',
    highPrice: '5760',
    offerCount: '15',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Minecraft Server Hosting',
  provider: {
    '@type': 'Organization',
    name: 'Diamond Host',
  },
  description: 'Premium Minecraft server hosting with high performance Intel Platinum and AMD EPYC processors',
  areaServed: ['Pakistan', 'India', 'UAE', 'Singapore', 'Germany', 'Worldwide'],
  serviceType: 'Game Server Hosting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className={`${orbitron.variable} ${inter.variable} font-sans`}>
        <CurrencyProvider>
          <AuthProvider>
            <CustomCursor />
            <LoadingOverlay />
            <AuthModal />
            {children}
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
