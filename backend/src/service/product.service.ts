import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import ProductModel, { ProductInput } from '../models/product.model'

export async function createProduct(input: ProductInput) {
  try {
    const result = await ProductModel.create(input)

    return result
  } catch (e) {
    throw e
  }
}
export async function getProducts() {
  try {
    const result = await ProductModel.find()

    return result
  } catch (e) {
    throw e
  }
}
export async function findProduct(
  query: FilterQuery<ProductInput>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await ProductModel.findOne(query, {}, options)

    return result
  } catch (e) {
    throw e
  }
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductInput>,
  update: UpdateQuery<ProductInput>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options)
}

export async function deleteProduct(query: FilterQuery<ProductInput>) {
  return ProductModel.deleteOne(query)
}
