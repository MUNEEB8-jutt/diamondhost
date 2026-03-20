import { NextRequest, NextResponse } from 'next/server'
import { createAdminSessionToken, matchAdminSecret } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const { secretCode } = await request.json()
    
    if (!secretCode) {
      return NextResponse.json({ success: false, error: 'Secret code required' }, { status: 400 })
    }

    const matchedSecret = matchAdminSecret(secretCode)

    if (matchedSecret) {
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000
      const sessionToken = createAdminSessionToken(matchedSecret, expiresAt)
      
      return NextResponse.json({ 
        success: true, 
        token: sessionToken,
        expires_at: expiresAt
      })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid secret code' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
