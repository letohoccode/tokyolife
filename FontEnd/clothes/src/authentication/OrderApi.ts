import { OrderDetail } from "../utils/Form";
import { SuccessResponse } from "../utils/SuccessResponse";
import Http from "./Http";

export const SearchOrderApi = (id : string) => Http.get<SuccessResponse<OrderDetail>>(`order/search/${id}`);