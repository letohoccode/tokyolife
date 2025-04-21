import { Auth } from "../utils/Auth"
import { LoginForm, RegisterForm } from "../utils/Form"
import Http from "./Http"

type RegisterResponse = {
    message : string
    code ?: number
}
const authenApi =  {
    ResgisterApi : (body : RegisterForm) => Http.post<RegisterResponse>("auth/register",body),
    LoginApi : (body: LoginForm) => Http.post<Auth>("auth/login",body),
    LogoutApi : () => Http.post('auth/logout')
}
export default authenApi