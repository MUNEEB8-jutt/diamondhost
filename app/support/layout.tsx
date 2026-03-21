import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Support Center',
  description:
    'Contact Diamond Host support, manage hosting tickets, and reach the team through the polished frontend support experience.',
  alternates: {
    canonical: 'https://www.diamondhost.site/support',
  },
}

export default function SupportLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
