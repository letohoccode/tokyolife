import { useForm } from "@tanstack/react-form"
import Input from "../../component/input"
import Button from "../../component/button"
import { Link } from "@tanstack/react-router"
import { RegisterForm } from "../../utils/Form"
import { useMutation } from "@tanstack/react-query"
import authenApi from "../../authentication/ApiAuth"
type FormData= {
  fullName: string
  phone : string 
  email: string
  password : string
  confirmPassword : string
}
function RegisterPage() {
  const isRegisterApi = useMutation({
    mutationFn: (data : RegisterForm) => authenApi.ResgisterApi(data)
  })
  const form = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      email:'',
      password:'',
      confirmPassword:''
    },
    onSubmit: async ({value}) => {
      if(value.confirmPassword != value.password)
      {
        swal({
          icon: 'error',
          text: "mat khau khong khop"
        })
        return;
      }
      const data : RegisterForm = {
        email : value.email,
        fullName: value.fullName,
        phone: Number(value.phone),
        password : value.password
      }
      await isRegisterApi.mutateAsync(data,{
        onSuccess : (data) => {
          if(data.data.code === 201){
            swal({
              icon: 'error',
              text: `${data.data.message}`
            })
          }
          swal({
            icon : 'success',
            text: 'Dang Ky Thanh Cong'
          })
          form.reset()
        },
        onError : (error) => {
          console.log(error);
          form.reset()
        }
      })
      console.log(data)
    }
  })
 
  return (
    <div className="w-[430px] m-auto  items-center rounded-md">
      <form onSubmit={(e) => {
        e.preventDefault(),
        e.stopPropagation(),
        form.handleSubmit()
      }}>
        <div className="w-[100%] capitalize text-3xl font-bold text-center mt-5">đăng ký</div>
          <Input type="text" classParent="w-[100%] h-[70px] mt-10" className="w-[100%] outline-none border-none px-2 py-3" Filed={form.Field} name="fullName" error="nhập tên của bạn" placeholder="Full Name" />
          <Input type="number" classParent="w-[100%] h-[70px] " className="w-[100%] outline-none border-none px-2 py-3" Filed={form.Field} name="phone" error="vui long nhap email" placeholder="Phone"/>
          <Input type="email" classParent="w-[100%] h-[70px] " className="w-[100%] outline-none border-none px-2 py-3" Filed={form.Field} name="email" error="nhập email của bạn" placeholder="Email"/>
          <Input type="password" classParent="w-[100%] h-[70px] " className="w-[100%] outline-none border-none px-2 py-3" Filed={form.Field} name="password" error="nhập mật khẩu của bạn" placeholder="Password"/>
          <Input  type="password" classParent="w-[100%] h-[70px] " className="w-[100%] outline-none border-none px-2 py-3" Filed={form.Field} name="confirmPassword" error="nhập lai mật khẩu của bạn" placeholder="Confirm Pasword"/>
          
        <Button  Subscribe={form.Subscribe} className="w-[100%] py-2 bg-[#c92127] rounded-lg mt-2" name="Đăng Ký"/>
        <div className="mt-4">
          <span className="capitalize mr-3 px-2">Bạn đã có tài khoản?</span>
          <Link className="capitalize text-[#c92127]" to="/login">đăng nhập ngay</Link>
          <p className="capitalize text-[#c92127] px-2 mt-2">quên mật khẩu</p>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage