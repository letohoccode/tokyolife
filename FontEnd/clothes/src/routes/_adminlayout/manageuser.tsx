import { createFileRoute } from '@tanstack/react-router'
import AdminMagaeUser from '../../admin_page/admin_manage_user'

export const Route = createFileRoute('/_adminlayout/manageuser')({
  component: AdminMagaeUser
})