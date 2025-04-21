import { createFileRoute } from '@tanstack/react-router'
import AdminAddManager from '../../admin_page/admin_add_manage'

export const Route = createFileRoute('/_adminlayout/addmanager')({
  component: AdminAddManager
})