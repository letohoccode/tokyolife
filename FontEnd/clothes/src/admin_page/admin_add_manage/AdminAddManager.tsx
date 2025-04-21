import { useForm } from '@tanstack/react-form'
import React, { useMemo, useRef, useState } from 'react'
import Input from '../../component/input'
import { AddManager } from '../../utils/Form'
import { useMutation } from '@tanstack/react-query'
import { ShopApi } from '../../authentication/ShopApi'
import swal from 'sweetalert'
type FormShop = {
  fullName: string
  email: string
  password: string
  phone: string
}
const AdminAddManager = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File>()
  const isShopApi = useMutation({
    mutationFn: (data: AddManager) => ShopApi.AddManager(data)
  })
  const form = useForm<FormShop>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: ''
    },
    onSubmit: async ({ value }) => {
      const data: AddManager = {
        email: value.email,
        fullName: value.fullName,
        password: value.password,
        phone: Number(value.phone)
      }
      console.log(data)
      console.log(value)
      await isShopApi.mutate(data, {
        onSuccess: (value) => {
          console.log(value)
          swal({
            title :value.data.message,
            icon :'success',
            dangerMode : true,
          })
        }
      })
    }
  })
  const imageFile = useMemo(() => {
    return files ? URL.createObjectURL(files) : ''
  }, [files])
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(e.target.files[0])
  }
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>thêm quản lý cửa hàng</div>
      <form
        className='px-10 grid grid-cols-12 py-5'
        onSubmit={(e) => {
          e.preventDefault(), e.stopPropagation(), form.handleSubmit()
        }}
      >
        <div className='col-span-2 items-center text-center space-y-5'>
          <div className='rounded-[50%] w-[100px] m-auto overflow-hidden mt-5'>
            <img
              src={imageFile || 'https://th.bing.com/th/id/OIP.kQyrx9VbuWXWxCVxoreXOgHaHN?rs=1&pid=ImgDetMain'}
              alt=''
            />
          </div>
          <input ref={inputRef} className='hidden' type='file' autoComplete='on' onChange={HandleChange} />
          <button
            type='button'
            className='capitalize px-2 py-1 border-[1px] border-slate-600 text-sm'
            onClick={() => inputRef.current?.click()}
          >
            chọn ảnh
          </button>
        </div>
        <div className='col-span-10 space-y-5'>
          <div className='w-[100%]'>
            <p>Họ Và Tên</p>
            <Input
              type='text'
              Filed={form.Field}
              name='fullName'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Số Điện Thoại</p>
            <Input
              type='phone'
              Filed={form.Field}
              name='phone'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Email </p>
            <Input
              type='email'
              Filed={form.Field}
              name='email'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Mật Khẩu</p>
            <Input
              type='password'
              Filed={form.Field}
              name='password'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <button className='w-[100%] h-9 capitalize rounded-sm bg-[#c92127]'>lưu thay đổi</button>
        </div>
      </form>
    </div>
  )
}

export default AdminAddManager
