export interface Video {
  _id: string
  owner: string
  published: boolean
  videoId: string
  createdAt: Date
  updatedAt: Date
  __v: number
  extension: string
  description: string
  title: string
}

export interface Product {
  title: String
  description: String
  price: Number
  productId?: String
}

export interface Produc {
  title: String
  description: String
  price: Number
  image: String
}
export interface ProductState {
  posts: Product[]
  status: String
  error: any
}

export enum QueryKeys {
  me = 'me',
  videos = 'videos',
}

export interface Me {
  _id: string
  email: string
  username: string
}

export interface productList {
  id: String
  title: String
  description: String
  price: Number
  image: String
}
