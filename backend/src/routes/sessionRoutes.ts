import express from 'express'
import {
  deleteSessionHandler,
  getUserSessionsHandler,
  createUserSessionHandler,
} from '../controllers/session.controller'
import requireUser from '../middleware/requireUser'

const router = express.Router()

router
  .route('/api/sessions')
  .post(createUserSessionHandler)
  .get(requireUser, getUserSessionsHandler)
  .delete(requireUser, getUserSessionsHandler)

export default router
