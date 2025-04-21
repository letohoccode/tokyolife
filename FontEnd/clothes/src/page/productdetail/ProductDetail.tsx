import { Route } from '../../routes/_layout/productdetail/$productId'
import InputNumber from '../../component/input_number'
import ClickChildren from '../../component/click_children'
import StarRating from '../../component/star_rating'
import { useContext, useEffect, useState } from 'react'
import { ProductApi } from '../../authentication/productApi'
import { AddCartRequest, FormProductDetailResponse } from '../../utils/FormType'
import { CartApi } from '../../authentication/CartAuth'
import { AppContextData } from '../../context/AppContext'
import { useMutation } from '@tanstack/react-query'
import FormatPrice from '../../component/formatPrice'

const ProductDetail = () => {
  const { productId } = Route.useParams()
  const { profile } = useContext(AppContextData)
  const [image, setImage] = useState<string>('')
  const [dataProduct, setDataProduct] = useState<FormProductDetailResponse>()
  const [cartItem, setCartItem] = useState<AddCartRequest>({
    userId: profile?.id || 0,
    productId: productId,
    size: '',
    color: '',
    quantity: 1,
    price: 0
  })
  useEffect(() => {
    window.scrollTo(0, 0)
    if (productId) {
      ProductApi.GetProduct(productId).then((response) => setDataProduct(response.data.data))
    }
  }, [productId])
  const isMuationCart = useMutation({
    mutationFn: (cartItem: AddCartRequest) => {
      return CartApi.AddToCart(cartItem)
    },
    onSuccess: (response) => {
      console.log('Product added to cart:', response.data)
      swal({
        icon: 'success',
        title: 'Thêm sản phẩm vào giỏ hàng thành công!'
      })
    },
    onError: (error) => {
      console.error('Error adding product to cart:', error)
      swal({
        icon: 'error',
        title: 'Thêm sản phẩm vào giỏ hàng thất bại!'
      })
    }
  })
  const HandelClick = () => {
    if (dataProduct) {
      cartItem.price = dataProduct.price
      if(cartItem.color === '' || cartItem.size === '') {
        swal({
          icon: 'warning',
          title: 'Vui lòng chọn màu và size sản phẩm trước khi thêm vào giỏ hàng.'
        })
        return;
      }
      console.log(cartItem)
      console.log(dataProduct.price)
      if (cartItem) {
        isMuationCart.mutate(cartItem)
      } else {
        alert('Vui lòng chọn sản phẩm trước khi thêm vào giỏ hàng.')
      }
    }
  }
  const HandleValueQuatity = (value: number) => {
    setCartItem({
      ...cartItem,
      quantity: value
    })
  }
  console.log(dataProduct)
  return (
    <div className='w-[1200px] mx-auto'>
      <div>
        <div>
          <span>Trang chủ</span>
          <span> | {dataProduct?.productName}</span>
        </div>
        <div className='grid grid-cols-3 w-[100%] h-[900px] mt-7 gap-6'>
          <div className='col-span-2 flex'>
            <div className='w-[80px] px-1 space-y-2  flex-row'>
              {dataProduct?.listImages &&
                dataProduct?.listImages.map((img, index) => (
                  <div
                    key={index}
                    className='w-[100%] h-[100px] border-[1px]'
                    style={{ borderColor: image === img ? '#ed4a36' : '' }}
                  >
                    <img className='w-[100%] h-[100%]' onClick={() => setImage(img)} src={img} />
                  </div>
                ))}
            </div>
            <div className='flex-1 overflow-hidden h-[900px]'>
              <img className='w-[100%] ' src={image || dataProduct?.listImages[0]} />
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex space-x-1 items-center text-sm'>
              <span className='px-2 py-1 bg-[#ed4a36] rounded-md'>Bán chạy</span>
              <span className='px-2 py-1 bg-[#007a8b] rounded-md'>FreeShip</span>
            </div>
            <div className='my-4'>
              <h1 className='font-medium text-2xl capitalize'>{dataProduct?.productName}</h1>
              <span>SKU: F9UVJ084M-015</span>
            </div>
            <div className='flex'>
              <StarRating starNumber={5} />
              <span className='px-2 border-r-2 border-slate-900'>5 sao</span>
              <span className='px-2 border-r-2 border-slate-900'>8 đánh giá</span>
              <span className='px-2 '>3011 đã bán</span>
            </div>
            <div className='text-[#c92027] text-sm my-4'>{dataProduct?.described}</div>
            {dataProduct?.flashSale ? (
              <div className='flex justify-between py-2 border-b-2 border-dashed border-slate-400'>
                <span className='text-2xl text-[#c92027] font-medium'>
                 <FormatPrice value={(dataProduct.price * dataProduct.sale) / 100} />
                </span>
                <span>còn hàng</span>
              </div>
            ) : (
              <div className='flex justify-between py-2 border-b-2 border-dashed border-slate-400'>
                <span className='text-2xl text-[#c92027] font-medium'>550,000d</span>
                <span>còn hàng</span>
              </div>
            )}
            <div className='mt-5 '>
              <div>Chọn loại sản phẩm</div>
              <select
                className='outline-none border-[1px] border-slate-500 appearance-none w-[200px] mt-3 px-2'
                name=''
                id=''
                onChange={(e) => {
                  const selectedValue = JSON.parse(e.target.value)
                  setCartItem({
                    ...cartItem,
                    color: selectedValue.color,
                    size: selectedValue.size
                  })
                }}
              >
                <option value="">-- Chọn màu và size --</option>
                {dataProduct?.productSize &&
                  dataProduct.productSize.map((value,index) => (
                    <div className='capitalize'>
                      <option key={index} value={JSON.stringify({color : value.color, size : value.size})}>{value.color + ' - ' + value.size}</option>
                    </div>
                  ))}
              </select>
            </div>
            <div className='flex justify-between items-center'>
              <span className='capitalize font-medium'>Số Lượng</span>
              <InputNumber onChange={HandleValueQuatity} className='my-5' />
            </div>
            <span>Hướng dẫn chọn kích thước</span>
            <div className='flex space-x-2 my-5'>
              <button
                onClick={HandelClick}
                className='flex w-[50%] justify-center items-center gap-1 px-5 py-3 border-[2px] border-[#c92027] rounded-md text-[#c92027] font-medium '
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
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                  />
                </svg>
                <span>Thêm Giỏ Hàng</span>
              </button>
              <button className='flex w-[50%] items-center gap-1 justify-center bg-[#c92027] rounded-md text-center text-white font-medium '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5'
                  />
                </svg>
                <span>Mua Ngay</span>
              </button>
            </div>
            <div>
              <button className='w-[100%] py-3 border-[2px] border-slate-600 rounded-md capitalize'>
                tìm cửa hàng có sản phẩm
              </button>
            </div>
          </div>
        </div>
        <div className='mt-10 mb-5'>
          <ClickChildren className='w-[100%]' content='Mô tả sản phẩm'>
            <div className='px-2'>Chưa có sản phẩm nào</div>
          </ClickChildren>

          <ClickChildren className='mt-3' content='Đánh giá của người dùng'>
            <div className='p-3'>
              <table className='w-[100%] mx-auto text-left my-5 px-2'>
                <thead className='capitalize w-[32%]'>
                  <tr>
                    <th>người đánh giá</th>
                    <th>đánh giá</th>
                    <th>bình luận</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='h-[40px]'>
                    <td>Lê Nguyên Tố</td>
                    <td>
                      <StarRating starNumber={1} />
                    </td>
                    <td>san pham nhu CC</td>
                  </tr>
                  <tr className='h-[40px]'>
                    <td>Vo Minh Nhat</td>
                    <td>
                      <StarRating starNumber={5} />
                    </td>
                    <td>san pham qua chat luong</td>
                  </tr>
                </tbody>
              </table>
              <div className='p-5 border-[1px] border-slate-500'>
                <StarRating rating />
                <div className='mt-5'>
                  <span className='capitalize'>đánh giá</span>
                  <div>
                    <textarea
                      name=''
                      id=''
                      className='h-[60px] resize-none outline-none border-[1px] mt-2 border-slate-500 w-[100%]'
                    />
                  </div>
                  <button className='w-[100%] h-[40px] rounded-md capitalize text-white bg-[#c92027] mt-5'>
                    Gửi đánh giá
                  </button>
                </div>
              </div>
            </div>
          </ClickChildren>
        </div>
        <div className='mt-10'>
          <div className='capitalize font-medium text-xl'>sản phẩm gợi ý</div>
          <div className='grid grid-cols-10 gap-3 mt-5'>
            <div className='col-span-2 relative border-[1px] border-slate-300 px-2'>
              <div className='h-[310px]'>
                <img
                  className='w-[100%] h-[100%]'
                  src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                  alt=''
                />
              </div>
              <div>
                <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                <div>
                  <span className='line-through text-[#737373]'>850,000</span>
                  <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                </div>
              </div>
              <div className='absolute top-0 left-0'>
                <span className='bg-[#c92127] py-1 px-2 rounded-md text-white font-medium'>50%</span>
              </div>
            </div>
            <div className='col-span-2 border-[1px] border-slate-300 px-2'>
              <div className='h-[310px]'>
                <img
                  className='w-[100%] h-[100%]'
                  src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                  alt=''
                />
              </div>
              <div>
                <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                <div>
                  <span className='line-through text-[#737373]'>850,000</span>
                  <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {productId}
    </div>
  )
}

export default ProductDetail
