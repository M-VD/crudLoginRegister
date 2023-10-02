import express from 'express'
import {
  createUserHandler,
  getCurrentUserHandler,
} from '../controllers/user.controller'
import requireUser from '../middleware/requireUser'

const router = express.Router()

router.post('/api/users', createUserHandler)
//router.post('/api/users/me', requireUser, getCurrentUserHandler)

export default router
