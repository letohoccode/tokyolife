import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../page/login_page/LoginPage'

export const Route = createFileRoute('/_layout/login')({
  component: LoginPage
})