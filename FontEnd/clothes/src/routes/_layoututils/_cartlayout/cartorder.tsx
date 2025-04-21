import { createFileRoute } from '@tanstack/react-router'
import CartOrder from '../../../page/cart_order'

export const Route = createFileRoute('/_layoututils/_cartlayout/cartorder')({
  component: CartOrder
})