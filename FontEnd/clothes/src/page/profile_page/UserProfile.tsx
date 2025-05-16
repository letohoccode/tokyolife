import { useForm } from '@tanstack/react-form'
import Input from '../../component/input'
import Button from '../../component/button'
import { useContext, useEffect, useMemo, useState } from 'react'
import { AppContextData } from '../../context/AppContext'
import { UserAndAddressResponse } from '../../utils/FormResponse'
import userApi from '../../authentication/UserApi'
import { UserUpdateRequest } from '../../utils/FormRequest'
import { ImageApi } from '../../authentication/imageApi'

const UserProfile = () => {
  const { profile } = useContext(AppContextData)
  const [imgProfile, setImgProfile] = useState<File>()
  const [imgProfileUrlAvatar, setImgProfileUrl] = useState<string>('')
  const [userAndAddress, setUserAndAddress] = useState<UserAndAddressResponse>()

  useEffect(() => {
    const getUserAndAddress = async () => {
      try {
        const result = await userApi.GetUserByUserId({ userId: profile?.id as number })
        setUserAndAddress(result.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserAndAddress()
  }, [profile?.id])

  const form = useForm<UserUpdateRequest>({
    defaultValues: {
      commune: userAndAddress?.addresses.commune || '',
      conscious: userAndAddress?.addresses.conscious || '',
      district: userAndAddress?.addresses.district || '',
      email: userAndAddress?.email || '',
      fullName: userAndAddress?.fullName || '',
      phone: userAndAddress?.phone || '',
      street: userAndAddress?.addresses.street || '',
      images: userAndAddress?.images || ''
    },
    onSubmit: ({ value }) => {
      console.log('value', value)
      const userRequest: UserUpdateRequest = {
        email: value.email,
        fullName: value.fullName,
        phone: value.phone,
        street: value.street,
        commune: value.commune,
        conscious: value.conscious,
        district: value.district,
        images: imgProfileUrlAvatar || userAndAddress?.images || ''
      }
      try {
         userApi.UpdateUser(userRequest);
        swal({
          title : 'Cập nhật thành công',
          icon : 'success',
        })
      } catch (error) {
        swal({
          title : 'Cập nhật thất bại',
          icon : 'error',
        })
      }
    }
  })
  const imgProfileUrl = useMemo(() => {
    return imgProfile ? URL.createObjectURL(imgProfile) : ''
  }, [imgProfile])
  console.log('imgProfileUrl', imgProfileUrl)
  const HandleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setImgProfile(file)
    try {
      const formData = new FormData()
      formData.append('file', file as Blob)
      const result = await ImageApi.uploadImage(formData)
      setImgProfileUrl(result.data.data)
      form.setFieldValue('images', result.data.data)
      console.log('result', result.data.data)
    } catch (error) {
      console.log('error', error)
    }
  }
  console.log('userAndAddress', userAndAddress?.id)
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
        {userAndAddress && (
          <>
            <div className='col-span-1 items-center text-center'>
              <div className='w-[150px] h-[150px] rounded-[100%] overflow-hidden mx-auto mb-10'>
                <img src={imgProfileUrl || userAndAddress.images} alt='' />
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
                    value={userAndAddress.fullName}
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
                    disable
                    value={userAndAddress.email}
                  />
                </div>
              </div>
              <div className='mt-3'>
                <div className='w-[50%] gap-2'>
                  <span className='capitalize'>so dien thoai</span>
                  <Input
                    value={String(userAndAddress.phone)}
                    Filed={form.Field}
                    name=''
                    classParent='mt-3'
                    className='w-[100%] outline-none border-[1px] border-[#cfcece] px-3 py-2 rounded-sm'
                  />
                </div>
                <div></div>
              </div>
              <div className='w-full mt-5 flex justify-between gap-1'>
                <Input
                  Filed={form.Field}
                  name='conscious'
                  value={userAndAddress.addresses.conscious}
                  className='w-full px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
                  placeholder='Nhập tỉnh thành phố'
                />
                <Input
                  Filed={form.Field}
                  value={userAndAddress.addresses.district}
                  name='district'
                  className='w-full px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
                  placeholder='Nhập quận huyện'
                />
                <Input
                  Filed={form.Field}
                  name='commune'
                  value={userAndAddress.addresses.commune}
                  className='w-full px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
                  placeholder='Nhập xã phường'
                />
              </div>

              <div>
                <Input
                  Filed={form.Field}
                  name='street'
                  value={userAndAddress.addresses.street}
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
          </>
        )}
      </form>
    </div>
  )
}

export default UserProfile
