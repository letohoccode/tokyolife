import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '../../authentication/UserApi'
import { useState } from 'react'
import { UserForm } from '../../utils/UserForm'
type UserBlock = {
  userId: number
}
const AdminMagaeUser = () => {
  const [user] = useState<UserForm[]>()
  const { data } = useQuery({
    queryKey: ['userBlock'],
    queryFn: userApi.GetUserBlock,
    staleTime: 60000
  })
  console.log(user)
  const isUserBlockApi = useMutation({
    mutationFn: (data: UserBlock) => userApi.BlockUser(data)
  })
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value)
    console.log(event.target.checked)
    const data: UserBlock = {
      userId: Number(event.currentTarget.value)
    }
    isUserBlockApi.mutate(data, {
      onSuccess: () => {}
    })
  }
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý người dùng</div>
      <div className='w-[1000px] mx-auto capitalize text-center'>
        <h1 className='my-10 text-xl font-semibold text-[#c92127]'>quản lý người dùng</h1>
        <div className='mt-14'>
          <table className='w-[100%] capitalize text-sm text-left border-y-[1px] border-slate-300 px-2'>
            <tr>
              <th>STT</th>
              <th>tên người dùng</th>
              <th>email</th>
              <th>số điện thoại</th>
              <th>khóa</th>
              <th>ủy quyền</th>
            </tr>
            {data && (
              <tbody>
                {data?.data.data?.map((userBlock) => (
                  <tr className='h-[40px] border-b-[1px] border-slate-300'>
                    <td>1</td>
                    <td>{userBlock.fullName}</td>
                    <td>{userBlock.email}</td>
                    <td>{userBlock.phone}</td>
                    <td>
                      <label className='inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value={userBlock.id}
                          defaultChecked={!userBlock.blocked}
                          className='sr-only peer'
                          onChange={(event) => HandleChange(event)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td>{userBlock.role}</td>
                  </tr>
                ))}
              </tbody>
            )}
            {/* <tbody>
              <tr>
                <td>1</td>
                <td>
                  <label className='inline-flex items-center cursor-pointer'>
                    <input defaultChecked={true} value={'ádsa'} type='checkbox' onChange={(event) => HandleChange(event,3243)} className='sr-only peer' />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <label className='inline-flex items-center cursor-pointer'>
                    <input defaultChecked={false} value={'ádsa'} type='checkbox' onChange={(event) => HandleChange(event,3243)} className='sr-only peer' />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminMagaeUser
