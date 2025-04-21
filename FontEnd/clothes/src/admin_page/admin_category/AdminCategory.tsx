import { useForm } from '@tanstack/react-form'
import Input from '../../component/input'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CategoryApi } from '../../authentication/Category'
import { CategoryForm } from '../../utils/Form'

type FormCategory = {
  category: string
}
const AdminCategory = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: CategoryApi.GetAllCategory,
    staleTime : 60000
  })
  const isCategoryApi = useMutation({
    mutationFn: (data: CategoryForm) => CategoryApi.SaveCategory(data)
  })
  const isDeleteCategory = useMutation({
    mutationFn: (data : string) => CategoryApi.DeleteCategory(data)
  })
  const form = useForm<FormCategory>({
    defaultValues: {
      category: ''
    },
    onSubmit: async ({ value }) => {
      console.log(value.category)
      await isCategoryApi.mutate(value, {
        onSuccess: (data) => {
          console.log(data)
          swal({
            icon: 'success',
            title: 'Thêm Thành Công',
            text: 'Bạn Đã Thêm Thành Công Một Danh Mục'
          })
          queryClient.invalidateQueries({queryKey : ['category']})
          form.reset()
        }
      })
      setOpen(!open)
    }
  })
  const HandleClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const data = event.currentTarget.value
    console.log(data)
    isDeleteCategory.mutate(data,{
      onSuccess: () => {
        swal({
          icon: 'success',
          title: 'Xóa Thành Công',
          text: 'Bạn Đã Xóa Thành Công Một Danh Mục'
        }),
        queryClient.invalidateQueries({queryKey : ['category']})
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  const CategoryData = data?.data.data
  return (
    <div className='px-10 '>
      <div className='w-[100%] py-4 text-xl font-semibold capitalize shadow-lg'>quản lý danh mục</div>
      <div className='my-12 w-[800px]'>
        <button type='button' onClick={() => setOpen(!open)} className='capitalize bg-[#c92127] py-1 px-2 rounded-md'>
          thêm danh mục mới +
        </button>
        {open && (
          <form
            onSubmit={(e) => {
              e.preventDefault(), e.stopPropagation(), form.handleSubmit()
            }}
            className='space-y-3 mt-6'
          >
            <Input
              Filed={form.Field}
              name='category'
              className='px-2 py-1 outline-1 outline-red-200 w-[100%]'
              placeholder='Tên Danh Mục'
            />
            <button type='submit' className='capitalize bg-[#c92127] py-1 px-2 rounded-md'>
              thêm
            </button>
          </form>
        )}
      </div>
      <div className='w-[1000px]'>
        <table className='w-[1000px] text-left capitalize'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Danh mục</th>
              <th>Sản Phẩm</th>
              <th>thao tác</th>
            </tr>
          </thead>
          {CategoryData && (
            <tbody>
              {CategoryData.map((data, index) => (
                <tr className='h-[40px]' key={index}>
                  <td>{index + 1}</td>
                  <td>{data.category}</td>
                  <td>10</td>
                  <td>
                    <button value={data.id} className='border-[#c92127] border-[1px] p-2 rounded-md hover:text-[#c92127]' onClick={HandleClick}>
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
        </table>
      </div>
    </div>
  )
}

export default AdminCategory
