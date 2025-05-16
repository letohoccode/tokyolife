import { useEffect, useState } from 'react'
import { Route } from '../../routes/_adminlayout/adminorderdetail/$orderId'
import { OrderApi } from '../../authentication/OrderApi'
import { OrderResponse } from '../../utils/FormResponse'
import StatusBadge from '../../component/statusbadge'
import { StatusType } from '../../component/statusbadge/StatusBadge'

const AdminOrderDetail = () => {
  const { orderId } = Route.useParams()
  const [orderResponse, setOrderResponse] = useState<OrderResponse>()
  useEffect(() => {
    if (orderId) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])
  const fetchData = async () => {
    try {
      const response = await OrderApi.SearchOrderApi(orderId)
      setOrderResponse(response.data.data)
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }
  const HandleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    console.log(value)
    try {
      await OrderApi.ConfirmOrder({ type: value, orderId: orderId })
      swal({
        title: 'Thay đổi trạng thái đơn hàng thành công',
        icon: 'success',
      })
      fetchData()
    } catch (error) {
      swal({
        title: 'Thay đổi trạng thái đơn hàng thất bại',
        icon: 'error',
      })
    }
  }
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý đơn hàng</div>
      <div className='w-[100%] px-10 mt-10'>
        <div className='flex justify-between shadow-md my-5'>
          <h1 className='text-2xl font-normal capitalize'>Thông tin đơn hàng</h1>
          <div className='text-xl gap-2 flex items-center'>
            <span>{orderId}</span>
            <StatusBadge status={orderResponse?.orderStatus as StatusType} />
          </div>
        </div>
        <div className='grid grid-cols-2 '>
          <div className='col-span-1 capitalize text-sm'>
            <h3 className='text-xl'>thông tin khách hàng</h3>
            <div className='space-y-1 mt-2'>
              <div>{orderResponse?.userName}</div>
              <div>
                {orderResponse?.address.street}, {orderResponse?.address.district}, {orderResponse?.address.conscious},{' '}
                {orderResponse?.address.commune}
              </div>
              <div>{orderResponse?.email}</div>
              <div>{orderResponse?.phone}</div>
            </div>
          </div>
          <div className='col-span-1 text-right capitalize'>
            <h3 className='text-xl'>phuong thuc thanh toan</h3>
            <div className='space-y-1 mt-2'>
              <div className='text-sm'>thanh toan khi nhan hang</div>
              <h3 className='text-xl'>ngay dat hang</h3>
              <div className='text-sm'>
                {orderResponse?.date ? new Date(orderResponse.date).toLocaleDateString('en-GB') : ''}
              </div>
            </div>
          </div>
        </div>
        <div className='my-10 capitalize'>
          <h1 className='text-xl'>thay đổi trạng thái đơn hàng</h1>
          <div>
            <select
              className='capitalize w-[300px] outline-none border-[1px] border-slate-300 rounded-md'
              onChange={HandleChange}
            >
              <option value=''>Thay Đổi</option>
              <option className='bg-gray-400 text-white' value='UNCONFIRMED'>
                chưa xác nhận
              </option>
              <option className='bg-yellow-400 text-white' value='CONFIRM'>
                xác nhận
              </option>
              <option className='bg-blue-500 text-white' value='TRANSPORT'>
                đang vận chuyển
              </option>
              <option className='bg-green-500 text-white' value='SUCCESS'>
                Hoàn thành
              </option>
            </select>
          </div>
        </div>
        <div>
          <h1>Thông tin đơn hàng</h1>
          <table className='w-[100%] text-left'>
            <thead className='capitalize'>
              <tr>
                <th>ảnh</th>
                <th>tên sản phẩm</th>
                <th>giá</th>
                <th>số lượng</th>
                <th>thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderResponse?.itemResponseList &&
                orderResponse.itemResponseList.map((value) => (
                  <tr key={value.productId} className='border-[1px] h-[120px] border-slate-300 px-2 py-1'>
                    <td className='w-[150px]'>
                      <div className='w-[100px]'>
                        <img className='w-[100%]' src={value.image} alt='' />
                      </div>
                    </td>
                    <td>
                      <h2>{value.name}</h2>
                      <span>kích thước: {value.size}</span>
                      <span>Màu sắc: {value.color}</span>
                    </td>
                    <td>{value.totalPrice}</td>
                    <td>{value.quantity}</td>
                    <td>{value.totalPrice * value.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetail
