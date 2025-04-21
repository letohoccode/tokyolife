import { useEffect, useState } from "react"

type FormCheck = {
  check: boolean
  valueCheck : string
  HandleClickCheck : (body : string) => void
}
const CheckedInput = (props: FormCheck) => {
    const [checkFlash ,setFlash] = useState<boolean>(props.check)
    useEffect( () => {
        setFlash(props.check)
    },[props.check])

  return (
    <div>
      <label className='inline-flex items-center cursor-pointer peer'>
        <input
          type='checkbox'
          className='sr-only peer'
          checked={checkFlash}
          onClick={() =>{
            setFlash(!checkFlash),
            props.HandleClickCheck(props.valueCheck)
          }}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
      </label>
    </div>
  )
}

export default CheckedInput
