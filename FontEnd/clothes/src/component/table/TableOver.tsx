import { OrderDetailResponse } from '../../utils/FormResponse'
import FormatPrice from '../formatPrice'
import StatusBadge from '../statusbadge'
import { StatusType } from '../statusbadge/StatusBadge'

type Props = {
  onClick: () => void
  data: OrderDetailResponse
}
const TableOver = (props: Props) => {
  const HandleClick = () => {
    props.onClick && props.onClick()
  }
  return (
    <div className='fixed bg-[#00000080] inset-0 w-screen h-screen z-10  flex justify-center items-center '>
      <div className='w-[1000px] h-[600px] bg-white rounded-sm px-3 transition-all duration-500 ease-out'>
        <div className='flex justify-between'>
          <h2 className='capitalize text-lg font-medium mt-3'>chi tiết đơn hàng</h2>
          <button className='px-2  text-[#c92127] font-bold' onClick={HandleClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        {props.data && (
          <>
            <div className='text-sm space-y-2 my-5 text-left'>
              <div>
                <span className='font-medium capitalize'>mã đơn hàng: </span>
                <span>{props.data.id}</span>
              </div>
              <div>
                <span className='font-medium capitalize'>ngày đặt hàng: </span>
                <span>{new Date(props.data.date).toLocaleDateString('en-GB')}</span>
              </div>
              <div>
                <span className='font-medium capitalize'>trạng thái: </span>
                <span>
                  <StatusBadge status={props.data.orderStatus as StatusType} /> </span>
              </div>
              <div>
                <span className='font-medium capitalize'>tên khách hàng: </span>
                <span>{props.data.userName}</span>
              </div>
            </div>
            <div className='text-center'>
              <h1 className='uppercase text-xl font-bold '>giỏ hàng</h1>
              <div className='max-h-[270px] overflow-y-auto overflow-hidden '>
                <table className='w-[100%] table-auto'>
                  <thead className='capitalize'>
                    <tr>
                      <th>STT</th>
                      <th>ảnh</th>
                      <th>sản phẩm</th>
                      <th>giá</th>
                      <th>số lượng</th>
                      <th>thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.data.itemResponseList.map((item, index) => (
                      <tr key={index} className='h-[60px]'>
                        <td>{index + 1}</td>
                        <td className='w-[100px] '>
                          <div className='w-[100px] h-[100px] overflow-hidden'>
                            <img className='w-[100%]' src={item.image} alt='' />
                          </div>
                        </td>
                        <td className='space-y-1'>
                          <span className='first-letter:uppercase'>{item.name}</span>
                          <div>
                            <span>Kích Thước: </span>
                            <span>{item.size}</span>
                          </div>
                          <div>
                            <span>Màu sắc: </span>
                            <span>{item.color}</span>
                          </div>
                        </td>
                        <td>
                          <span className='text-[#c92127] font-medium'>
                            <FormatPrice value={item.totalPrice / item.quantity} />
                            đ</span>
                        </td>
                        <td>{item.quantity}</td>
                        <td className='font-medium'>
                          <FormatPrice value={item.totalPrice} />
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='text-right py-3 capitalize'>
              <span>tổng tiền: </span>
              <span className='text-lg font-medium'>
                <FormatPrice value={props.data.totalPrice} />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TableOver
