import { createFileRoute } from '@tanstack/react-router'
import AdminOrder from '../../admin_page/admin_order'

export const Route = createFileRoute('/_adminlayout/adminorder')({
  component: AdminOrder
})