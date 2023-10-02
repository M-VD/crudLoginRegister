import jwt from 'jsonwebtoken'

export function signJwtAccess(payload: string | object) {
  return jwt.sign(payload, process.env.JWT_SECRET || '', {
    expiresIn: '15m',
  })
}

export function signJwtRefresh(payload: string | object) {
  return jwt.sign(payload, process.env.JWT_SECRET_REFRESH || '', {
    expiresIn: '1d',
  })
}
export function verifyJwtAccess(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    console.error(e)

    return {
      valid: false,
      expired: e.message === 'accestoken expired',
      decoded: null,
    }
  }
}
export function verifyJwtRefresh(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH || '')
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    console.error(e)

    return {
      valid: false,
      expired: e.message === 'refreshToken expired',
      decoded: null,
    }
  }
}
