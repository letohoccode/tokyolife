import { createFileRoute } from '@tanstack/react-router'
import ProductDetail from '../../../page/productdetail'

export const Route = createFileRoute('/_layout/productdetail/$productId')({
  component: ProductDetail
})