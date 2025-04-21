import { createFileRoute } from '@tanstack/react-router'
import AdminAddProduct from '../../admin_page/admin_add_product'

export const Route = createFileRoute('/_adminlayout/addproduct')({
  component: AdminAddProduct
})