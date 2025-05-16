import { UserForm } from './UserForm'
interface AddressForm {
  street: string
  commune: string
  district: string
  conscious: string
}
export interface UserAndAddressResponse extends UserForm {
  addresses: AddressForm
}
export type OrderDetailResponse = {
  id: string
  totalPrice: number
  totalItem: number
  orderStatus: string
  date: string
  userName: string
  itemResponseList: ItemResponse[]
  orderTotal ?: number
}
export interface OrderResponse extends OrderDetailResponse{
  address : AddressForm
  email : string
  phone : string
  itemResponseList : ItemResponse[]
}
export interface ItemResponse {
    productId: string
    name: string
    totalPrice: number
    size: string
    quantity: number
    image: string
    color: string
}
