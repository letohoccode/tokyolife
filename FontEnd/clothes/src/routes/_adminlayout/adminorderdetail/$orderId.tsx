import { createFileRoute } from '@tanstack/react-router'
import AdminOrderDetail from '../../../admin_page/admin_order_detail'

export const Route = createFileRoute('/_adminlayout/adminorderdetail/$orderId')({
  component: AdminOrderDetail
})