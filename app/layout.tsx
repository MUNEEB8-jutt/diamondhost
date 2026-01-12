import type { Metadata, Viewport } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import './globals.css'
import { CurrencyProvider } from '@/lib/CurrencyContext'
import { AuthProvider } from '@/lib/AuthContext'
import LoadingOverlay from './components/LoadingOverlay'
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
  metadataBase: new URL('https://www.diamondhost.site'),
  title: {
    default: 'DiamondHost - #1 Minecraft Server Hosting Pakistan | Premium Gaming Servers',
    template: '%s | DiamondHost'
  },
  description: 'DiamondHost - Pakistan\'s best Minecraft server hosting. Premium Intel Platinum & AMD EPYC servers in UAE, India & Germany. 99.9% uptime, DDoS protection, instant setup, 24/7 support. Starting Rs 200/month. Join 500+ happy gamers!',
  keywords: [
    'diamondhost',
    'diamond host',
    'diamondhost.site',
    'minecraft server hosting',
    'minecraft hosting pakistan',
    'best minecraft hosting',
    'cheap minecraft server',
    'minecraft server pakistan',
    'game server hosting pakistan',
    'minecraft server UAE',
    'minecraft server india',
    'minecraft server germany',
    'low latency minecraft',
    'ddos protected minecraft server',
    'premium minecraft hosting',
    'intel platinum minecraft',
    'amd epyc minecraft',
    'minecraft pk',
    'minecraft hosting asia',
    'affordable minecraft server',
    '24/7 minecraft server',
    'instant minecraft setup',
    'minecraft server rental',
    'gaming server pakistan',
    'best game hosting pakistan'
  ],
  authors: [{ name: 'DiamondHost', url: 'https://www.diamondhost.site' }],
  creator: 'DiamondHost',
  publisher: 'DiamondHost',
  applicationName: 'DiamondHost',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/linklogo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/linklogo.png',
    apple: '/linklogo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.diamondhost.site',
    siteName: 'DiamondHost',
    title: 'DiamondHost - #1 Minecraft Server Hosting Pakistan',
    description: 'Pakistan\'s best Minecraft server hosting. Premium Intel Platinum & AMD EPYC servers. 99.9% uptime, DDoS protection, instant setup & 24/7 support.',
    images: [
      {
        url: 'https://www.diamondhost.site/linklogo.png',
        width: 512,
        height: 512,
        alt: 'DiamondHost - Premium Minecraft Server Hosting',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiamondHost - #1 Minecraft Server Hosting Pakistan',
    description: 'Premium Minecraft hosting with Intel Platinum & AMD EPYC. 99.9% uptime, DDoS protection & 24/7 support.',
    images: ['https://www.diamondhost.site/linklogo.png'],
    creator: '@diamondhostpk',
    site: '@diamondhostpk',
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
    canonical: 'https://www.diamondhost.site',
  },
  category: 'technology',
  classification: 'Game Server Hosting',
  other: {
    'google-site-verification': 'Xdq-rWVqZilANxxJr2c55PYCcNdzr-ZLNa-G_FOtbhU',
  },
}

// JSON-LD Structured Data - Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.diamondhost.site/#organization',
  name: 'DiamondHost',
  alternateName: ['Diamond Host', 'DiamondHost.site'],
  url: 'https://www.diamondhost.site',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.diamondhost.site/linklogo.png',
    width: 512,
    height: 512,
  },
  image: 'https://www.diamondhost.site/linklogo.png',
  description: 'DiamondHost - Pakistan\'s #1 Minecraft server hosting provider. Premium Intel Platinum & AMD EPYC servers with 99.9% uptime.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'DiamondHost Team',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@diamondhost.site',
    availableLanguage: ['English', 'Urdu', 'Hindi'],
    areaServed: ['PK', 'IN', 'AE', 'DE'],
  },
  sameAs: [
    'https://discord.gg/tKDRWYNcuE',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
}

// JSON-LD WebSite for Sitelinks Search Box
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.diamondhost.site/#website',
  name: 'DiamondHost',
  alternateName: 'Diamond Host',
  url: 'https://www.diamondhost.site',
  publisher: {
    '@id': 'https://www.diamondhost.site/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.diamondhost.site/plans?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// JSON-LD Service
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.diamondhost.site/#service',
  name: 'Minecraft Server Hosting',
  provider: {
    '@id': 'https://www.diamondhost.site/#organization',
  },
  description: 'Premium Minecraft server hosting with high performance Intel Platinum and AMD EPYC processors. DDoS protection, instant setup, 24/7 support.',
  areaServed: [
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Germany' },
  ],
  serviceType: 'Game Server Hosting',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'PKR',
    lowPrice: '200',
    highPrice: '6400',
    offerCount: '20',
    availability: 'https://schema.org/InStock',
  },
}

// JSON-LD BreadcrumbList for better navigation
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.diamondhost.site',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Plans',
      item: 'https://www.diamondhost.site/plans',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Features',
      item: 'https://www.diamondhost.site/features',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Support',
      item: 'https://www.diamondhost.site/support',
    },
  ],
}

// JSON-LD FAQ for rich snippets in Google
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is DiamondHost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiamondHost is Pakistan\'s #1 Minecraft server hosting provider offering premium Intel Platinum and AMD EPYC powered servers with 99.9% uptime, DDoS protection, and 24/7 support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Minecraft server hosting cost at DiamondHost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiamondHost Minecraft server hosting starts from just Rs 200/month for 2GB RAM. We offer plans up to 64GB RAM with prices varying based on RAM and location (UAE, India, Germany).',
      },
    },
    {
      '@type': 'Question',
      name: 'What locations are available for DiamondHost servers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiamondHost offers Minecraft servers in UAE (Dubai), India, and Germany. UAE servers use AMD EPYC processors while India and Germany use Intel Platinum processors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does DiamondHost offer DDoS protection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all DiamondHost Minecraft servers come with enterprise-grade DDoS protection included at no extra cost to keep your server safe from attacks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast is server setup at DiamondHost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiamondHost offers instant server setup. After payment confirmation, your Minecraft server is typically ready within 2-3 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods does DiamondHost accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiamondHost accepts Easypaisa, JazzCash, Bank Transfer, PayPal, and Cryptocurrency payments for maximum convenience.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Xdq-rWVqZilANxxJr2c55PYCcNdzr-ZLNa-G_FOtbhU" />
        <link rel="icon" href="/linklogo.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/linklogo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${orbitron.variable} ${inter.variable} font-sans`}>
        <CurrencyProvider>
          <AuthProvider>
            <LoadingOverlay />
            <AuthModal />
            {children}
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
