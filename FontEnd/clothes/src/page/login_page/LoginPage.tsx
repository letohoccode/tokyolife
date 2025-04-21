import { useForm } from '@tanstack/react-form'
import Input from '../../component/input'
import Button from '../../component/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import authenApi from '../../authentication/ApiAuth'
import { useContext } from 'react'
import { AppContextData } from '../../context/AppContext'
import { AxiosError } from 'axios'

type FormData = {
  email: string
  password: string
}
type ErorForm = {
  businessErrorCode: number
  businessErrorDescription: string
  error: string
}
function LoginPage() {
  const { setProfile, setIsLogin } = useContext(AppContextData)
  const isLoginApi = useMutation({
    mutationFn: (data: FormData) => authenApi.LoginApi(data)
  })
  const Navigate = useNavigate()
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      await isLoginApi.mutateAsync(value, {
        onSuccess: (data) => {
          if (data.data.code === 201) {
            swal({
              icon: 'error',
              title: `${data.data.message}`
            })
          } else {
            console.log(data)
            setIsLogin(true)
            setProfile(data.data.data)
          
          switch (data.data.data.role) {
            case 'ADMIN': {
              Navigate({ to: '/admin' })
              break
            }
            case 'USER': {
              Navigate({ to: '/' })
              break
            }
            case 'MANAGER': {
              Navigate({ to: '/admin' })
              break
            }
          }
        }
        },
        onError: (error) => {
          const data = error as AxiosError<ErorForm>
          console.log(data)
          if (data.response?.data.businessErrorCode == 302) {
            swal({
              icon: 'error',
              title: ' Bạn Không Thể Đăng Nhập',
              text: 'Tài Khoản Của Bạn Đã Bị Khóa'
            })
          }
        }
      })
    }
  })
  return (
    <div className='w-[430px] m-auto  items-center rounded-md'>
      <form
        onSubmit={(e) => {
          e.preventDefault(), e.stopPropagation(), form.handleSubmit()
        }}
      >
        <div className='w-[100%] capitalize text-3xl font-bold text-center mt-10'>đăng nhập</div>
        <Input
          type='email'
          classParent='w-[100%] h-[70px] mt-10'
          className='w-[100%] outline-none border-none px-2 py-3'
          Filed={form.Field}
          name='email'
          error='vui long nhap email'
          placeholder='Email'
        />
        <Input
          type='password'
          classParent='w-[100%] h-[70px] mt-4'
          className='w-[100%] outline-none border-none px-2 py-3'
          Filed={form.Field}
          name='password'
          error='vui long nhap mat khau'
          placeholder='Password'
        />
        <Button Subscribe={form.Subscribe} className='w-[100%] py-2 bg-[#c92127] rounded-lg mt-3' name='Đăng nhập' />
        <div className='mt-4'>
          <span className='capitalize mr-3 px-2'>Bạn chưa có tài khoản?</span>
          <Link className='capitalize text-[#c92127]' to='/register'>
            đăng ký ngay
          </Link>
          <p className='capitalize text-[#c92127] px-2 mt-2'>quên mật khẩu</p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
