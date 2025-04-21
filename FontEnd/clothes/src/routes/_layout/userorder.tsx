import { createFileRoute } from '@tanstack/react-router'
import UserOrder from '../../page/user_order_page'

export const Route = createFileRoute('/_layout/userorder')({
  component: UserOrder
})