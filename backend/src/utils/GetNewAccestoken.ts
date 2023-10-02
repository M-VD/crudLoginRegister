import SessionModel from '../models/session.model'
import { findUser } from '../service/user.service'
import { signJwtAccess, verifyJwtRefresh } from './jwt.utils'

export async function GetNewAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  const { decoded, expired }: any = verifyJwtRefresh(refreshToken)

  if (!decoded) return 'refreshToken not found'

  const session = await SessionModel.findById(decoded)

  if (!session || !session.valid) return 'session not found'

  const user = await findUser({ _id: session.user })

  if (!user) return 'user not found'

  const accessToken = signJwtAccess({
    userID: decoded.userID,
    sessionID: decoded.sessionID,
  })

  return accessToken
}
