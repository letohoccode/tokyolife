import { createFileRoute } from '@tanstack/react-router'
import CartLayout from '../../layout/cart_layout'

export const Route = createFileRoute('/_layoututils/_cartlayout')({
  component: CartLayout
})