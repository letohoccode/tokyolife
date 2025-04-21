import { useState } from 'react'
import TableOver from '../../component/table'

const UserOrder = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const HandleClickTable = () => setIsOpen(!isOpen)

  const HandleClickButton = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='w-[1200px] mx-auto text-center'>
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
            <tr className='h-[50px]'>
              <td>7023740234230jsdlkjsda</td>
              <td>21-90-2342</td>
              <td>chờ xác nhận</td>
              <td>
                <button className='capitalize px-2 py-1 bg-[#c92127] text-white rounded-md' onClick={HandleClickButton}>chi tiết</button>
              </td>
            </tr>
            <tr className='h-[50px]'>
              <td>7023740234230jsdlkjsda</td>
              <td>21-90-2342</td>
              <td>chờ xác nhận</td>
              <td>
                <button className='capitalize px-2 py-1 bg-[#c92127] text-white rounded-md' onClick={HandleClickButton}>
                  chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isOpen && <TableOver onClick={HandleClickTable} />}
    </div>
  )
}

export default UserOrder
