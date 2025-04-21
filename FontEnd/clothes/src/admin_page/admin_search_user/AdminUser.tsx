import { useForm } from '@tanstack/react-form'
import Input from '../../component/input'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../authentication/UserApi'
import { useState } from 'react'
import { UserForm } from '../../utils/UserForm'
type Formdata = {
  name: string
}
type BlockForm = {
    userId : number
}
const AdminUser = () => {
  const [User, SetUser] = useState<UserForm[]>()
  const isGetUser = useMutation({
    mutationFn: userApi.GetInformationUser
  })
  const isBlockUser = useMutation({
    mutationFn : (data : BlockForm) => userApi.BlockUser(data),
    mutationKey : ['userBlock']
  })
  const form = useForm<Formdata>({
    defaultValues: {
      name: ''
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (value: any) => {
    console.log(value.value)
    if (value.value.trim() == '') return ''
    const data: Formdata = {
      name: value.value
    }
    isGetUser.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        SetUser(data.data.data)
      },
      onError: (error) => {
        console.log(error)
      }
    })
    return ''
  }

  const HandleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value)
    const data : BlockForm = {
        userId : Number(event.currentTarget.value)
    }
    console.log(event.currentTarget.checked)
    event.target.onchange
    console.log(event.target.checked)
    isBlockUser.mutate(data)
  }
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>thông tin người dùng</div>
      <div className='w-[700px] mx-auto capitalize text-center'>
        <h1 className='my-10 text-xl font-semibold text-[#c92127]'>tìm kiếm thông tin người dùng</h1>
        <Input
          Filed={form.Field}
          onChangeAsyn={handleChange}
          name='name'
          placeholder='nhập tên người dùng'
          className='outline-none w-[100%] border-none px-2 py-3 capitalize text-sm'
          classParent='shadow-lg text-start'
        />
        {User && (
          <div className='mt-14'>
            <table className='w-[100%] capitalize text-sm text-left border-y-[1px] border-slate-300 px-2'>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>tên người dùng</th>
                    <th>email</th>
                    <th>số điện thoại</th>
                    <th>khóa</th>
                    <th>ủy quyền</th>
                </tr>
                </thead>
              <tbody>
                {User.map((user, index) => (
                  <tr className='h-[40px] border-b-[1px] border-slate-300' key={index}>
                    <td>{index}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <label className='inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value={user.id}
                          defaultChecked={!user.blocked}
                          className='sr-only peer'
                          onChange={HandleClick}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUser
