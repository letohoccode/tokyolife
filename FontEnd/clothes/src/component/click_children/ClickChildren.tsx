import { useState } from 'react'

type Props = {
  content: string
  children?: React.ReactNode
  className?: string
}
const ClickChildren = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const HandleClick = () => {
    setOpen(!open)
  }
  return (
    <div className={props.className}>
      <button onClick={HandleClick} className='flex justify-between w-[100%] p-2 text-[#c92027] border-[2px] border-[#c92027] rounded-sm'>
        <span>{props.content}</span>
        {open ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        )}
      </button>
      {open && props.children}
    </div>
  )
}

export default ClickChildren
