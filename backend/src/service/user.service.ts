import { FilterQuery } from 'mongoose'

import UserModel, { User } from '../models/user.model'
export interface UserInput {
  email: string
  firstName: string
  lastName: string
  password: String
  /*   password?: string;
  updatedAt?: Date;
  createdAt?: Date;
  verificationCode?: string;
  verified?: boolean;
  passwordResetCode?: string | null; */
}
export function createUser(input: UserInput) {
  return UserModel.create(input)
}

export async function findUser(query: FilterQuery<User>) {
  return UserModel.findOne(query)
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email })
}
export function findUserById(id: string) {
  return UserModel.findById(id)
}
