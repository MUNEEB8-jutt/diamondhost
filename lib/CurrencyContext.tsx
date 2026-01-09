'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Currency = 'USD' | 'INR' | 'PKR'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (usdPrice: number) => string
  symbol: string
}

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  INR: 83,
  PKR: 278,
}

const symbols: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  PKR: 'Rs',
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  const convertPrice = (usdPrice: number): string => {
    const converted = usdPrice * exchangeRates[currency]
    if (currency === 'USD') {
      return converted.toFixed(2)
    }
    return Math.round(converted).toLocaleString()
  }

  const symbol = symbols[currency]

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, symbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
