
export interface OderRequest {
  userId: number
  totalItems: number
  totalPrice: number
  comment: string
  orderItemRequests: OrderItemRequest[]
}
 export interface OrderItemRequest {
  productId: string
  color: string
  size: string
  quantity: number
}
export interface UserAddressRequest {
  street: string
  commune: string
  district: string
  conscious: string
  comment: string
}
export interface AddressRequest {
  street: string
  commune: string
  district: string
  conscious: string
  email : string
}
export interface UserUpdateRequest {
  street: string
  commune: string
  district: string
  conscious: string
  fullName: string
  phone: string
  images: string
  email: string
}
