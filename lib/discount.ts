export type DiscountPlanMode = 'inherit' | 'custom' | 'none'

export interface GlobalDiscountRule {
  enabled: boolean
  percentage: number
}

export interface PlanDiscountRule {
  mode: DiscountPlanMode
  percentage: number
}

export interface SiteDiscountConfig {
  global: GlobalDiscountRule
  plans: Record<string, PlanDiscountRule>
  updatedAt: string
}

export const DEFAULT_GLOBAL_DISCOUNT_RULE: GlobalDiscountRule = {
  enabled: false,
  percentage: 0,
}

export const DEFAULT_PLAN_DISCOUNT_RULE: PlanDiscountRule = {
  mode: 'inherit',
  percentage: 0,
}

export const DEFAULT_SITE_DISCOUNT_CONFIG: SiteDiscountConfig = {
  global: DEFAULT_GLOBAL_DISCOUNT_RULE,
  plans: {},
  updatedAt: '',
}

export const SITE_DISCOUNT_STORAGE_KEY = 'diamondhost-site-discounts'
export const SITE_DISCOUNT_BUCKET = 'order-screenshots'
export const SITE_DISCOUNT_CONFIG_PATH = 'site-settings/discount-config.json'

export function isDiscountPlanMode(value: unknown): value is DiscountPlanMode {
  return value === 'inherit' || value === 'custom' || value === 'none'
}

export function normalizeDiscountPercentage(value: unknown) {
  const numericValue =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseFloat(value)
        : 0

  if (!Number.isFinite(numericValue)) {
    return 0
  }

  return Math.max(0, Math.min(100, Math.round(numericValue)))
}

export function normalizePlanDiscountRule(value: unknown): PlanDiscountRule {
  if (!value || typeof value !== 'object') {
    return DEFAULT_PLAN_DISCOUNT_RULE
  }

  const candidate = value as Partial<PlanDiscountRule>

  return {
    mode: isDiscountPlanMode(candidate.mode) ? candidate.mode : 'inherit',
    percentage: normalizeDiscountPercentage(candidate.percentage),
  }
}

export function normalizeSiteDiscountConfig(value: unknown): SiteDiscountConfig {
  if (!value || typeof value !== 'object') {
    return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
  }

  const candidate = value as Partial<SiteDiscountConfig> & {
    global?: Partial<GlobalDiscountRule>
    plans?: Record<string, unknown>
  }

  const normalizedPlans = Object.fromEntries(
    Object.entries(candidate.plans || {})
      .filter(([planId]) => typeof planId === 'string' && planId.trim().length > 0)
      .map(([planId, rule]) => [planId, normalizePlanDiscountRule(rule)]),
  )

  return {
    global: {
      enabled: Boolean(candidate.global?.enabled),
      percentage: normalizeDiscountPercentage(candidate.global?.percentage),
    },
    plans: normalizedPlans,
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : '',
  }
}

export function cloneSiteDiscountConfig(config: SiteDiscountConfig) {
  return {
    global: { ...config.global },
    plans: Object.fromEntries(
      Object.entries(config.plans).map(([planId, rule]) => [
        planId,
        { mode: rule.mode, percentage: rule.percentage },
      ]),
    ),
    updatedAt: config.updatedAt,
  }
}

export function resolvePlanDiscountPercentage(
  config: SiteDiscountConfig,
  planId: string | null | undefined,
) {
  if (planId) {
    const planRule = config.plans[planId]

    if (planRule?.mode === 'none') {
      return 0
    }

    if (planRule?.mode === 'custom') {
      return normalizeDiscountPercentage(planRule.percentage)
    }
  }

  if (!config.global.enabled) {
    return 0
  }

  return normalizeDiscountPercentage(config.global.percentage)
}

export function applyDiscountPercentage(price: number, percentage: number) {
  const normalizedPercentage = normalizeDiscountPercentage(percentage)
  const discountedPrice = price * ((100 - normalizedPercentage) / 100)
  return Number(discountedPrice.toFixed(2))
}

export function formatDiscountBadge(percentage: number) {
  return `${normalizeDiscountPercentage(percentage)}% OFF`
}
