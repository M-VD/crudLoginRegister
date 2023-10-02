import { Request, Response } from 'express'

import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service'

import UserModel from '../models/user.model'
import { signJwtAccess, signJwtRefresh } from '../utils/jwt.utils'
import { validatePassword } from '../utils/bcrypt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  /*   console.log("passss", validatePassword(password, user)); */
  if (!user || !validatePassword(password, user)) {
    return res.send('Invalid email or password')
  }

  // create a session
  const session = await createSession(
    user._id.toString(),
    req.get('user-agent') || ''
  )
  //console.log('session', session)
  // create an access token

  const accessToken = signJwtAccess({
    userID: user._id,
    sessionID: session._id,
  })
  console.log('accessToken', accessToken)

  //console.log('accessToken', accessToken)
  // create a refresh token
  const refreshToken = signJwtRefresh({
    userID: user._id,
    sessionID: session._id,
  })
  //console.log('refreshToken', refreshToken)
  // return access & refresh tokens

  // Creates Secure Cookie with refresh token

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',

    //need to be strict to prevent crsf attacks
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  })
  return res.send({ accessToken, refreshToken })
}
export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user

  const sessions = await findSessions({ user: userId, valid: true })
  console.log('userId', userId)
  console.log('works', sessions)
  return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.sessions
  //console.log('sessionId', sessionId)
  await updateSession({ _id: sessionId }, { valid: false })
  res.clearCookie('jwt', {
    //so the frontend doesnt have acces to it
    httpOnly: true,
    //so the cookie doesnt folllow through links
    sameSite: 'strict',
    //secure: true,
  })
  return res.send({
    accessToken: null,
    refreshToken: null,
  })
}
