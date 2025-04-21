import React, { createContext, useState } from "react"
import { GetAccessToken, GetProfileUser, GetShopId } from "../authentication/LocalStore";
import { UserForm } from "../utils/UserForm";

type FormData = {
    isLogin : boolean
    setIsLogin : React.Dispatch<React.SetStateAction<boolean>>
    profile : UserForm | null
    setProfile :  React.Dispatch<React.SetStateAction<UserForm | null>>
    setShopId : React.Dispatch<React.SetStateAction<number | null>>
    shopId : number | null
}
const FormContextData:FormData ={
    isLogin : Boolean(GetAccessToken()),
    setIsLogin : () => null,
    profile : GetProfileUser(),
    setProfile : () => null,
    setShopId : () => null,
    shopId : GetShopId()
}
export const AppContextData = createContext(FormContextData)

const AppContext = ({children}:{children: React.ReactNode}) => {
    const [profile,setProfile] = useState<UserForm | null>(FormContextData.profile);
    const [shopId,setShopId] =useState<number| null>(FormContextData.shopId);
    const [isLogin,setIsLogin] = useState<boolean>(FormContextData.isLogin)
    
  return (
   <AppContextData.Provider value={{profile,setProfile,shopId,setShopId,isLogin,setIsLogin}}>
        {children}
   </AppContextData.Provider>
  )
}

export default AppContext