import { useState } from 'react'
import Input from '../../component/input'
import { useForm } from '@tanstack/react-form'
import Button from '../../component/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DiscountCodeApi } from '../../authentication/DiscountCode'
import { DiscountCodeForm } from '../../utils/Form'
type FormCode = {
  code: string
  rate: string
  date: string
}
const AdminAddCode = () => {
    const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { data } = useQuery({
    queryKey: ['discountCode'],
    queryFn: DiscountCodeApi.GetAllDiscountCode,
    staleTime : 60000
  })
  const isSaveDiscountCode = useMutation({
    mutationFn: (data: DiscountCodeForm) => DiscountCodeApi.SaveDiscountCode(data)
  })
  const isDeleteDiscountCode = useMutation({
    mutationFn: (data: string) => DiscountCodeApi.DeleteDiscountCode(data)
  })
  
  const form = useForm<FormCode>({
    defaultValues: {
      code: '',
      date: '',
      rate: ''
    },
    onSubmit: ({ value }) => {
      const data: DiscountCodeForm = {
        code: value.code,
        rate: Number(value.rate),
        date: Number(value.date)
      }
      console.log(data)
      isSaveDiscountCode.mutate(data, {
        onSuccess: () => {
          swal({
            icon: 'success',
            title: 'Thêm Mã Thành Công',
            text: 'Một Mã Giảm Giá Đã Được Thêm'
          })
          queryClient.invalidateQueries({queryKey : ['discountCode']})
          setOpen(!open)
        }
      })
    }
  })
 
  console.log(data?.data)
  const HandleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event.currentTarget.value)
    isDeleteDiscountCode.mutate(event.currentTarget.value,{
        onSuccess : () => {
            swal({
                icon: 'success',
                title: 'Xóa Mã Thành Công',
                text: 'Một Mã Giảm Giá Đã Được Xóa'
            })
            queryClient.invalidateQueries({queryKey : ['discountCode']})
        }
    })
  }
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý mã giảm giá</div>
      <div className='w-[100%] py-4 px-10'>
        {!open ? (
          <button onClick={() => setOpen(!open)} className='bg-[#c92127] px-2 py-1 rounded-md text-white'>
            Thêm Mã +
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault(), e.stopPropagation(), form.handleSubmit()
            }}
            className=''
          >
            <div className='capitalize mt-3'>nhập mã mà bạn muốn</div>
            <Input
              Filed={form.Field}
              name='code'
              className='px-2 py-2 outline-[1px] outline-red-200 rounded-md mt-1 w-[800px] text-sm uppercase'
              placeholder='Nhập Mã'
            />
            <div className='capitalize mt-3'>tỉ lệ giảm</div>
            <Input
              Filed={form.Field}
              name='rate'
              className='px-2 py-2 outline-[1px] outline-red-200 rounded-md mt-1 w-[800px] text-sm'
              placeholder='Tỉ Lệ'
            />
            <div className='capitalize mt-3'>gia hạn theo ngày</div>
            <Input
              Filed={form.Field}
              name='date'
              className='px-2 py-2 outline-[1px] outline-red-200 rounded-md mt-1 w-[800px] text-sm'
              placeholder='Gia Hạn'
            />
            <Button Subscribe={form.Subscribe} className='px-3 py-2 bg-[#c92127] rounded-md mt-3' name='Thêm' />
          </form>
        )}
        <div className='w-[1000px] mt-5'>
          <table className='w-[100%] text-left'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã Giảm Giá</th>
                <th>Giảm Giá</th>
                <th>Ngày Bắt Đầu</th>
                <th>Ngày Kết Thúc</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            {data?.data.data && (
              <tbody>
                {data.data.data.map((value, index) => (
                  <tr className='h-[40px]' key={index}>
                    <td>{index + 1}</td>
                    <td className='uppercase'>{value.code}</td>
                    <td>{value.rate}%</td>
                    <td>{value.firstDate}</td>
                    <td>{value.lastDate}</td>
                    <td>
                      <button
                        value={value.code}
                        className='border-[#c92127] border-[1px] p-2 rounded-md hover:text-[#c92127]'
                        onClick={HandleClick}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            <tbody>
                  <tr className='h-[40px]'>
                    <td>1</td>
                    <td className='uppercase'>GIAMNHUkhong</td>
                    <td>13%</td>
                    <td>25-4-2024</td>
                    <td>28-10-2024</td>
                    <td>
                      <button
                        className='border-[#c92127] border-[1px] p-2 rounded-md hover:text-[#c92127]'
                        onClick={HandleClick}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminAddCode
