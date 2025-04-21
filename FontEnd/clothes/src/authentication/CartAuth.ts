import { AddCartRequest, CartResponse } from '../utils/FormType'
import Http from './Http'
import { SuccessResponse } from '../utils/SuccessResponse'

interface CartUpdateQuantity {
  userId: number
  productId: string
  quantity: number
}
interface DiscountCode {
  code: string;
  firstDate: string; 
  lastDate: string;  
  rate: number;
}
export const CartApi = {
  AddToCart: (body: AddCartRequest) => Http.post('cart/addToCart', body),
  GetCart: (userId: number) => Http.get<SuccessResponse<CartResponse[]>>(`cart/findAllCart`, { params: { userId } }),
  RemoveFromCart: (userId: number, productId: string) => Http.get<SuccessResponse<string>>('cart/deleteCartItem', { params: { userId, productId } }),
  UpdateQualityCart: (params: CartUpdateQuantity) =>
    Http.get<SuccessResponse<string>>('cart/updateQuantity', { params }),
  GetDiscountCode : (data : string) => Http.get<SuccessResponse<DiscountCode>>(`cart/discountCode/${data}`),
}
