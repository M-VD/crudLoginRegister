import { Request, Response } from 'express'

import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  getProducts,
} from '../service/product.service'

export async function createProductHandler(req: Request, res: Response) {
  const userId = res.locals.user
  const body = req.body

  const product = await createProduct({ ...body, user: userId })

  return res.send(product)
}

export async function updateProductHandler(req: Request, res: Response) {
  const _id = req.params.productId

  const update = req.body
  //console.log('userid', userId)
  const product = await findProduct({ _id })

  if (!product) {
    return res.sendStatus(404)
  }
  //console.log('upProduct', product)

  const updatedProduct = await findAndUpdateProduct({ _id }, update, {
    new: true,
  })

  return res.send(updatedProduct)
}

export async function getProductsHandler(req: Request, res: Response) {
  const products = await getProducts()

  if (!products) {
    return res.sendStatus(404)
  }

  return res.send(products)
}
export async function getProductHandler(req: Request, res: Response) {
  const _id = req.params.productId
  const product = await findProduct({ _id })

  if (!product) {
    return res.sendStatus(404)
  }

  return res.send(product)
}

export async function deleteProductHandler(req: Request, res: Response) {
  const _id = req.params.productId

  const product = await findProduct({ _id })

  if (!product) {
    return res.sendStatus(404)
  }

  await deleteProduct({ _id })

  return res.sendStatus(200)
}
