import React, { useState } from 'react'
import AddToCartBtn from './AddToCartBtn'
import SocialMediaIcons from './SocialMediaIcons'

const Footer = () => {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <div className='w-full mt-3 bg-black '>
            <div className=' lg:mx-auto lg:w-[90%] p-4 py-3 pt-12'>
                <div className='flex  justify-between flex-wrap lg:flex-nowrap gap-12 lg:gap-0'>
                    <div className='text-white text-md font-light flex-[80%] '>
                        <p className='  font-light uppercase'>Contact Us </p>
                        <div className='font-normal mt-3 space-y-2'>
                            <p>Metro Homes. Ajah Lekki,<br /> Lekki Phase 1, Lagos.</p>
                            <p>Call Us: 09055507109</p>
                            <p>Email: <span className='text-[#949494]'>kennethnebolisa@gmail.com</span></p>
                        </div>

                    </div>
                    <div className='flex  h-full  text-white font-normal gap-14 flex-[55%] flex-wrap md:flex-nowrap'> 
                        <div className='flex-1/2'>
                           <h2 className='font-light mb-3'>MORE ON REED</h2>
                           <ul className='text-white font-normal text-md space-y-2'>
                                <li className='cursor-pointer hover:text-white/30'> About Reed</li>
                                <li className='cursor-pointer hover:text-white/30'>Reed Cares</li>
                                <li className='cursor-pointer hover:text-white/30'>Shipping and Delivery</li>
                                <li className='cursor-pointer hover:text-white/30'>Our Stores</li>
                                <li className='cursor-pointer hover:text-white/30'>Terms of Service</li>
                                <li className='cursor-pointer hover:text-white/30'>Refund Policy </li>
                                <li className='cursor-pointer hover:text-white/30'>Let Us Know Your Birthday</li>
                                <li className='cursor-pointer hover:text-white/30'>Frequently Asked Questions</li>
                           </ul>
                        </div>
                        <div className='flex-1/2'>
                          <h2 className='font-light mb-3'>REED TIPS & TRENDS</h2>
                          <p>Join our exclusive community to enjoy latest uipdates on niche fragrance, skin care and makeup brands</p>
                          <input type="text" onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} placeholder='Your Email' className={`${isFocused? "placeholder:absolute placeholder:top-0 placeholder:text-[12px] ":""} text-black mt-3 placeholder:text-gray-600 p-3  bg-white w-full outline-0 rounded-md transition-all duration-900 ease-in-out`}/>
                          <div className='w-full flex justify-center md:block'>
                          <AddToCartBtn text={"Subscribe"}extraStyles={"bg-red-600 !w-[60%] lg:w-[50%] hover:bg-red-600/70  rounded-sm mt-3"}/>
                          </div>
                        
                        </div>
                      
                    </div>
                </div>
                <div className='text-white text-sm font-normal mt-6 space-y-2 flex justify-between flex-wrap lg:flex-nowrap'>
                    <div>
                        <p>2025 Reed</p>
                        <p>Powered by Reed</p>
                    </div>
                  <div className=''>
                        <p className='font-light'>Follow Us</p>
                        <SocialMediaIcons extraStyles={`!mt-2 !border-0`} iconStyles={"bg-white/80"}/>
                  </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
