import { useContext, useEffect, useState } from 'react'
import TableOver from '../../component/table'
import { AppContextData } from '../../context/AppContext'
import { OrderApi } from '../../authentication/OrderApi'
import { OrderDetailResponse } from '../../utils/FormResponse'
import StatusBadge from '../../component/statusbadge'
import { StatusType } from '../../component/statusbadge/StatusBadge'

const UserOrder = () => {
  const [isOpen, setIsOpen] = useState<OrderDetailResponse>()
  const { profile } = useContext(AppContextData)
  const [order, setOrder] = useState<OrderDetailResponse[] | undefined>([])
  useEffect(() => {
    const fetchOrders = async () => {
      if (profile?.id != null) {
        const result = await OrderApi.GetOrderByUserID(profile.id)
        setOrder(result.data.data)
      }
    }
    fetchOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className='w-[1200px] mx-auto text-center h-full'>
      <h1 className='text-xl font-bold uppercase my-10'>đơn hàng của bạn</h1>
      <div>
        <table className='w-[100%] text-left'>
          <thead className='capitalize'>
            <tr>
              <th>mã đơn hàng</th>
              <th>ngày đặt hàng</th>
              <th>trạng thái</th>
              <th>thao tác</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order?.map((item, index) => (
                <tr key={index} className='h-[50px]'>
                  <td>{item.id}</td>
                  <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                  <td>
                    <StatusBadge status={item.orderStatus as StatusType} />
                  </td>
                  <td>
                    <button
                      className='capitalize px-2 py-1 bg-[#c92127] text-white rounded-md'
                      onClick={() => setIsOpen(item)}
                    >
                      chi tiết
                    </button>
                  </td>
                  
                </tr>
              ))}
          </tbody>
          {isOpen && <TableOver onClick={() => setIsOpen(undefined)} data={isOpen} />}
        </table>
      </div>
    </div>
  )
}

export default UserOrder
