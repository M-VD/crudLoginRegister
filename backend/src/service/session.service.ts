import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, { Session } from '../models/session.model'

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent })

  return session
}

export async function findSessions(query: FilterQuery<Session>) {
  return SessionModel.find(query).lean()
}

export async function updateSession(
  query: FilterQuery<Session>,
  update: UpdateQuery<Session>
) {
  console.log(`userId`, query)
  return SessionModel.updateOne(query, update)
}
