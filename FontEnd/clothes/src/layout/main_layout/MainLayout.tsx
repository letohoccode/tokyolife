import React from "react"
import Headers from "../../component/header"
import Footer from "../../component/footer"
import { Outlet } from "@tanstack/react-router"

const MainLayout = ({children} :{children?:React.ReactNode}) => {
  return (
    <div>
        <Headers />
        {children}
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout