
type Props = {
  onClick: () => void
}
const TableOver = (props: Props) => {
  const HandleClick = () => {
    props.onClick && props.onClick()
  }
  return (
    <div className='fixed bg-[#00000080] inset-0 w-screen h-screen z-10  flex justify-center items-center '>
      <div  className='w-[1000px] h-[600px] bg-white rounded-sm px-3 transition-all duration-500 ease-out'>
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
        <div className='text-sm space-y-2 my-5 text-left'>
          <div>
            <span className='font-medium capitalize'>mã đơn hàng: </span>
            <span>79043slfnsldfsd</span>
          </div>
          <div>
            <span className='font-medium capitalize'>ngày đặt hàng: </span>
            <span>20-2348-23423</span>
          </div>
          <div>
            <span className='font-medium capitalize'>trạng thái: </span>
            <span>chờ xác nhận</span>
          </div>
          <div>
            <span className='font-medium capitalize'>tên khách hàng: </span>
            <span>le nguyen to</span>
          </div>
          <div>
            <span className='font-medium capitalize'>email: </span>
            <span>lenguyento2k4@gmail</span>
          </div>
          <div>
            <span className='font-medium capitalize'>số điện thoại: </span>
            <span>2929292929</span>
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
                <tr className='h-[60px]'>
                  <td>1</td>
                  <td className='w-[100px] '>
                    <div className='w-[100px] h-[100px] overflow-hidden'>
                      <img
                        className='w-[100%]'
                        src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17206057246085064.jpg&w=1920&q=75'
                        alt=''
                      />
                    </div>
                  </td>
                  <td className='space-y-1'>
                    <span className='first-letter:uppercase'>áo chống nắng nữ tay dài đẹp phong cách</span>
                    <div>
                      <span>Kích Thước: </span>
                      <span>S</span>
                    </div>
                    <div>
                      <span>Màu sắc: </span>
                      <span>Xanh</span>
                    </div>
                  </td>
                  <td>
                    <span className='text-[#c92127] font-medium'>149,000đ</span>
                  </td>
                  <td>2</td>
                  <td className='font-medium'>299,000đ</td>
                </tr>
                <tr className='h-[60px]'>
                  <td>1</td>
                  <td className='w-[100px] '>
                    <div className='w-[100px] h-[100px] overflow-hidden'>
                      <img
                        className='w-[100%]'
                        src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17206057246085064.jpg&w=1920&q=75'
                        alt=''
                      />
                    </div>
                  </td>
                  <td className='space-y-1'>
                    <span className='first-letter:uppercase'>áo chống nắng nữ tay dài đẹp phong cách</span>
                    <div>
                      <span>Kích Thước: </span>
                      <span>S</span>
                    </div>
                    <div>
                      <span>Màu sắc: </span>
                      <span>Xanh</span>
                    </div>
                  </td>
                  <td>
                    <span className='text-[#c92127] font-medium'>149,000đ</span>
                  </td>
                  <td>2</td>
                  <td className='font-medium'>299,000đ</td>
                </tr>
                <tr className='h-[60px]'>
                  <td>1</td>
                  <td className='w-[100px] '>
                    <div className='w-[100px] h-[100px] overflow-hidden'>
                      <img
                        className='w-[100%]'
                        src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17206057246085064.jpg&w=1920&q=75'
                        alt=''
                      />
                    </div>
                  </td>
                  <td className='space-y-1'>
                    <span className='first-letter:uppercase'>áo chống nắng nữ tay dài đẹp phong cách</span>
                    <div>
                      <span>Kích Thước: </span>
                      <span>S</span>
                    </div>
                    <div>
                      <span>Màu sắc: </span>
                      <span>Xanh</span>
                    </div>
                  </td>
                  <td>
                    <span className='text-[#c92127] font-medium'>149,000đ</span>
                  </td>
                  <td>2</td>
                  <td className='font-medium'>299,000đ</td>
                </tr>
                <tr className='h-[60px]'>
                  <td>1</td>
                  <td className='w-[100px] '>
                    <div className='w-[100px] h-[100px] overflow-hidden'>
                      <img
                        className='w-[100%]'
                        src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17206057246085064.jpg&w=1920&q=75'
                        alt=''
                      />
                    </div>
                  </td>
                  <td className='space-y-1'>
                    <span className='first-letter:uppercase'>áo chống nắng nữ tay dài đẹp phong cách</span>
                    <div>
                      <span>Kích Thước: </span>
                      <span>S</span>
                    </div>
                    <div>
                      <span>Màu sắc: </span>
                      <span>Xanh</span>
                    </div>
                  </td>
                  <td>
                    <span className='text-[#c92127] font-medium'>149,000đ</span>
                  </td>
                  <td>2</td>
                  <td className='font-medium'>299,000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-right py-3 capitalize">
            <span>tổng tiền: </span>
            <span className="text-lg font-medium">1,900,000đ</span>
        </div>
      </div>
    </div>
  )
}

export default TableOver
