import { useForm } from '@tanstack/react-form'
import Input from '../../component/input'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useRef, useState } from 'react'
import { CartResponse } from '../../utils/FormType'
import { AppContextData } from '../../context/AppContext'
import FormatPrice from '../../component/formatPrice'
import { useMutation } from '@tanstack/react-query'
import { CartApi } from '../../authentication/CartAuth'
import { AddressRequest, OderRequest, UserAddressRequest } from '../../utils/FormRequest'
import userApi from '../../authentication/UserApi'
import { UserAndAddressResponse } from '../../utils/FormResponse'
import Button from '../../component/button'
import { OrderApi } from '../../authentication/OrderApi'

interface CartTotalPrice extends CartResponse {
  checked: boolean
}
const CartOrder = () => {
  const inputDiscount = useRef<HTMLInputElement>(null)
  const { profile } = useContext(AppContextData)
  const { state } = useLocation()
  const [productData, setProductData] = useState<CartTotalPrice[]>([])
  const [profileUser, setProfileUser] = useState<UserAndAddressResponse>()
  const [discountCode, setDiscountCode] = useState<number>(0)
  const [oderRequest, setOderRequest] = useState<OderRequest>()
  const navigate = useNavigate()
  useEffect(() => {
    if (state.__tempKey) {
      setProductData(JSON.parse(state.__tempKey))
    }
    if (profile?.id) {
      userApi
        .GetUserByUserId({ userId: profile.id })
        .then((res) => {
          if (res.data.data) {
            setProfileUser(res.data.data)
          }
        })
        .catch((err) => console.log(err))
      setOderRequest({
        userId: profile.id,
        totalItems: productData.length,
        totalPrice: 0,
        comment: '',
        orderItemRequests: productData.map((item) => ({
          productId: item.productId,
          color: item.color,
          size: item.size,
          quantity: item.quantity
        })),
      })
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const form = useForm<UserAddressRequest>({
    defaultValues: {
      commune: '',
      conscious: '',
      district: '',
      street: '',
      comment: ''
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      const addressUser: AddressRequest = {
        street: value.street,
        commune: value.commune,
        district: value.district,
        conscious: value.conscious,
        email: String(profileUser?.email)
      }
      setOderRequest((order) => {
        if (order) {
          return {
            ...order,
            totalPrice: Number(totalPrice) - (Number(totalPrice) * discountCode) / 100,
            comment: value.comment
          }
        }
        return order
      })

      try {
        await userApi.UpdateAddress(addressUser)
      } catch (error) {
        console.log(error)
      }
      try {
        if (oderRequest) {
          const resultOrder = await OrderApi.createOrderApi(oderRequest)
          swal({
            icon: 'success',
            text: `Đặt hàng thành công`,
            title: 'Thông Báo'
          })
          navigate({
            to: "/product",
            search: {
              status: false
            }
          })
          console.log(resultOrder.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  const isMuationSale = useMutation({
    mutationFn: (data: string) => CartApi.GetDiscountCode(data)
  })
  if (state.__tempKey) {
    console.log(JSON.parse(state.__tempKey))
  } else {
    console.log('state.__tempKey is undefined')
  }
  const HandleInputDiscount = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.toUpperCase()
    isMuationSale.mutate(event.currentTarget.value.toLowerCase(), {
      onSuccess: (res) => {
        console.log(res)
        if (res.data.data?.rate) {
          setDiscountCode(res.data.data.rate)
          swal({
            icon: 'success',
            text: `Bạn đã áp dụng mã giảm giá ${value} thành công`,
            title: 'Thông Báo'
          })
        } else {
          setDiscountCode(0)
          swal({
            icon: 'error',
            text: `Mã giảm giá ${value} không hợp lệ`,
            title: 'Thông Báo'
          })
        }
      },
      onError: (err) => {
        console.log(err)

        swal({
          icon: 'error',
          title: err.message
        })
      }
    })
  }
  console.log(profileUser)
  const totalPrice = productData
    .filter((item) => item.checked)
    .reduce((total, item) => {
      if (item.flashSale) {
        return total + (item.price - (item.price * item.sale) / 100) * item.quantity
      }
      return total + item.price * item.quantity
    }, 0)
  return (
    <form
      className='grid grid-cols-3 gap-10 px-5'
      onSubmit={(e) => {
        e.preventDefault(), e.stopPropagation(), form.handleSubmit()
      }}
    >
      <div className='col-span-2'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
            />
          </svg>

          <h1 className='font-bold text-xl ml-5'>ĐỊA CHỈ GIAO HÀNG</h1>
        </div>
        <div className='mt-5'>
          <div className='flex justify-between w-[100%] gap-5'>
            <div className='w-[50%]'>
              <div className='uppercase text-sm font-bold'>họ tên</div>
              <Input
                className='w-[100%] px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
                value={profileUser?.fullName}
                Filed={form.Field}
                disable
                name=''
              />
            </div>
            <div className='w-[50%]'>
              <div className='uppercase text-sm font-bold'>email</div>
              <Input
                className='w-[100%] px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
                Filed={form.Field}
                name=''
                disable
                value={String(profileUser?.email)}
              />
            </div>
          </div>
          <div className='mt-3'>
            <div className='uppercase text-sm font-bold'>sđt</div>
            <Input
              type='number'
              className='w-[100%] px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
              Filed={form.Field}
              name=''
              disable
              value={profileUser?.phone ? String(profileUser.phone) : ''}
            />
          </div>
          <div className='w-[100%] gap-5 mt-5 flex justify-between'>
            <Input
              Filed={form.Field}
              name='conscious'
              value={profileUser?.addresses?.conscious}
              className='px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
              placeholder='Nhập tỉnh thành phố'
            />
            <Input
              Filed={form.Field}
              name='district'
              value={profileUser?.addresses?.district}
              className=' px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
              placeholder='Nhập tỉnh thành phố'
            />
            <Input
              Filed={form.Field}
              name='commune'
              value={profileUser?.addresses?.commune}
              className=' px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
              placeholder='Nhập tỉnh thành phố'
            />
          </div>
          <div className='mt-3'>
            <div className='uppercase text-sm font-bold'>địa chỉ</div>
            <Input
              className='w-[100%] px-3 text-[#555555] py-2 outline-none border-[1px] border-[#a3a3a3] rounded-md mt-2'
              Filed={form.Field}
              name='street'
              value={profileUser?.addresses?.street}
              placeholder='Nhập địa chỉ'
            />
          </div>
          <form.Field name='comment'>
            {(field) => (
              <div className='mt-3'>
                <div className='uppercase text-sm font-bold'>ghi chú</div>
                <textarea
                  onChange={(e) => field.handleChange(e.target.value)}
                  className='w-[100%] resize-none outline-none border-[1px] border-[#a3a3a3] p-2 h-[100px]'
                  name={field.name}
                  placeholder='Nhập ghi chú của bạn'
                ></textarea>
              </div>
            )}
          </form.Field>
        </div>
        <div>
          <div className='flex items-center'>
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
                d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
              />
            </svg>
            <h1 className='font-bold text-xl uppercase ml-5'>phương thức thanh toán</h1>
          </div>
          <div className='flex flex-col gap-3 mt-5'>
            <label className='space-x-2 cursor-pointer'>
              <input type='radio' name='option' />
              <span>Thẻ ATM/Visa/Master/JCB/QR Pay qua VNPAY-QR</span>
            </label>
            <label className='space-x-2 cursor-pointer'>
              <input type='radio' name='option' checked />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
          </div>
        </div>
        <div>
          <h1 className='font-bold  text-2xl mt-10'>GIỎ HÀNG</h1>
          <div>
            <table className='w-[100%]'>
              <thead className='h-[50px] text-center'>
                <tr>
                  <th>Tên hàng</th>
                  <th>giá</th>
                  <th>số lượng</th>
                  <th>tổng tiền</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {productData &&
                  productData.map((item) => (
                    <tr key={item.productId} className='h-[150px]'>
                      <td className='w-[300px] text-left'>
                        <div className='flex w-[100%]'>
                          <div className='w-[200px] h-[130px] px-2 overflow-hidden'>
                            <img className='w-[100%] ' src={item.image} alt='' />
                          </div>
                          <div>
                            <h2>{item.name}</h2>
                            <div>
                              Kích thước: <span className='font-bold'>{item.size}</span>
                            </div>
                            <div>
                              Màu Sắc: <span className='font-bold'>{item.color}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='w-[100px]'>
                        <div className='text-[#c92127] font-medium'>
                          <FormatPrice
                            value={item.flashSale ? item.price - (item.price * item.sale) / 100 : item.price}
                          />
                        </div>
                        <div className='line-through text-[#737373]'>
                          <FormatPrice value={item.price} />
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <span className='text-lg font-bold'>
                          <FormatPrice
                            value={item.flashSale ? item.price - (item.price * item.sale) / 100 : item.price}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='col-span-1 p-3'>
        <h1 className='uppercase font-bold text-xl'>ĐƠn hàng</h1>
        <div className='mt-5'>
          <div className='text-xs uppercase font-medium'>mã phiếu giảm giá</div>
          <div className='flex border-[1px] overflow-hidden border-[#a3a3a3] w-[100%] rounded-md mt-2'>
            <div className='flex-1'>
              <input
                ref={inputDiscount}
                onBlur={HandleInputDiscount}
                className='flex-1 px-3 py-2 outline-none border-none uppercase'
                placeholder='Nhập mã giảm giá'
                aria-disabled
              />
            </div>
            <button
              type='button'
              onClick={() => inputDiscount.current?.blur()}
              className='px-3 py-2 uppercase text-white bg-[#c92127] flex-none'
            >
              áp dụng
            </button>
          </div>
          <div className='border-y-[1px] border-dashed border-[#a3a3a3] py-3 space-y-2 mt-5'>
            <div className='flex justify-between'>
              <span>Tạm tính</span>
              <span className='font-bold'>
                <FormatPrice value={totalPrice} />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Phí vận chuyển</span>
              <span className='font-bold'>0đ</span>
            </div>
            <div className='flex justify-between'>
              <span>Mã giảm giá</span>
              <span className='font-bold'>
                - <FormatPrice value={(totalPrice * discountCode) / 100} />
              </span>
            </div>
          </div>
          <div className='py-3 border-b-[1px] border-dashed border-[#a3a3a3] '>
            <div className='flex justify-between'>
              <span>Tổng thanh toán</span>
              <span className='text-xl font-bold text-[#c92127]'>
                <FormatPrice value={totalPrice - (totalPrice * discountCode) / 100} />
              </span>
            </div>
          </div>
          <button className='w-[100%] py-2 uppercase bg-[#c92127] text-white rounded-md mt-5 font-medium'>
            <Button Subscribe={form.Subscribe} name='Đặt Hàng' className='px-3 w-[100%] flex justify-center' />
          </button>
        </div>
      </div>
    </form>
  )
}

export default CartOrder
