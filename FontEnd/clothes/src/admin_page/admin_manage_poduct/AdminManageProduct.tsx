import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ManageProduct } from '../../authentication/productApi'
import { Route } from '../../routes/_adminlayout/adminmanageproduct/$pageproduct'
import { useEffect } from 'react'
import CheckedInput from '../../component/checked'
export type ProductListParams = {
  page: number
  size: number
}
const AdminManageProduct = () => {
  const { pageproduct } = Route.useParams()
  const Navigate = useNavigate()
  const page = pageproduct ? parseInt(pageproduct) : 1
  useEffect(() => {}, [page])
  const { data } = useQuery({
    queryKey: ['queryList', page],
    queryFn: () => ManageProduct.GetAllProductManage({ page: page, size: 2 }),
    placeholderData: keepPreviousData
  })
  const productData = data?.data.data
  console.log(productData?.data)
  const totalpages = productData?.totalPages
  const mutationFn = useMutation({
    mutationFn: ManageProduct.UpdateFlashSaleProduct
  })
  const mutationFnDelete = useMutation({
    mutationFn: ManageProduct.DeleteProduct
  })
  console.log(totalpages)
  const nextPage = () => {
    if (productData?.last) return
    Navigate({ to: `/adminmanageproduct/${page + 1}` })
  }
  const prevPage = () => {
    if (productData?.first) return
    Navigate({ to: `/adminmanageproduct/${page - 1}` })
  }
  const HandleClickCheck = (productID: string) => {
    mutationFn.mutate(productID, {
      onSuccess: (data) => console.log(data),
      onError: (data) => console.log(data)
    })
    console.log(productID)
  }
  const HandleClickDelete = (productID: string) => {
    mutationFnDelete.mutate(productID, {
      onSuccess: (data) => {
        swal({
          icon: 'success',
          title: `${data.data.message}`
        })
      },
      onError: (data) => console.log(data)
    })
  }

  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý sản phẩm</div>
      <div className='w-full px-10'>
        <div className='my-8'>
          <Link to='/addproduct' className='px-3 py-2 bg-[#c92127] rounded-md text-center text-white capitalize'>
            Thêm sản phâm mới +
          </Link>
        </div>
        <div>
          <table className='w-full text-left'>
            <thead>
              <tr>
                <th className='w-[100px]'>Ảnh</th>
                <th className='w-[400px]'>Tên sản phẩm</th>
                <th className='w-[200px]'>Loại sản phẩm</th>
                <th>Giá Gốc</th>
                <th>Giảm Giá</th>
                <th>Flash Sale</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className=''>
              {productData?.data &&
                productData.data.map((data) => (
                  <tr className='h-[90px]'>
                    <td>
                      <div className='w-[80px] overflow-hidden'>
                        <img className='w-full' src={data.image} alt='' />
                      </div>
                    </td>
                    <td className=''>
                      <span className='text-sm mt-3'>{data.productName}</span>
                    </td>
                    <td className=''>
                      <span className='text-sm mt-3'>Áo phông nữ đẹp không tì vết</span>
                    </td>
                    <td className=''>
                      <span className='text-sm mt-3'>{data.price} </span>
                    </td>
                    <td className=''>
                      <span className='text-sm mt-3'>{data.sale}%</span>
                    </td>
                    <td>
                      <CheckedInput check={data.flashSale} valueCheck={data.id} HandleClickCheck={HandleClickCheck} />
                    </td>
                    <td>
                      <div className='flex gap-2 text-white'>
                        <button
                          className='bg-[#c92127] px-1 py-1 rounded-md'
                          onClick={() => HandleClickDelete(data.id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                            />
                          </svg>
                        </button>
                        <button className='bg-blue-500 px-1 py-1 rounded-md'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='flex space-x-3 mx-auto w-[400px] '>
            <button className='px-3 py-1 border-[1px] border-slate-500 capitalize' onClick={prevPage}>
              previous
            </button>
            {new Array(totalpages).fill('_').map((_, index) => (
              <div
                className={`cursor-pointer border-[1px] border-slate-500 px-3 text-center ${page == index ? 'border-red-700 text-red-700' : ''}`}
                onClick={() => Navigate({ to: `/adminmanageproduct/${index}` })}
              >
                {index + 1}
              </div>
            ))}
            <button className='px-3 py-1 border-[1px] border-slate-500 capitalize' onClick={nextPage}>
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminManageProduct
