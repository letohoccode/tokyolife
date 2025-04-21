import { createFileRoute } from '@tanstack/react-router'
import RegisterPage from '../../page/register_page/RegisterPage'

export const Route = createFileRoute('/_layoututils/register')({
  component: RegisterPage
})