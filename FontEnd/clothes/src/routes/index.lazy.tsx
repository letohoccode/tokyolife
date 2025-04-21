import { createLazyFileRoute } from '@tanstack/react-router'
import MainLayout from '../layout/main_layout/MainLayout'
import PageMain from '../page/page_main'

export const Route = createLazyFileRoute('/')({
  component:() => <MainLayout><PageMain /></MainLayout>,
})
