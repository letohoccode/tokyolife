import { Link } from '@tanstack/react-router'
import InputNumber from '../../component/input_number'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContextData } from '../../context/AppContext'
import { CartResponse } from '../../utils/FormType'
import { CartApi } from '../../authentication/CartAuth'
import FormatPrice from '../../component/formatPrice'

interface CartTotalPrice extends CartResponse {
  checked: boolean
}

const CartPage = () => {
  const { profile } = useContext(AppContextData)
  const [cartData, SetCartData] = useState<CartResponse[] | undefined>([])
  const [totalPrice, setTotalPrice] = useState<CartTotalPrice[]>([])
  const fetchCart = useCallback(() => {
    if (profile?.id) {
      CartApi.GetCart(profile.id).then((res) => {
        SetCartData(res.data.data)
      })
    }
  }, [profile?.id])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])
  const HandleCheckBox = (cart: CartResponse, value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      setTotalPrice((prev) => [...prev, { ...cart, checked: true }])
    } else {
      setTotalPrice((prev) =>
        prev.map((item) => (item.productId === cart.productId ? { ...item, checked: false } : item))
      )
    }
  }
  const HandleChangeInput = (value: number, productId: string) => {
    if (profile?.id) {
      const CartUpdateQuantity = {
        userId: profile?.id,
        productId: productId,
        quantity: value
      }
      CartApi.UpdateQualityCart(CartUpdateQuantity)
        .then((res) => {
          console.log(res)
          swal({
            icon: 'success',
            title: res.data.message
          })
          setTotalPrice((prev) =>
            prev.map((item) => (item.productId === productId ? { ...item, quantity: value } : item))
          )
          fetchCart()
        })
        .catch((err) => {
          console.log(err)
          swal({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  }
  const HandleClickCart = (productId: string) => {
    if (profile?.id) {
      CartApi.RemoveFromCart(profile.id, productId)
        .then((res) => {
          setTotalPrice((prev) => prev.filter((item) => item.productId !== productId))
          fetchCart()
          swal({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          console.log(err)
          swal({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  }

  const total = totalPrice.reduce((sum, item) => {
    if (!item.checked) return sum
    const itemTotal = item.flashSale ? (item.price - (item.price * item.sale) / 100) * item.quantity : item.price * item.quantity
    return sum + itemTotal
  }, 0)
  const totalPriceAll = JSON.stringify(totalPrice.filter((item) => item.checked))
  console.log('total', total)
  console.log('totalPrice', totalPrice)
  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        <div className='col-span-2'>
          <table className='w-[100%]'>
            <thead className='h-[50px] text-center'>
              <tr>
                <th></th>
                <th>Tên Hàng</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng Tiền</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {cartData?.map((item) => (
                <tr className='h-[150px]'>
                  <td key={item.productId}>
                    <div className='w-5 h-5 bg-[#c92027] '>
                      <input
                        type='checkbox'
                        onChange={(e) => HandleCheckBox(item, e)}
                        className='w-5 h-5 rounded focus:ring-blue-500  focus:ring-offset-[#c92027] scale-90 bg-[#c92027]'
                      />
                    </div>
                  </td>
                  <td className='w-[300px] text-left'>
                    <Link to='/productdetail/$productId' params={{ productId: item.productId }}>
                      <div className='flex w-[100%]'>
                        <div className='w-[200px] h-[130px] px-2 overflow-hidden'>
                          <img className='w-[100%] ' src={item.image} alt={item.name} />
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
                    </Link>
                  </td>
                  {item.flashSale ? (
                    <td className='w-[100px]'>
                      <div className='text-[#c92127] font-medium'>
                        <FormatPrice value={item.price - (item.price * item.sale) / 100} />
                      </div>
                      <div className='line-through text-[#737373]'>
                        <FormatPrice value={item.price} />
                      </div>
                    </td>
                  ) : (
                    <td className='w-[100px]'>
                      <div className='text-[#c92127] font-medium'>
                        <FormatPrice value={item.price} />
                      </div>
                      <div className='line-through text-[#737373]'>
                        <FormatPrice value={item.price} />
                      </div>
                    </td>
                  )}

                  <td>
                    <InputNumber
                      onChange={(value) => HandleChangeInput(value, item.productId)}
                      quantity={item.quantity}
                    />
                  </td>
                  <td>
                    <div className='flex-col flex justify-between items-end h-[120px]'>
                      {item.flashSale ? (
                        <div className='text-lg font-bold'>
                          <FormatPrice value={ item.price * item.quantity  -  ((item.price * item.sale * item.quantity) / 100)} />
                        </div>
                      ) : (
                        <div className='text-lg font-bold'>
                          <FormatPrice value={item.price} />
                        </div>
                      )}
                      <button
                        onClick={() => HandleClickCart(item.productId)}
                        className='items-end text-right text-[#c92127] px-2 py-1'
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-span-1 p-3'>
          <form action=''>
            <h1 className='text-2xl text-center font-bold uppercase'>Đơn hàng</h1>
            <div className='flex justify-between border-b-[1px] border-[#555555] border-dashed py-2 my-5'>
              <span className='text-[#555555]'>Tổng giá trị đơn hàng</span>
              <span className='text-lg text-[#c92127] font-bold'>
                <FormatPrice value={total} />
              </span>
            </div>
            <Link
              to='/cartorder'
              state={{ __tempKey: totalPriceAll }}
              className='flex items-center space-x-1 w-[100%] justify-center uppercase bg-[#c92127] py-2 rounded-md text-white font-medium'
            >
              <span>tiếp tục thanh toán</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
              </svg>
            </Link>
            <div className='text-[#555555] text-sm mt-3'>Dùng mã giảm giá của TokyoLife trong bước tiếp theo</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartPage
