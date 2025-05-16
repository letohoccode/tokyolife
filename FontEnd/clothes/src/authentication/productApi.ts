import { ProductListParams } from '../admin_page/admin_manage_poduct/AdminManageProduct'
import { ProductFormAdd, ProductListForm } from '../utils/Form'
import { DataFormPage, FormProductDetailResponse, ParamsFormPoduct } from '../utils/FormType'
import { SuccessResponse } from '../utils/SuccessResponse'
import Http from './Http'

export const ProductApi = {
  AddProduct: (body: ProductFormAdd) => Http.post('admin/product/createProduct', body),
  GetProductFlashSale : (params : ParamsFormPoduct ) => Http.get<SuccessResponse<DataFormPage<ProductListForm[]>>>('product/findProductFlashSale',{
    params
  }),
  GetProduct : (body: string) => Http.get<SuccessResponse<FormProductDetailResponse>>(`product/findProductById/${body}`),
  GetProductCategory : (params : ParamsFormPoduct) =>Http.get<SuccessResponse<DataFormPage<ProductListForm[]>>>('product/findProductByCategory',{
    params
  })
}
export const ManageProduct = {
  GetAllProductManage: (params : ProductListParams) => Http.get<SuccessResponse<DataFormPage<ProductListForm[]>>>('product/findAllProduct', {
    params
  }),
  UpdateFlashSaleProduct : (body : string) => Http.get(`admin/product/updateFlashSale/${body}`),
  DeleteProduct : (body : string) => Http.delete(`admin/product/deleteProduct/${body}`)

}
