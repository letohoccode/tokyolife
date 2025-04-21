import { UserAndAddressResponse } from "../utils/FormResponse";
import { SuccessResponse } from "../utils/SuccessResponse";
import { UserForm } from "../utils/UserForm";
import Http from "./Http";

type Param = {
    name : string
}
type UserBlock = {
    userId : number
}
const userApi = {
    GetInformationUser : (params : Param) => Http.get<SuccessResponse<UserForm[]>>("admin/user/search",{
        params
    }),
    GetUserBlock : () => Http.get<SuccessResponse<UserForm[]>>("admin/user/findUserBlock"),
    BlockUser : (path : UserBlock) => Http.get('admin/user/blockUser',{
        params : path
    }),
    GetUserByUserId :(params : number) => Http.get<SuccessResponse<UserAndAddressResponse>>("user/getUserAndAddress",{params})
}
export default userApi;