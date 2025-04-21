import { createFileRoute } from '@tanstack/react-router'
import AdminCategory from '../../admin_page/admin_category'

export const Route = createFileRoute('/_adminlayout/category')({
  component: AdminCategory
})