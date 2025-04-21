import { useEffect, useRef } from 'react'
type Props = {
  rating?: boolean
  starNumber?: number
}
const StarRating = (props: Props) => {
  const starRefs = useRef<(HTMLSpanElement | null)[]>([])
  useEffect(() => {
    if (props.starNumber) {
      starRefs.current.slice(0, props.starNumber).forEach((star) => {
        if (star) star.style.color = '#faaf00'
      })
    }
  }, [props.starNumber])

  const HandleClick = (value: number) => {
    console.log(value)
    starRefs.current.forEach((star) => {
      if (star) star.style.color = '#64748b'
    })
    starRefs.current.slice(0, value + 1).forEach((star) => {
      if (star) star.style.color = '#faaf00'
    })
  }
  return (
    <div>
      <span className='space-x-1'>
        {[...Array(5)].map((value, index) => (
          <span
            key={index}
            defaultValue={value}
            className='text-slate-500'
            onClick={props.rating ? () => HandleClick(index) : undefined}
            ref={(ref) => (starRefs.current[index] = ref)}
          >
            <i className='fa-solid fa-star'></i>
          </span>
        ))}
      </span>
    </div>
  )
}

export default StarRating
