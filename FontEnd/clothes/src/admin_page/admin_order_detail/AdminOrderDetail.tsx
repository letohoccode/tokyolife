import { Route } from '../../routes/_adminlayout/adminorderdetail/$orderId'

const AdminOrderDetail = () => {
  const { orderId } = Route.useParams()
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý đơn hàng</div>
      <div className='w-[100%] px-10 mt-10'>
        <div className='flex justify-between shadow-md my-5'>
          <h1 className='text-2xl font-normal capitalize'>Thông tin đơn hàng</h1>
          <div className='text-xl'>
            <span>{orderId}</span>
            <span className='px-2 py-1 bg-blue-300 text-sm rounded-md ml-2'>đã xác nhận</span>
          </div>
        </div>
        <div className='grid grid-cols-2 '>
          <div className='col-span-1 capitalize text-sm'>
            <h3 className='text-xl'>thông tin khách hàng</h3>
            <div className='space-y-1 mt-2'>
              <div>Tran cong minh</div>
              <div>128 dien bien phu da nanf ha tinh</div>
              <div>trancongminh@gmail.com</div>
              <div>09768123123</div>
            </div>
          </div>
          <div className='col-span-1 text-right capitalize'>
            <h3 className='text-xl'>phuong thuc thanh toan</h3>
            <div className='space-y-1 mt-2'>
              <div className='text-sm'>thanh toan khi nhan hang</div>
              <h3 className='text-xl'>ngay dat hang</h3>
              <div className='text-sm'>26-12-20356</div>
            </div>
          </div>
        </div>
        <div className='my-10 capitalize'>
          <h1 className='text-xl'>thay đổi trạng thái đơn hàng</h1>
          <div>
            <select className='capitalize w-[300px] outline-none border-[1px] border-slate-300 rounded-md'>
              <option value=''>thay doi</option>
              <option value=''>đã xác nhận</option>
              <option value=''>xác nhận</option>
              <option value=''>hủy</option>
              <option value=''>chưa xác nhận</option>
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
                    <tr className='border-[1px] h-[120px] border-slate-300 px-2 py-1'>
                        <td className='w-[150px]'>
                            <div className='w-[100px]'>
                            <img className='w-[100%]' src="https://th.bing.com/th/id/R.8b1e07e24d620e3bd7619c417d8c4fb9?rik=nRLheWvi9YwMQw&pid=ImgRaw&r=0" alt="" />
                            </div>
                        </td>
                        <td>
                            <h2>Áo sơ mi cổ tròn</h2>
                            <span>kích thước: m12</span>
                            <span>Màu sắc: cam</span>
                        </td>
                        <td>149.000</td>
                        <td>3</td>
                        <td>268.000</td>
                    </tr>
                    <tr className='border-[1px] h-[120px] border-slate-300 px-2 py-1'>
                        <td className='w-[150px]'>
                            <div className='w-[100px]'>
                            <img className='w-[100%]' src="https://th.bing.com/th/id/R.8b1e07e24d620e3bd7619c417d8c4fb9?rik=nRLheWvi9YwMQw&pid=ImgRaw&r=0" alt="" />
                            </div>
                        </td>
                        <td>
                            <h2>Áo sơ mi cổ tròn</h2>
                            <span>kích thước: m12</span>
                            <span>Màu sắc: cam</span>
                        </td>
                        <td>149.000</td>
                        <td>3</td>
                        <td>268.000</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetail
