import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import AppContext from './context/AppContext.tsx'

const queryClient = new QueryClient();
const route = createRouter({routeTree});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof route
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <App>
          <RouterProvider router={route} />
        </App>
      </AppContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
