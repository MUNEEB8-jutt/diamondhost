import crypto from 'crypto'

interface AdminTokenPayload {
  scope: 'admin'
  exp: number
  iat: number
}

export const DEFAULT_ADMIN_SECRET = '#D!I*A@M$O&N%Dtaxi'

function signPayload(payload: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

function unwrapQuotedSecret(value: string) {
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.slice(1, -1).trim()
  }

  return value
}

function collectSecretVariants(rawValue: string) {
  const variants = new Set<string>()
  const queue = [rawValue]

  while (queue.length > 0) {
    const current = queue.shift()

    if (typeof current !== 'string') {
      continue
    }

    const trimmed = current.trim()

    if (!trimmed || variants.has(trimmed)) {
      continue
    }

    variants.add(trimmed)

    const unquoted = unwrapQuotedSecret(trimmed)
    if (unquoted && unquoted !== trimmed) {
      queue.push(unquoted)
    }

    const assignmentMatch = trimmed.match(/(?:^|[\s:])ADMIN_SECRET\s*=\s*(.+)$/i)
    if (assignmentMatch?.[1]) {
      queue.push(assignmentMatch[1])
    }

    const labelMatch = trimmed.match(/^admin_secret\s*:\s*(.+)$/i)
    if (labelMatch?.[1]) {
      queue.push(labelMatch[1])
    }
  }

  return Array.from(variants)
}

export function getAdminSecretCandidates() {
  return Array.from(
    new Set([
      ...collectSecretVariants(process.env.ADMIN_SECRET || ''),
      ...collectSecretVariants(DEFAULT_ADMIN_SECRET),
    ]),
  )
}

export function matchAdminSecret(secretCode: unknown) {
  if (typeof secretCode !== 'string') {
    return null
  }

  const knownSecrets = new Set(getAdminSecretCandidates())

  for (const candidate of collectSecretVariants(secretCode)) {
    if (knownSecrets.has(candidate)) {
      return candidate
    }
  }

  return null
}

export function createAdminSessionToken(secret: string, expiresAt: number) {
  const payload: AdminTokenPayload = {
    scope: 'admin',
    exp: expiresAt,
    iat: Date.now(),
  }

  const payloadString = JSON.stringify(payload)
  const encodedPayload = Buffer.from(payloadString).toString('base64url')
  const signature = signPayload(payloadString, secret)

  return `${encodedPayload}.${signature}`
}

export function verifyAdminSessionToken(token: string | null | undefined, secret: string) {
  if (!token) {
    return null
  }

  const [encodedPayload, providedSignature] = token.split('.')

  if (!encodedPayload || !providedSignature) {
    return null
  }

  let payloadString = ''

  try {
    payloadString = Buffer.from(encodedPayload, 'base64url').toString('utf8')
  } catch {
    return null
  }

  const expectedSignature = signPayload(payloadString, secret)
  const providedBuffer = Buffer.from(providedSignature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(payloadString) as AdminTokenPayload

    if (payload.scope !== 'admin' || typeof payload.exp !== 'number') {
      return null
    }

    if (payload.exp <= Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function verifyAdminSessionTokenAgainstKnownSecrets(token: string | null | undefined) {
  for (const secret of getAdminSecretCandidates()) {
    const payload = verifyAdminSessionToken(token, secret)

    if (payload) {
      return payload
    }
  }

  return null
}
