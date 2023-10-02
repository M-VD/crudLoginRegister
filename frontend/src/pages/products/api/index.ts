import axios from 'axios'
import { axiosPrivate } from '../../auth/api'

//import { Product } from '../types'

const base = process.env.REACT_APP_PUBLIC_API_ENDPOINT

const productBase = `${base}/products`

export async function getProducts() {
  return await axios.get(productBase)
}

export function updateProduct(payload: {
  productId: String
  title: String
  description: String
  price: Number
}) {
  const { productId } = payload
  return axios.put(`${productBase}/${productId}`, payload)
}

export function deleteProduct(productId: string) {
  return axios.delete(`${productBase}/${productId}`)
}

export function createProduct(payload: {
  title: String
  description: String
  price: Number
}) {
  return axiosPrivate.post('/products', payload)
}
