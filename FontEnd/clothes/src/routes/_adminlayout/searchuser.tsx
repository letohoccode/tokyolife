import { createFileRoute } from '@tanstack/react-router'
import AdminUser from '../../admin_page/admin_search_user'

export const Route = createFileRoute('/_adminlayout/searchuser')({
  component: AdminUser
})