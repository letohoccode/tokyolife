import { UserForm } from "../utils/UserForm";

export const  GetAccessToken = () => localStorage.getItem("access_token");
export const SaveAccessToken = (body: string) => localStorage.setItem("access_token",body);
export const GetProfileUser = () => {
    const result = localStorage.getItem('user');
    return result ? JSON.parse(result) : null;
};
export const SaveProfileUser = (body: UserForm) => localStorage.setItem('user',JSON.stringify(body));
export const ClearAll = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
}
export const SaveShopId = (body : number) => localStorage.setItem('shopId',JSON.stringify(body))
export const GetShopId = () => {
    const result = localStorage.getItem('shopId');
    return result ? JSON.parse(result) : null;
}