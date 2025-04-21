import { useClick, useFloating, useInteractions } from '@floating-ui/react'
import { Link } from '@tanstack/react-router'
import React, { useState } from 'react'
type Props = {
  partenName?: string
  name1?: string
  name2?: string
  name3?: string
  logoutname?: string
  children?: React.ReactNode
  classNameParten ?: string
  clasName?: string
  style?: React.CSSProperties
  to1?: string
  to2?: string
  to3?: string
  classButton?: string
  HandleLogout?: () => void
}
const ClickButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })
  const click = useClick(context)
  const HandleClick = () => setIsOpen(!isOpen)
  const { getReferenceProps, getFloatingProps } = useInteractions([click])
  return (
    <div>
      <div className={props.classNameParten} ref={refs.setReference} {...getReferenceProps()}>
        {props.children}
        <div className={props.clasName}>
          <p>{props.partenName}</p>
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4'
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
              className='size-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          )}
        </div>
      </div>
      {isOpen && (
        <ul
          className='w-[200px] space-y-2 capitalize px-2 my-2'
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={props.style}
        >
          <li onClick={HandleClick}>
            <Link to={props.to1}>{props.name1}</Link>
          </li>
          <li onClick={HandleClick}>
            <Link to={props.to2}>{props.name2}</Link>
          </li>
          <li onClick={HandleClick}>
            <Link to={props.to3}>{props.name3}</Link>
          </li>
          <li>
            <button onClick={props.HandleLogout} className={props.classButton || 'hidden'}>
              {props.logoutname}
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ClickButton
