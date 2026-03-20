'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_SITE_THEME_CONFIG,
  DEFAULT_SITE_THEME_MODE,
  normalizeSiteThemeConfig,
  SITE_THEME_STORAGE_KEY,
  SiteThemeConfig,
  SiteThemeMode,
} from './theme'

interface ThemeContextValue {
  theme: SiteThemeMode
  loading: boolean
  updatedAt: string
  refreshTheme: () => Promise<SiteThemeConfig>
  saveTheme: (mode: SiteThemeMode, adminToken: string) => Promise<SiteThemeConfig>
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyThemeToDocument(mode: SiteThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = mode
}

function readCachedThemeMode() {
  if (typeof window === 'undefined') {
    return DEFAULT_SITE_THEME_MODE
  }

  const cachedMode = window.localStorage.getItem(SITE_THEME_STORAGE_KEY)
  return cachedMode === 'eid' || cachedMode === 'normal'
    ? cachedMode
    : DEFAULT_SITE_THEME_MODE
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<SiteThemeMode>(DEFAULT_SITE_THEME_MODE)
  const [updatedAt, setUpdatedAt] = useState(DEFAULT_SITE_THEME_CONFIG.updatedAt)
  const [loading, setLoading] = useState(true)

  const syncTheme = (config: SiteThemeConfig) => {
    setTheme(config.mode)
    setUpdatedAt(config.updatedAt)
    applyThemeToDocument(config.mode)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SITE_THEME_STORAGE_KEY, config.mode)
    }
  }

  const refreshTheme = async () => {
    try {
      const response = await fetch('/api/theme', {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to load theme settings')
      }

      const data = normalizeSiteThemeConfig(await response.json())
      syncTheme(data)
      return data
    } catch {
      const fallbackConfig: SiteThemeConfig = {
        mode: readCachedThemeMode(),
        updatedAt: updatedAt || '',
      }
      syncTheme(fallbackConfig)
      return fallbackConfig
    } finally {
      setLoading(false)
    }
  }

  const saveTheme = async (mode: SiteThemeMode, adminToken: string) => {
    const response = await fetch('/api/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ mode }),
    })

    const payload = await response.json()
    const data = normalizeSiteThemeConfig(payload)

    if (!response.ok) {
      throw new Error(
        typeof payload?.error === 'string' ? payload.error : 'Failed to save theme',
      )
    }

    syncTheme(data)
    return data
  }

  useEffect(() => {
    const cachedMode = readCachedThemeMode()
    applyThemeToDocument(cachedMode)
    setTheme(cachedMode)
    void refreshTheme()
  }, [])

  const value = useMemo(
    () => ({
      theme,
      loading,
      updatedAt,
      refreshTheme,
      saveTheme,
    }),
    [theme, loading, updatedAt],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
