//import { customAlphabet } from 'nanoid'

import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  index,
  Ref,
} from '@typegoose/typegoose'
import { User } from './user.model'
//const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface ProductInput {
  user: object
  title: string
  description: string
  price: number
  createdAt?: Date
  updatedAt?: Date
}

@index({ title: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Product {
  /* @prop({
    required: true,
    unique: true,
    default: () => `product_${nanoid()}`,
  })
  productId: string*/

  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  title: string

  @prop({ type: String, required: true })
  description: String

  @prop({ required: true })
  price: Number

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date
}

const ProductModel = getModelForClass(Product)

export default ProductModel
