import { createFileRoute } from '@tanstack/react-router'
import AdminShop from '../../admin_page/admin_shop'

export const Route = createFileRoute('/_adminlayout/shop')({
  component: AdminShop
})