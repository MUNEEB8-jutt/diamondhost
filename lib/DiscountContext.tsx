'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  applyDiscountPercentage,
  cloneSiteDiscountConfig,
  DEFAULT_SITE_DISCOUNT_CONFIG,
  normalizeSiteDiscountConfig,
  resolvePlanDiscountPercentage,
  SITE_DISCOUNT_STORAGE_KEY,
  SiteDiscountConfig,
} from './discount'

interface DiscountContextValue {
  discountConfig: SiteDiscountConfig
  loading: boolean
  updatedAt: string
  refreshDiscounts: () => Promise<SiteDiscountConfig>
  saveDiscounts: (config: SiteDiscountConfig, adminToken: string) => Promise<SiteDiscountConfig>
  getPlanDiscountPercentage: (planId: string | null | undefined) => number
  getDiscountedPrice: (
    planId: string | null | undefined,
    originalPrice: number,
  ) => {
    percentage: number
    originalPrice: number
    finalPrice: number
    hasDiscount: boolean
  }
}

const DiscountContext = createContext<DiscountContextValue | undefined>(undefined)

function readCachedDiscountConfig() {
  if (typeof window === 'undefined') {
    return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
  }

  try {
    const cachedValue = window.localStorage.getItem(SITE_DISCOUNT_STORAGE_KEY)

    if (!cachedValue) {
      return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
    }

    return normalizeSiteDiscountConfig(JSON.parse(cachedValue))
  } catch {
    return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
  }
}

export function DiscountProvider({ children }: { children: React.ReactNode }) {
  const [discountConfig, setDiscountConfig] = useState<SiteDiscountConfig>(
    DEFAULT_SITE_DISCOUNT_CONFIG,
  )
  const [updatedAt, setUpdatedAt] = useState(DEFAULT_SITE_DISCOUNT_CONFIG.updatedAt)
  const [loading, setLoading] = useState(true)

  const syncDiscountConfig = (config: SiteDiscountConfig) => {
    const nextConfig = cloneSiteDiscountConfig(config)

    setDiscountConfig(nextConfig)
    setUpdatedAt(nextConfig.updatedAt)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SITE_DISCOUNT_STORAGE_KEY, JSON.stringify(nextConfig))
    }
  }

  const refreshDiscounts = async () => {
    try {
      const response = await fetch('/api/discounts', {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to load discount settings')
      }

      const data = normalizeSiteDiscountConfig(await response.json())
      syncDiscountConfig(data)
      return data
    } catch {
      const fallbackConfig = readCachedDiscountConfig()
      syncDiscountConfig(fallbackConfig)
      return fallbackConfig
    } finally {
      setLoading(false)
    }
  }

  const saveDiscounts = async (config: SiteDiscountConfig, adminToken: string) => {
    const response = await fetch('/api/discounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(config),
    })

    const payload = await response.json()
    const data = normalizeSiteDiscountConfig(payload)

    if (!response.ok) {
      throw new Error(
        typeof payload?.error === 'string' ? payload.error : 'Failed to save discount settings',
      )
    }

    syncDiscountConfig(data)
    return data
  }

  useEffect(() => {
    const cachedConfig = readCachedDiscountConfig()
    syncDiscountConfig(cachedConfig)
    void refreshDiscounts()
  }, [])

  const getPlanDiscountPercentage = (planId: string | null | undefined) =>
    resolvePlanDiscountPercentage(discountConfig, planId)

  const getDiscountedPrice = (planId: string | null | undefined, originalPrice: number) => {
    const percentage = resolvePlanDiscountPercentage(discountConfig, planId)
    const finalPrice = applyDiscountPercentage(originalPrice, percentage)

    return {
      percentage,
      originalPrice,
      finalPrice,
      hasDiscount: percentage > 0,
    }
  }

  return (
    <DiscountContext.Provider
      value={{
        discountConfig,
        loading,
        updatedAt,
        refreshDiscounts,
        saveDiscounts,
        getPlanDiscountPercentage,
        getDiscountedPrice,
      }}
    >
      {children}
    </DiscountContext.Provider>
  )
}

export function useDiscounts() {
  const context = useContext(DiscountContext)

  if (!context) {
    throw new Error('useDiscounts must be used within a DiscountProvider')
  }

  return context
}
