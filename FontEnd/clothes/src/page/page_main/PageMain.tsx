import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ProductApi } from '../../authentication/productApi'
import FormatPrice from '../../component/formatPrice'

const PageMain = () => {
  const { data } = useQuery({
    queryKey: ['productFlashSale'],
    queryFn: () => ProductApi.GetProductFlashSale({ page: 0, size: 10, status: true }),
    staleTime: 6000
  })

  const { data: Data1 } = useQuery({
    queryKey: ['productNoFlashSale'],
    queryFn: () => ProductApi.GetProductFlashSale({ page: 0, size: 10, status: false })
  })
  const DataFlashSale = data?.data.data
  const DataNoFlashSale = Data1?.data.data
  console.log(DataFlashSale)
  console.log(DataNoFlashSale)
  return (
    <div className='w-[1200px] mx-auto'>
      <div className=' w-[100%] h-[500px]'>
        <img
          className='w-[100%] h-[100%]'
          src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F1722852767285321.jpg&w=1920&q=75'
          alt=''
        />
      </div>
      <div className=''>
        <div className='w-[100%] text-center my-7'>
          <h1 className='uppercase text-xl font-semibold text-[#c92127]'>nên mua gì hôm nay?</h1>
        </div>
        <div className='grid grid-cols-12 gap-4'>
          <Link to='/productdetail/$productId' params={{ productId: 'skasdas' }} className='col-span-2'>
            <div className='rounded-full w-[100%] overflow-hidden'>
              <img
                src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17228520060078182_512.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='text-center mt-3'>Áo chống nắng nữ</div>
          </Link>
          <Link className='col-span-2'>
            <div className='rounded-full w-[100%] overflow-hidden'>
              <img
                src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17228521110751971_512.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='text-center mt-3'>Áo chống nắng nữ</div>
          </Link>
          <Link className='col-span-2'>
            <div className='rounded-full w-[100%] overflow-hidden'>
              <img
                src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17053979608061321_512.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='text-center mt-3'>dsfdsfds</div>
          </Link>
          <Link className='col-span-2'>
            <div className='rounded-full w-[100%] overflow-hidden'>
              <img
                src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17228519718438913_512.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='text-center mt-3'>dsfdsfds</div>
          </Link>
          <Link className='col-span-2'>
            <div className='rounded-full w-[100%] overflow-hidden'>
              <img
                src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17053979513544092_512.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='text-center mt-3'>dsfdsfds</div>
          </Link>
          <Link className='col-span-2'>
            <div className='rounded-full w-[100%] overflow-hidden'>
              <img
                src='https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17053979440118977_512.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='text-center mt-3'>dsfdsfds</div>
          </Link>
        </div>
      </div>
      <div className='mt-10 '>
        <div className='flex justify-between shadow-md py-1'>
          <div className='flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' width='13' height='26' viewBox='0 0 13 26' fill='none'>
              <path
                d='M12.2169 11.7216H7.47996L12.5115 1.65904C12.735 1.2115 12.41 0.685059 11.9095 0.685059H4.99894C4.5056 0.685059 4.07021 1.00678 3.92508 1.47804L0.0313684 14.1331C-0.106589 14.5801 0.22782 15.0326 0.695219 15.0326H5.05191L1.88441 25.3722C1.78784 25.6255 2.11563 25.8236 2.29497 25.6206L12.6672 12.7199C13.0098 12.3325 12.7345 11.7216 12.2169 11.7216Z'
                fill='url(#paint0_linear_6489_195507)'
              ></path>
              <defs>
                <linearGradient
                  id='paint0_linear_6489_195507'
                  x1='5.84276'
                  y1='42.9'
                  x2='14.3615'
                  y2='41.9177'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#7A171B'></stop>
                  <stop offset='1' stop-color='#D10007'></stop>
                </linearGradient>
              </defs>
            </svg>
            <span className='uppercase text-2xl font-medium ml-1'>flash sale</span>
          </div>
          <div className='flex items-center text-[#c92127]'>
            <Link to='/product' search={{ status: true, page: 0, size: 10 }}>
              Xem tất cả
            </Link>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5 ml-1'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
            </svg>
          </div>
        </div>

        {DataFlashSale &&
          DataFlashSale.data.map((value) => (
            <div className='grid grid-cols-10 gap-3 mt-5'>
              <Link
                to='/productdetail/$productId'
                params={{ productId: value.id }}
                className='col-span-2 relative border-[1px] border-slate-300 px-2'
              >
                <div className='h-[310px]'>
                  <img className='w-[100%] h-[100%]' src={value.image} alt='' />
                </div>
                <div>
                  <p className='line-clamp-2'>{value.productName}</p>
                  <div className='text-[#c92127] font-medium my-2'>
                    <FormatPrice value={(value.price * value.sale) / 100} />
                  </div>
                  <div>
                    <span className='line-through text-[#737373]'>
                      <FormatPrice value={value.price} />
                    </span>
                    <span className='text-[#c92127] ml-2 font-medium'>{value.sale}%</span>
                  </div>
                </div>
                <div className='absolute top-0 left-0'>
                  <span className='bg-[#c92127] py-1 px-2 rounded-md text-white font-medium'>{value.sale}%</span>
                </div>
              </Link>
              <div className='col-span-2 border-[1px] relative border-slate-300 px-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
                <div className='absolute top-0 left-0'>
                  <span className='bg-[#c92127] py-1 px-2 rounded-md text-white font-medium'>34%</span>
                </div>
              </div>
              <div className='col-span-2 border-[1px] border-slate-300 px-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
              <div className='col-span-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
              <div className='col-span-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div>
        <div className='text-center my-10'>
          <h1 className='text-2xl capitalize font-medium'>sản phẩm mới ra mắt</h1>
        </div>
        {DataNoFlashSale &&
          DataNoFlashSale.data.map((value) => (
            <div className='grid grid-cols-10 gap-3 mt-5'>
              <Link
                to='/productdetail/$productId'
                params={{ productId: value.id }}
                className='col-span-2 relative border-[1px] border-slate-300 px-2'
              >
                <div className='h-[310px]'>
                  <img className='w-[100%] h-[100%]' src={value.image} alt='' />
                </div>
                <div>
                  <p className='line-clamp-2'>{value.productName}</p>
                  <div className='text-[#c92127] font-medium my-2'>
                    <FormatPrice value={value.price} />
                  </div>
                </div>
              </Link>
              <div className='col-span-2 border-[1px] border-slate-300 px-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
              <div className='col-span-2 border-[1px] border-slate-300 px-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
              <div className='col-span-2 border-[1px] border-slate-300 px-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
              <div className='col-span-2'>
                <div className='h-[310px]'>
                  <img
                    className='w-[100%] h-[100%]'
                    src='https://th.bing.com/th/id/OIP.GttUKYlygugq0UjwfIPDEQHaJ4?rs=1&pid=ImgDetMain'
                    alt=''
                  />
                </div>
                <div>
                  <p className='line-clamp-2'>Áo chống nắng cao cấp SunStop UV Master mũ liền dáng dài 40000441</p>
                  <div className='text-[#c92127] font-medium my-2'>425,000d</div>
                  <div>
                    <span className='line-through text-[#737373]'>850,000</span>
                    <span className='text-[#c92127] ml-2 font-medium'>-50%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className=' mt-5 flex justify-center'>
          <Link
            to='/product'
            search={{ page: 0, size: 10, status: false }}
            className='px-3 py-2 bg-[#c92127] rounded-md capitalize text-white flex items-center'
          >
            xem tất cả
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4 ml-1'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageMain
