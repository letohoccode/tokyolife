import { Link } from '@tanstack/react-router'
import { OrderApi } from '../../authentication/OrderApi'
import { useQuery } from '@tanstack/react-query'
import StatusBadge from '../../component/statusbadge'
import { StatusType } from '../../component/statusbadge/StatusBadge'

const AdminOrder = () => {
  const { data } = useQuery({
    queryKey: ['order'],
    queryFn: () => OrderApi.GetAllListOrder(),
    staleTime : 3,
  })

  console.log(data)
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý đơn hàng</div>
      <div className='w-[100%] px-10 mt-10'>
        <table className='w-[100%] text-left capitalize'>
          <thead>
            <tr>
              <th>mã đơn hàng</th>
              <th>người đặt</th>
              <th>ngày đặt</th>
              <th>trạng thái</th>
              <th>thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.data?.data &&
              data.data.data.data.map((item) => (
                <tr key={item.id} className='h-[40px]'>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                  <td>
                    <StatusBadge status={item.orderStatus as StatusType} />
                  </td>
                  <td>
                    <Link
                      to='/adminorderdetail/$orderId'
                      params={{ orderId: item.id }}
                      className='px-2 py-1 bg-[#c92127] rounded-md'
                    >
                      Xem
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrder
