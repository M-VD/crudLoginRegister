import express from 'express'
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsHandler,
} from '../controllers/product.controller'
import requireUser from '../middleware/requireUser'

const router = express.Router()

router
  .route('/api/products')
  .post(requireUser, createProductHandler)
  .get(requireUser, getProductsHandler)

router.put('/api/products/:productId', updateProductHandler)

router.get(
  '/api/products/:productId',
  requireUser,

  getProductHandler
)

router.delete(
  '/api/products/:productId',

  deleteProductHandler
)

export default router
