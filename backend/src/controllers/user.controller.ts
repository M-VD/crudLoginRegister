import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import {
  createUser,
  findUserByEmail,
  findUserById,
} from '../service/user.service'
import logger from '../utils/logger'
import UserModel from '../models/user.model'

export async function createUserHandler(req: Request, res: Response) {
  const { firstName, lastName, email, password, passwordConfirmation } =
    req.body
  console.log('user', req.body)
  //const user = await createUser(req.body)
  //console.log("user", user);

  const user = await UserModel.findOne({ email: email }).select('-password')
  if (user) {
    res.send({ status: 'failed', message: 'Email already exists' })
  } else {
    if (firstName && lastName && email && password && passwordConfirmation) {
      console.log('user', req.body)

      if (password === passwordConfirmation) {
        try {
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)

          const user = await createUser({
            firstName,
            lastName,
            email,

            password: hashPassword,
          })

          if (user) {
            res.status(201).json({
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            })
          }

          /* res.status(201).send({
               status: 'success',
               message: 'Registration Success',
               token: token,
             })*/
        } catch (error) {
          console.log(error)
          res.send({ status: 'failed', message: 'Unable to Register' })
        }
      } else {
        res.send({
          status: 'failed',
          message: "Password and Confirm Password doesn't match",
        })
      }
    } else {
      res.send({ status: 'failed', message: 'All fields are required' })
    }
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const id = res.locals.user
  const user = await findUserById(id)

  return res.send(user)
}

export async function getUserByEmail(req: Request, res: Response) {
  const email = req.params.email
  console.log('ffffffffffffffff', email)

  const user = await findUserByEmail(email)

  if (!user) {
    return res.sendStatus(404)
  }

  return res.send(user)
}
