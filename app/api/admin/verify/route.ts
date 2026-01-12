import { NextRequest, NextResponse } from 'next/server'

// This runs on server only - secret key is never exposed to client
const ADMIN_SECRET = process.env.ADMIN_SECRET || '#D!I*A@M$O&N%Dtaxi'

export async function POST(request: NextRequest) {
  try {
    const { secretCode } = await request.json()
    
    if (!secretCode) {
      return NextResponse.json({ success: false, error: 'Secret code required' }, { status: 400 })
    }
    
    if (secretCode === ADMIN_SECRET) {
      // Generate a simple session token
      const sessionToken = Buffer.from(`admin_${Date.now()}_${Math.random().toString(36)}`).toString('base64')
      
      return NextResponse.json({ 
        success: true, 
        token: sessionToken,
        expires_at: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid secret code' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
