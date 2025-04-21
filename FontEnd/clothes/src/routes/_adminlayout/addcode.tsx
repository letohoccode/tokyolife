import { createFileRoute } from '@tanstack/react-router'
import AdminAddCode from '../../admin_page/admin_add_code'

export const Route = createFileRoute('/_adminlayout/addcode')({
  component: AdminAddCode
})