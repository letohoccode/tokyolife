import { createFileRoute } from '@tanstack/react-router'
import ProductUser from '../../page/product_page'
import { ParamsFormPoduct } from '../../utils/FormType'
export const Route = createFileRoute('/_layout/product')({
  component: ProductUser,
  validateSearch : (search : Record<string,unknown>) : ParamsFormPoduct => {
    return {
      page : Number(search.page ?? 0),
      size : Number(search.size ?? 10),
      status : Boolean(search.status ?? false),
    }
  }
})