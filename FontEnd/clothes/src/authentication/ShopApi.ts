import { AddManager, ShopForm } from "../utils/Form";
import { SuccessResponse } from "../utils/SuccessResponse";
import Http from "./Http";

export const ShopApi = {
    CreateShopApi : (body : ShopForm) => Http.post<SuccessResponse<string>>("admin/shop/createShop",body),
    AddManager : (body : AddManager) => Http.post<SuccessResponse<string>>('admin/user',body),
    GetShopApi : (body : string) => Http.get(`admin/shop/findShop/${body}`)
}