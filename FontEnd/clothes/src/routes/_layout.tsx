import { createFileRoute } from '@tanstack/react-router'
import MainLayout from '../layout/main_layout/MainLayout'

export const Route = createFileRoute('/_layout')({
  component: MainLayout
})