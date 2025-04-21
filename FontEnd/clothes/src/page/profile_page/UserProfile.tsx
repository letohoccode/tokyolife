import { useForm } from '@tanstack/react-form'
import Input from '../../component/input'
import Button from '../../component/button'
import { useContext, useMemo, useState } from 'react'
import { AppContextData } from '../../context/AppContext'

const UserProfile = () => {
  const {profile} = useContext(AppContextData)
  const [imgProfile, setImgProfile] = useState<File>()
  const form = useForm({
    defaultValues: {}
  })
  const imgProfileUrl = useMemo(() => {
    return imgProfile ? URL.createObjectURL(imgProfile) : ''
  }, [imgProfile])
  const HandleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setImgProfile(file)
  }
  return (
    <div className='w-[1200px] mx-auto'>
      <h1 className='text-xl font-bold capitalize'>thông tin cá nhân</h1>
      <form
        className='grid grid-cols-5 gap-2 mt-5'
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className='col-span-1 items-center text-center'>
          <div className='w-[150px] h-[150px] rounded-[100%] overflow-hidden mx-auto mb-10'>
            <img
              src={
                imgProfileUrl ||
                'https://th.bing.com/th?id=OIP.jXK1O0Jmm3_1zTYt5isKWQHaKq&w=208&h=300&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
              }
              alt=''
            />
          </div>
          <input id='img-profile' type='file' hidden onChange={HandleImgChange} />
          <label
            htmlFor='img-profile'
            className='cursor-pointer text-center px-3 py-2 border-[1px] border-[#cfcece] rounded-sm'
          >
            Chọn Ảnh
          </label>
        </div>
        <div className='col-span-4'>
          <div className='flex gap-5'>
            <div className='w-[50%]'>
              <span className='capitalize '>họ và tên</span>
              <Input
                Filed={form.Field}
                name=''
                classParent='mt-3'
                className='w-[100%] rounded-sm outline-none border-[1px] border-[#cfcece] px-3 py-2 '
                placeholder=''
                value={profile?.fullName}
              />
            </div>
            <div className='w-[50%]'>
              <span className='capitalize'>email</span>
              <Input
                Filed={form.Field}
                name=''
                classParent='mt-3'
                className='w-[100%] rounded-sm outline-none border-[1px] border-[#cfcece] px-3 py-2 '
                placeholder=''
                value={profile?.email}
              />
            </div>
          </div>
          <div className='mt-3'>
            <div className='w-[50%] gap-2'>
              <span className='capitalize'>so dien thoai</span>
              <Input
                value={String(profile?.phone)}
                Filed={form.Field}
                name=''
                classParent='mt-3'
                className='w-[100%] outline-none border-[1px] border-[#cfcece] px-3 py-2 rounded-sm'
              />
            </div>
            <div></div>
          </div>
          <div className='w-[100%] gap-5 mt-5 flex'>
            <select
              name=''
              id=''
              className='text-[#555555] w-[33.33%] px-3 py-2  outline-none border-[1px] border-[#a3a3a3] rounded-md appearance-none'
            >
              <option value=''>Chọn tỉnh / Thành phố</option>
            </select>
            <select
              name=''
              id=''
              className='text-[#555555] w-[33.33%] px-3 py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md appearance-none'
            >
              <option value=''>Chọn quận huyện</option>
            </select>
            <select
              name=''
              id=''
              className='text-[#555555] w-[33.33%] px-3 py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md appearance-none'
            >
              <option value=''>Chọn phường xã</option>
            </select>
          </div>
          <div>
            <Input
              Filed={form.Field}
              name=''
              className='w-[100%] px-3 py-2 outline-none border-[1px] border-[#a3a3a3] rounded-sm'
              classParent='mt-5'
              placeholder='Nhập địa chỉ chi tiết'
            />
          </div>
          <Button
            Subscribe={form.Subscribe}
            name='lưu thay đổi'
            className='w-[100%] px3 py-2 bg-[#c92127] rounded-md mt-10 capitalize text-white'
          />
        </div>
      </form>
    </div>
  )
}

export default UserProfile
