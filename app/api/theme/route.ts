import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdminSessionTokenAgainstKnownSecrets } from '@/lib/adminAuth'
import {
  DEFAULT_SITE_THEME_CONFIG,
  isSiteThemeMode,
  normalizeSiteThemeConfig,
  SITE_THEME_BUCKET,
  SITE_THEME_CONFIG_PATH,
} from '@/lib/theme'

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

async function readThemeConfig() {
  const supabase = getServerSupabaseClient()

  if (!supabase) {
    return DEFAULT_SITE_THEME_CONFIG
  }

  try {
    const { data, error } = await supabase.storage
      .from(SITE_THEME_BUCKET)
      .download(SITE_THEME_CONFIG_PATH)

    if (error || !data) {
      return DEFAULT_SITE_THEME_CONFIG
    }

    const rawText = await data.text()
    return normalizeSiteThemeConfig(JSON.parse(rawText))
  } catch {
    return DEFAULT_SITE_THEME_CONFIG
  }
}

async function writeThemeConfig(mode: 'normal' | 'eid') {
  const supabase = getServerSupabaseClient()

  if (!supabase) {
    throw new Error('Server storage is not configured')
  }

  const config = {
    mode,
    updatedAt: new Date().toISOString(),
  }

  const { error } = await supabase.storage.from(SITE_THEME_BUCKET).upload(
    SITE_THEME_CONFIG_PATH,
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
  const config = await readThemeConfig()

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
      { ...DEFAULT_SITE_THEME_CONFIG, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const { mode } = await request.json()

    if (!isSiteThemeMode(mode)) {
      return NextResponse.json(
        { ...DEFAULT_SITE_THEME_CONFIG, error: 'Invalid theme mode' },
        { status: 400 },
      )
    }

    const config = await writeThemeConfig(mode)
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json(
      {
        ...DEFAULT_SITE_THEME_CONFIG,
        error: error instanceof Error ? error.message : 'Failed to save theme',
      },
      { status: 500 },
    )
  }
}
