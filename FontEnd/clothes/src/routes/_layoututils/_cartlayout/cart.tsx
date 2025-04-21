import { createFileRoute } from '@tanstack/react-router'
import CartPage from '../../../page/cart_page'

export const Route = createFileRoute('/_layoututils/_cartlayout/cart')({
  component: CartPage,
  validateSearch: (search : string) => search,

})