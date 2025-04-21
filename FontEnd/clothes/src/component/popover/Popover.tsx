import { useClick, useFloating, useInteractions } from "@floating-ui/react";
import { useState } from "react";

export const Popover = () => {
    const [isOppen,setIsOpen] = useState(false);
    const {refs ,context} = useFloating({
        open: isOppen,
    });

    const click = useClick(context,{
        enabled: true,
    });
    const {getReferenceProps, getFloatingProps} = useInteractions([
        click
    ]);

    const HandleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
    }
  return (
    <div className="flex w-[500px] ">
        <div className=" flex-1">
            <input ref={refs.setReference} {...getReferenceProps()} className="  w-[100%] h-[100%] rounded-s-md px-3 border-none outline-none" type="text"  placeholder="Search..." onChange={HandleChange}/>
        </div>
        <div className="p-2 bg-[#c92127] items-center rounded-e-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
         </div>
            {isOppen && (
                <div className="" ref={refs.setFloating} {...getFloatingProps()} style={{
                    position: "absolute",
                    top: 50,
                    
                }} >
                    <div className="bg-black">dsdds</div>

                </div>
            )}
    </div>
  )
}
