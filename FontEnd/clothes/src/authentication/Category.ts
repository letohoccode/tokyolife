import { CategoryForm } from "../utils/Form";
import { SuccessResponse } from "../utils/SuccessResponse";
import Http from "./Http";

export const CategoryApi = {
    GetAllCategory : () => Http.get<SuccessResponse<CategoryForm[]>>('admin/category'),
    SaveCategory : (body : CategoryForm) => Http.post('admin/category',body),
    DeleteCategory : (body : string) => Http.get(`admin/category/${body}`)
}