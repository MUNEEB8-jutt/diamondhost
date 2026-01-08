import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diamond Host - Pakistan\'s First Minecraft Hosting',
  description: 'Premium Minecraft server hosting with high performance, 24/7 support, and UAE-based servers. Get your server running in minutes!',
  keywords: 'minecraft hosting, pakistan minecraft hosting, game server hosting, minecraft server, premium hosting',
  authors: [{ name: 'Diamond Host' }],
  openGraph: {
    title: 'Diamond Host - Pakistan\'s First Minecraft Hosting',
    description: 'Premium Minecraft server hosting with high performance and 24/7 support',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}