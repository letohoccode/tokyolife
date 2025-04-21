import { Link } from "@tanstack/react-router"

const AdminOrder = () => {
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
            <tr className='h-[40px]'>
              <td>67dsahdsakdhas66d8sads</td>
              <td>Trần Đức Thịnh</td>
              <td>20-02-2024</td>
              <td>
                <span   className='text-xs bg-green-300 px-2 py-1 rounded-md'>đã xác nhận</span>
              </td>
              <td>
                <button type="button" className="px-2 py-1 bg-[#c92127] rounded-md">Xem</button>
              </td>
            </tr>
            <tr className='h-[40px]'>
              <td>67dsahdsakdhas66d8sads</td>
              <td>Trần Đức Thịnh</td>
              <td>20-02-2024</td>
              <td>
                <span className='text-xs bg-red-300 px-2 py-1 rounded-md'>đã xác nhận</span>
              </td>
              <td>
                <Link to="/adminorderdetail/$orderId" params={{orderId : 'sdjsadasdsa'}} className="px-2 py-1 bg-[#c92127] rounded-md">Xem</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrder
