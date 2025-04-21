export type RegisterForm = {
  fullName: string
  phone: number
  email: string
  password: string
}
export type LoginForm = {
  email: string
  password: string
}
export type OrderDetail = {
  id: string
  totalPrice: string
  totalItem: string
  orderStatus: string
  date: string
  userName?: string
}
export type ProductSize = {
  color: string
  size: string
  quantity: number
}
export type ProductFormAdd = {
  productName: string
  title: string
  described: string
  price: number
  sale: number
  category: string
  userId ?: number
  productSizeRequests: ProductSize[]
  files: string[]
}
export type ShopForm = {
  name: string
  hotline: string
  street: string
  commune: string
  district: string
  conscious: string
  userId  : number
  file: string
}
export type AddManager = {
  fullName : string
  email : string
  password : string
  phone : number
}
export type CategoryForm = {
  category : string
  id?: string
}
export type DiscountCodeForm = {
  code : string
  rate : number
  date : number
}
export type ProductListForm = {
  id : string
  productName : string
  image : string
  sale : number
  price : number
  flashSale : boolean
}
