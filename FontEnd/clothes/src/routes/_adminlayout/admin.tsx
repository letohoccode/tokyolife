import { createFileRoute } from '@tanstack/react-router'
import AdminMain from '../../admin_page/admin_main'

export const Route = createFileRoute('/_adminlayout/admin')({
  component: AdminMain
})