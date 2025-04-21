import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Route } from '../../routes/_layout/product'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ProductApi } from '../../authentication/productApi'
import { ParamsFormPoduct } from '../../utils/FormType'
import { CategoryApi } from '../../authentication/Category'
import { CategoryForm } from '../../utils/Form'

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
  const { data: DataProduct } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductApi.GetProductCategory(ProductStatusRequest)
  })
  const HandleActiveButton = (index: number, value?: string, id?: string) => {
    setActiveButton(index), SetCategory(value)
    if (id != null) {
      const newProductRequest = { ...ProductStatusRequest, category: id }
      Navigate({ to: '/product', search: newProductRequest })
      queryclient.invalidateQueries({ queryKey: ['products'] })
    }
  }
  const HandleSelect = (value: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    const dataSelect = value.currentTarget.value
    if (dataSelect != null) {
      const newProductRequest = { ...ProductStatusRequest, sort: dataSelect }
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
              <option value='DESC'>giá cao - thấp</option>
              <option value='ASC'>Giá thấp - cao</option>
            </select>
          </div>
          <div className='grid grid-cols-5 gap-3'>
            {[...Array(10)].map((value) => (
              <Link
                to='/productdetail/$productId'
                params={{ productId: value }}
                className='col-span-1 border-[1px] border-[#cfcece] rounded-md overflow-hidden p-2 h-[400px] flex flex-col justify-between cursor-pointer'
              >
                <div className='w-full h-[250px] overflow-hidden'>
                  <img
                    src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.amazonaws.com%2Fcms%2Fproducts%2FF7UVJ051M-018%2F90b47b9292144f3eb415b0a073dc5f84_thumbnail.jpg&w=1920&q=75'
                    alt=''
                  />
                </div>
                <div className=''>
                  <span className='line-clamp-2'>Áo chống nắng SunStop UV Master F7UVJ051M</span>
                  <div className='text-[#c92127] font-medium'>259,000d</div>
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
