import { Request, Response, NextFunction } from 'express'

import { verifyJwtAccess } from '../utils/jwt.utils'

import { GetNewAccessToken } from '../utils/GetNewAccestoken'

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`)
  //console.log('req', req)
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  const refreshToken = cookies.jwt

  const authHeader = req.headers.authorization
  console.log('req.headers.Authorization', req.headers.Authorization)
  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(403)
  }

  const accessToken = authHeader?.split(' ')[1]

  if (!accessToken) {
    return next()
  }

  const { decoded, expired }: any = verifyJwtAccess(accessToken)

  if (decoded) {
    res.locals.user = decoded.userID
    res.locals.sessions = decoded.sessionID
    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await GetNewAccessToken({ refreshToken })

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }
    const result = verifyJwtAccess(newAccessToken)
    res.locals.user = decoded.userID
    res.locals.sessions = decoded.sessionID

    //console.log('res.locals.sessions', res.locals.sessions)
    return next()
  }

  return next()
}

export default requireUser
