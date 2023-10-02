import { Express, Request, Response } from 'express'
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsHandler,
} from './controllers/product.controller'

import {
  deleteSessionHandler,
  getUserSessionsHandler,
  createUserSessionHandler,
} from './controllers/session.controller'
import {
  createUserHandler,
  getCurrentUserHandler,
  getUserByEmail,
} from './controllers/user.controller'

import requireUser from './middleware/requireUser'

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  app.post('/api/users', createUserHandler)

  app.post(
    '/api/sessions',

    createUserSessionHandler
  )

  app.get('/api/sessions', requireUser, getUserSessionsHandler)

  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  app.post(
    '/api/products',
    requireUser,

    createProductHandler
  )

  app.put('/api/products/:productId', updateProductHandler)

  app.get(
    '/api/products/:productId',
    requireUser,

    getProductHandler
  )

  app.get('/api/products', getProductsHandler)

  app.delete(
    '/api/products/:productId',

    deleteProductHandler
  )

  app.get('/api/users/me', requireUser, getCurrentUserHandler)

  app.get('/api/users/:email', getUserByEmail)
}

export default routes
