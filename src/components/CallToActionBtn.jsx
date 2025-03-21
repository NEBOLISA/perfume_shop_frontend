import React from 'react'
import { IoIosArrowRoundUp } from "react-icons/io";
const CallToActionBtn = ({card}) => {
    return (
        <div className={`mt-3 flex w-max  ${card ? "gap-0":"gap-1"}`}>
            <button className={`${card ? "bg-transparent text-[10px] border px-2 py-1 border-black text-black": "text-white bg-black px-3 py-2"} cursor-pointer  sm:text-sm  rounded-3xl`}>Explore Shop</button>
           {card ?
              (<button className='relative  w-6 h-6 rounded-full bg-black text-white  flex items-center cursor-pointer justify-center '><IoIosArrowRoundUp className='rotate-45' />
            </button>): 
             <button className='relative before:content-[""]
                    before:left-0 before:-translate-x-full before:w-4 before:h-1 before:bg-black
                     before:absolute w-8 h-8 rounded-full bg-black text-white  flex items-center cursor-pointer justify-center '><IoIosArrowRoundUp className='rotate-45' />
            </button>}
        </div>
    )
}

export default CallToActionBtn
