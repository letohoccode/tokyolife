import { createFileRoute } from '@tanstack/react-router'
import UserProfile from '../../page/profile_page'

export const Route = createFileRoute('/_layout/profile')({
  component: UserProfile
})