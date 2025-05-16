
export type DataFormPage<T> = {
  number: number
  size: number
  totalPages: number
  totalElement: number
  first: boolean
  last: boolean
  data: T
}
export type ParamsFormPoduct = {
  page?: number
  size?: number
  status: boolean
  category?: string
  sort?: string
  sortType?: string
}
export type Shop = {
  id: number
  name: string
  image: string
}
export type ProductSize = {
  id: string
  size: string
  quantity: number
  color : string
}
export type FormProductDetailResponse = {
  id: string
  productName: string
  title: string
  described: string
  images: string
  price: number
  sale: number
  rated: number
  flashSale: boolean
  shop: Shop
  productSize: ProductSize[]
  listImages: string[]
}
export type AddCartRequest = {
  userId: number;
  productId: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}
export type CartResponse = {
  productId: string
  size: string
  quantity: number
  color: string
  price: number
  name: string
  image: string
  flashSale : boolean
  sale : number
}