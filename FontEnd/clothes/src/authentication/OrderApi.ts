import { OderRequest } from "../utils/FormRequest";
import { OrderDetailResponse, OrderResponse } from "../utils/FormResponse";
import { DataFormPage } from "../utils/FormType";
import { SuccessResponse } from "../utils/SuccessResponse";
import Http from "./Http";

export const OrderApi = {
    SearchOrderApi : (id : string) => Http.get<SuccessResponse<OrderResponse>>(`order/search/${id}`),
    createOrderApi : (params : OderRequest) => Http.post<SuccessResponse<string>>("order/createOrder",params),
    GetOrderByUserID : (id : number) => Http.get<SuccessResponse<OrderDetailResponse[]>>(`order/findOrderByUserId/${id}`),
    GetAllOrder : () => Http.get<SuccessResponse<OrderDetailResponse>>("admin/order/findTotalPrice"),
    GetAllOrderByStatus : (params : {type : string, page : number,size : number}) => Http.get<SuccessResponse<DataFormPage<OrderDetailResponse[]>>>('admin/order/findAllOrderByType', {params}),
    ConfirmOrder : (params : {type: string, orderId : string}) => Http.get<SuccessResponse<string>>('admin/order/confirmOrder', {params}),
    GetAllListOrder : () => Http.get<SuccessResponse<DataFormPage<OrderDetailResponse[]>>>('admin/order/getAllOrders'),
}