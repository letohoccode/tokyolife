import { createFileRoute } from '@tanstack/react-router'
import AdminManageProduct from '../../../admin_page/admin_manage_poduct'

export const Route = createFileRoute('/_adminlayout/adminmanageproduct/$pageproduct')({
  component: AdminManageProduct
})