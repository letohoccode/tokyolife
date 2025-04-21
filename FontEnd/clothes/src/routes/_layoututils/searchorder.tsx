import { createFileRoute } from '@tanstack/react-router'
import SearchOrder from '../../page/sreach_order_page'

export const Route = createFileRoute('/_layoututils/searchorder')({
  component: SearchOrder
})