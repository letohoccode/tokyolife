import { Link } from '@tanstack/react-router'

const Footer = () => {
  return (
    <div className='w-[1200px] mx-auto'>
      <div className='grid grid-cols-12 py-2'>
        <div className='col-span-2'>
          <h1 className='my-5 font-medium uppercase'>VỀ TOKYOLIFE</h1>
          <ul className='capitalize space-y-2 text-sm'>
            <li>
              <Link to='/' >chúng tôi là ai</Link>
            </li>
            <li>
              <Link>cam kết của chúng tôi</Link>
            </li>
            <li>
              <Link>tin tuyển dụng</Link>
            </li>
            <li>
              <Link>hệ thống cửa hảng</Link>
            </li>
          </ul>
        </div>
        <div className='col-span-2'>
          <h1 className='my-5 font-medium uppercase'>hỗ trợ khách hàng</h1>
          <ul className='capitalize space-y-2 text-sm'>
            <li>
              <Link>hướng dẫn đặt hàng</Link>
            </li>
            <li>
              <Link>phương thức thanh toán</Link>
            </li>
            <li>
              <Link>chính sách thành viên</Link>
            </li>
            <li>
              <Link>chính sách tích điểm</Link>
            </li>
          </ul>
        </div>
        <div className='col-span-2'>
          <h1 className='my-5 font-medium uppercase'>chính sách</h1>
          <ul className='capitalize space-y-2 text-sm'>
            <li>
              <Link>chính sách vận chuyển</Link>
            </li>
            <li>
              <Link>chính sách kiểm hàng</Link>
            </li>
            <li>
              <Link>chính sách đổi trả</Link>
            </li>
            <li>
              <Link>chính sách bảo mật </Link>
            </li>
          </ul>
        </div>
        <div className='col-span-3'>
          <h1 className='my-5 font-medium uppercase'>liên hệ</h1>
          <ul className='capitalize space-y-2 text-sm text-[#737373]'>
            <li className='my-1 font-medium text-black'>
              hỗ trợ tư vấn mua online:
            </li>
            <li>
              <Link>Hotline: 03333333333</Link>
            </li>
            <li>
              <Link>Email:lenguyento2k4@gmail.com</Link>
            </li>
            <li>
              <Link>Giờ làm việc: 24/24</Link>
            </li>
          </ul>
          <ul className='capitalize space-y-2 text-sm text-[#737373] mt-5'>
            <li className='my-1 font-medium text-black'>
              hỗ trợ khiếu nại và bảo hành sản phẩm
            </li>
            <li>
              <Link>Hotline: 0999999999</Link>
            </li>
            <li>
              <Link>Email:lenguyento2k4@gmail.com</Link>
            </li>
            <li>
              <Link>Giờ làm việc: 24/24</Link>
            </li>
          </ul>
        </div>
        <div className='col-span-3'>
          <h1 className='my-5 font-medium text-sm uppercase'>đăng ký nhận tin từ tokyolife</h1>
          <div className='flex my-4 border-[1px] border-black rounded-sm overflow-hidden'>
            <input type="text" placeholder='Nhập địa chỉ Email' className='outline-none border-none flex-1 px-2'/>
            <button className='text-white bg-black px-3 py-2 capitalize font-medium'>đăng ký</button>
          </div>
          <div>
            <p>Cài App nhận <span className='text-[#c92127]'>Ưu đãi 50% sinh nhật</span> tích điểm mọi hóa đơn</p>
          </div>
        </div>
      </div>
      <div className='absolute h-[65px] left-0 right-0 flex justify-center items-center bg-black text-white'>
        <div className='w-[150px]'>
          <img className='w-[100%]' src="https://tokyolife.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-logo.6b1d7eb1.png&w=256&q=75" alt="" />
        </div>
        <div>Copyright © 2014-2024 Tokyolife.vn All Rights Reserved.</div>
      </div>
    </div>
  )
}

export default Footer
