export type SiteThemeMode = 'normal' | 'eid'

export interface SiteThemeConfig {
  mode: SiteThemeMode
  updatedAt: string
}

export const DEFAULT_SITE_THEME_MODE: SiteThemeMode = 'normal'

export const DEFAULT_SITE_THEME_CONFIG: SiteThemeConfig = {
  mode: DEFAULT_SITE_THEME_MODE,
  updatedAt: '',
}

export const SITE_THEME_STORAGE_KEY = 'diamondhost-site-theme'
export const SITE_THEME_BUCKET = 'order-screenshots'
export const SITE_THEME_CONFIG_PATH = 'site-settings/theme-config.json'

export function isSiteThemeMode(value: unknown): value is SiteThemeMode {
  return value === 'normal' || value === 'eid'
}

export function normalizeSiteThemeConfig(value: unknown): SiteThemeConfig {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SITE_THEME_CONFIG
  }

  const candidate = value as Partial<SiteThemeConfig>

  if (!isSiteThemeMode(candidate.mode)) {
    return DEFAULT_SITE_THEME_CONFIG
  }

  return {
    mode: candidate.mode,
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : '',
  }
}
