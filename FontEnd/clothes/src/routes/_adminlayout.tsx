import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../layout/admin_layout'

export const Route = createFileRoute('/_adminlayout')({
  component: AdminLayout
})