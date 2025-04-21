import React from 'react'
import Header from '../../component/header'
import { Outlet } from '@tanstack/react-router'

const LayoutUtils = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
        <Header />
        {children}
        <Outlet />
    </div>
  )
}

export default LayoutUtils