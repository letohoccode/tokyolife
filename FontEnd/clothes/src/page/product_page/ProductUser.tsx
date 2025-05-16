import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Route } from '../../routes/_layout/product'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ProductApi } from '../../authentication/productApi'
import { ParamsFormPoduct } from '../../utils/FormType'
import { CategoryApi } from '../../authentication/Category'
import { CategoryForm } from '../../utils/Form'
import FormatPrice from '../../component/formatPrice'

const ProductUser = () => {
  const { page, size, status, category, sort, sortType } = Route.useSearch()
  const queryclient = useQueryClient()
  const [categoryList, SetCategoryList] = useState<CategoryForm[] | undefined>([])
  const [Category, SetCategory] = useState<string | undefined>('tất cả sản phẩm')
  const [activeButton, setActiveButton] = useState<number | null>(0)
  const Navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const data = await CategoryApi.GetAllCategory()
      SetCategoryList(data.data.data)
    }

    fetchData()
  }, [])
  const ProductStatusRequest: ParamsFormPoduct = {
    status,
    page,
    size,
    category,
    sort,
    sortType
  }
  const { data: DataProduct ,refetch} = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductApi.GetProductCategory(ProductStatusRequest)
  })
  const HandleActiveButton = (index: number, value?: string, id?: string) => {
    setActiveButton(index), SetCategory(value)
    if (id != null) {
      const newProductRequest = { ...ProductStatusRequest, category: id }
      Navigate({ to: '/product', search: newProductRequest })
      queryclient.invalidateQueries({ queryKey: ['products'] })
      refetch()
    }
  }
  const HandleSelect = (value: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    const dataSelect = value.currentTarget.value
    if (dataSelect != null) {
      const newProductRequest = { ...ProductStatusRequest, sort: dataSelect ,sortType: 'price'}
      Navigate({ to: '/product', search: newProductRequest })
      queryclient.invalidateQueries({ queryKey: ['products'] })
    }
  }
  console.log(DataProduct)
  return (
    <div className='w-[1200px] mx-auto mt-10'>
      <div className='grid grid-cols-7 gap-2'>
        <div className='col-span-1'>
          <ul className='font-medium space-y-3'>
            <li>
              <button
                className={`capitalize ${activeButton === 0 ? 'text-[#c92127]' : 'text-black'}`}
                onClick={() => HandleActiveButton(0, 'tất cả sản phẩm', '')}
              >
                tất cả sản phẩm
              </button>
            </li>
            {categoryList &&
              categoryList.map((value, index) => (
                <li
                  className={`capitalize ${activeButton === index + 1 ? 'text-[#c92127]' : 'text-black'} cursor-pointer`}
                  onClick={() => HandleActiveButton(index + 1, value.category, value.id)}
                >
                  {value.category}
                </li>
              ))}
          </ul>
        </div>
        <div className='col-span-6'>
          <div className='pb-5 border-b-[2px] border-dashed border-[#4e4e4e]'>
            <h1 className='text-lg font-bold uppercase'>{Category}</h1>
          </div>
          <div className='capitalize w-[400px] flex justify-between my-5'>
            <span>sắp xếp theo</span>
            <select
              name=''
              id=''
              className='w-[200px] outline-none border-[1px] border-[#8a8989] capitalize px-2 py-1 rounded-md appearance-none'
              onChange={HandleSelect}
            >
              <option value=''>sắp xếp theo</option>
              <option value='DESC' >giá cao - thấp</option>
              <option value='ASC'>Giá thấp - cao</option>
            </select>
          </div>
          <div className='grid grid-cols-5 gap-3'>
            {DataProduct &&  DataProduct.data.data?.data.map((value) => (
              <Link
                to='/productdetail/$productId'
                params={{ productId: value.id }}
                className='col-span-1 border-[1px] border-[#cfcece] rounded-md overflow-hidden p-2 h-[400px] flex flex-col justify-between cursor-pointer'
              >
                <div className='w-full h-[250px] overflow-hidden'>
                  <img
                    src={value.image}
                    alt=''
                  />
                </div>
                <div className=''>
                  <span className='line-clamp-2'>{value.productName}</span>
                  <div className='text-[#c92127] font-medium'>
                    <FormatPrice value={value.price} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUser
