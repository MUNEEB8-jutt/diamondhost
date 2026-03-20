import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdminSessionTokenAgainstKnownSecrets } from '@/lib/adminAuth'
import {
  cloneSiteDiscountConfig,
  DEFAULT_SITE_DISCOUNT_CONFIG,
  normalizeSiteDiscountConfig,
  SITE_DISCOUNT_BUCKET,
  SITE_DISCOUNT_CONFIG_PATH,
} from '@/lib/discount'

function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

async function readDiscountConfig() {
  const supabase = getServerSupabaseClient()

  if (!supabase) {
    return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
  }

  try {
    const { data, error } = await supabase.storage
      .from(SITE_DISCOUNT_BUCKET)
      .download(SITE_DISCOUNT_CONFIG_PATH)

    if (error || !data) {
      return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
    }

    const rawText = await data.text()
    return normalizeSiteDiscountConfig(JSON.parse(rawText))
  } catch {
    return cloneSiteDiscountConfig(DEFAULT_SITE_DISCOUNT_CONFIG)
  }
}

async function writeDiscountConfig(input: unknown) {
  const supabase = getServerSupabaseClient()

  if (!supabase) {
    throw new Error('Server storage is not configured')
  }

  const normalizedInput = normalizeSiteDiscountConfig(input)
  const config = {
    global: normalizedInput.global,
    plans: normalizedInput.plans,
    updatedAt: new Date().toISOString(),
  }

  const { error } = await supabase.storage.from(SITE_DISCOUNT_BUCKET).upload(
    SITE_DISCOUNT_CONFIG_PATH,
    new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }),
    {
      upsert: true,
      contentType: 'application/json',
      cacheControl: '60',
    },
  )

  if (error) {
    throw new Error(error.message)
  }

  return config
}

export async function GET() {
  const config = await readDiscountConfig()

  return NextResponse.json(config, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace(/^Bearer\s+/i, '') || null

  if (!verifyAdminSessionTokenAgainstKnownSecrets(token)) {
    return NextResponse.json(
      { ...DEFAULT_SITE_DISCOUNT_CONFIG, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const input = await request.json()
    const config = await writeDiscountConfig(input)

    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json(
      {
        ...DEFAULT_SITE_DISCOUNT_CONFIG,
        error:
          error instanceof Error ? error.message : 'Failed to save discount settings',
      },
      { status: 500 },
    )
  }
}
