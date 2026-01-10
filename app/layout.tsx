import type { Metadata } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import './globals.css'
import { CurrencyProvider } from '@/lib/CurrencyContext'
import LoadingOverlay from './components/LoadingOverlay'
import CustomCursor from './components/CustomCursor'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Diamond Host - Premium Game Server Hosting',
  description: 'Premium Minecraft server hosting with high performance, 24/7 support, and global servers. Get your server running in minutes!',
  keywords: 'minecraft hosting, game server hosting, minecraft server, premium hosting, ddos protection',
  authors: [{ name: 'Diamond Host' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Diamond Host - Premium Game Server Hosting',
    description: 'Premium Minecraft server hosting with high performance and 24/7 support',
    type: 'website',
    images: [
      {
        url: '/linklogo.png',
        width: 1200,
        height: 630,
        alt: 'Diamond Host - Premium Game Server Hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diamond Host - Premium Game Server Hosting',
    description: 'Premium Minecraft server hosting with high performance and 24/7 support',
    images: ['/linklogo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} font-sans`}>
        <CurrencyProvider>
          <CustomCursor />
          <LoadingOverlay />
          {children}
        </CurrencyProvider>
      </body>
    </html>
  )
}
