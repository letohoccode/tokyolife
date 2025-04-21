import { useForm } from '@tanstack/react-form'
import React, { useContext, useMemo, useRef, useState } from 'react'
import Input from '../../component/input'
import { ShopForm } from '../../utils/Form'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ShopApi } from '../../authentication/ShopApi'
import { AppContextData } from '../../context/AppContext'
type FormShop = {
  name: string
  hotline: string
  street: string
  commune: string
  district: string
  conscious: string
}
const AdminShop = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {profile} = useContext(AppContextData)
  const [files, setFiles] = useState<File>()
  const dataShop = useQuery({
    queryKey: ['shopId'],
    queryFn : () => ShopApi.GetShopApi(String(profile?.id))
  })
  console.log(dataShop)
  const isShopApi = useMutation({
    mutationFn: (data: ShopForm) => ShopApi.CreateShopApi(data)
  })

  const form = useForm<FormShop>({
    defaultValues: {
      commune: '',
      conscious: '',
      district: '',
      hotline: '',
      name: '',
      street: ''
    },
    onSubmit: async ({ value }) => {
      const data: ShopForm = {
        commune: value.commune,
        conscious: value.conscious,
        district: value.district,
        hotline: value.hotline,
        name: value.name,
        street: value.street,
        file: '',
        userId : profile?.id ? profile.id : 0
      }
      console.log(data)
      const formList = new FormData()
      formList.append('files', files as Blob)
      await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/image/',
        data: formList
      }).then((response) => {
        data.file = response.data.data[0]
      })
      console.log(data)
      await isShopApi.mutate(data,{
        onSuccess: (value) => {
            console.log(value)
            form.reset()
            setFiles(undefined)
            swal({
              title : 'Tạo Shop Thành Công',
              icon : 'success',
              dangerMode : true,
              closeOnClickOutside: true
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
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>thông tin shop</div>
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
            <p>Tên Shop</p>
            <Input
              Filed={form.Field}
              name='name'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Hotline</p>
            <Input
              Filed={form.Field}
              name='hotline'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Tỉnh</p>
            <Input
              Filed={form.Field}
              name='conscious'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Huyện</p>
            <Input
              Filed={form.Field}
              name='district'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Phường</p>
            <Input
              Filed={form.Field}
              name='commune'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <div className='w-[100%]'>
            <p>Đường</p>
            <Input
              Filed={form.Field}
              name='street'
              className='outline-none border-[1px] border-slate-300 w-[100%] py-1 px-2 rounded-md'
            />
          </div>
          <button className='w-[100%] h-9 capitalize rounded-sm bg-[#c92127]'>lưu thay đổi</button>
        </div>
      </form>
    </div>
  )
}

export default AdminShop
