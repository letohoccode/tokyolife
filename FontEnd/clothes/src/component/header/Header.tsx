import { useFloating, useHover, useInteractions } from '@floating-ui/react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useContext, useState } from 'react'
import Popover from '../popover'
import ClickButton from '../click'
import { AppContextData } from '../../context/AppContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authenApi from '../../authentication/ApiAuth'

const Header = () => {
  const [isOppen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const {isLogin,setIsLogin,profile} = useContext(AppContextData)
  const navigate = useNavigate()
  const isLogout = useMutation({
    mutationFn : authenApi.LogoutApi,
    onSuccess : () => {
      setIsLogin(false)
      navigate({
        to: '/login',
      })
    }
  })
  const { refs, context } = useFloating({
    open: isOppen,
    onOpenChange: setIsOpen
  })
  const hover = useHover(context, {
    delay: {
      open: 150,
      close: 150
    },
    enabled: true
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  const HandleLogout = () => {
    isLogout.mutate()
  }
  return (
    <div className='w-[100%] z-10 sticky top-0 left-0 right-0 bottom-0 bg-white'>
      <div className='w-[100%] bg-[#e9d5b0]'>
        <div className='w-[1200px]  h-16 mx-auto py-3 flex justify-between items-center'>
          <Link to={'/'} className='h-[100%]'>
            <img
              className='h-[100%] w-44'
              src='https://tokyolife.vn/_next/static/media/logo-header-mobile.3a21670c.svg'
              alt=''
            />
          </Link>
          <div className='flex w-[500px]'>
            <Popover />
          </div>
          <div className='flex gap-5 relative'>
            <Link to='/cart' search={""}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                />
              </svg>
            </Link>
            <Link to='/searchorder'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 cursor-pointer '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
                />
              </svg>
            </Link>
            {isLogin ? 
              <ClickButton
              HandleLogout={HandleLogout}
              classNameParten='flex space-x-2 cursor-pointer'
                partenName={profile?.fullName}
                name1='thông tin cá nhân'
                name2='đơn hàng của tôi'
                name3='sản phẩm yêu thích'
                to1='/profile'
                to2='/userorder'
                logoutname='đăng xuất'
                classButton='capitalize'
                clasName='flex items-center space-x-2'
                style={{
                  position : 'absolute',
                  top: 35,
                  backgroundColor : 'white',
                  width : '200px',
                  padding : '15px',
                  borderWidth : '1px',
                  borderColor : '#999999',
                  borderRadius : '3px',
                  boxShadow : 'inherit'
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6 cursor-pointer'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </ClickButton>
             : 
            <Link className='' ref={refs.setReference} {...getReferenceProps()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </Link>
             }
             {isOppen && (
               <div
                 className='w-[250px] rounded-md bg-[#f3dcdd] transition-all items-center'
                 ref={refs.setFloating}
                 style={{
                   position: 'absolute',
                   right: -100,
                   top: 40
                 }}
                 {...getFloatingProps()}
               >
                 <div className='w-[100%] items-center'>
                   <p className='w-[200px] m-auto text-center uppercase text-xs font-bold my-5'>
                     Chào mừng quý khách đến với tokyolife
                   </p>
                   <div className='w-[130px] m-auto '>
                     <button className=' w-[100%] rounded-md py-3 px-5 bg-[#c92127] capitalize'>
                       <Link to='/login'>đăng nhập</Link>
                     </button>
                   </div>
                   <div className='my-5 w-[130px] m-auto hover:transition-all '>
                     <button className='hover:bg-[#c92127] w-[100%] py-3 px-5 rounded-md capitalize'>
                       <Link to='/register'>đăng ký</Link>{' '}
                     </button>
                   </div>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
      <div className='w-[650px] h-11   mx-auto mt-5'>
        <ul className='flex space-x-10 capitalize text-lg font-medium '>
          <li>
            <Link to='/'>trang chủ</Link>
          </li>
          <li>
            <Link>giới thiệu</Link>
          </li>
          <li>
            <Link to='/product' search={{status: false}} onClick={() => queryClient.invalidateQueries({queryKey:['products']})}>sản phẩm</Link>
          </li>
          <li>
            <Link to=''>cửa hàng</Link>
          </li>
          <li>
            <Link>liên hệ</Link>
          </li>
          <li>
            <Link>tin tức</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
