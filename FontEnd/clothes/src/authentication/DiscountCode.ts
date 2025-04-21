import { DiscountCodeForm } from "../utils/Form";
import { SuccessResponse } from "../utils/SuccessResponse";
import Http from "./Http";
type CodeForm = {
    code : string
    rate : number
    firstDate : string
    lastDate : string
}
export const DiscountCodeApi = {
    GetAllDiscountCode : () => Http.get<SuccessResponse<CodeForm[]>>("admin/discountcode"),
    SaveDiscountCode : (body : DiscountCodeForm) => Http.post('admin/discountcode',body),
    DeleteDiscountCode : (path : string) => Http.get(`admin/discountcode/${path}`)
}