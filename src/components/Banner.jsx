import React from 'react'
import bannerPic from "../assets/bannerPic.png"

import CallToActionBtn from './CallToActionBtn';

const Banner = () => {
  return (
    <div className='relative flex flex-col mt-18 '>
        <div className='lg:w-[45%] lg:mt-5 mt-9  lg:px-0'>
            <h1 className='md:text-6xl  text-3xl font-bold font-sans'>Discover the perfect <span className='italic font-medium'>Perfume</span> that defines You</h1>
            <h3 className='mt-5 '>Choosing the perfect perfume is a personal journey—one that reflects your lifestyle, evokes your favorite scents, and leaves a lasting impression. Let your fragrance tell your story</h3>
           <CallToActionBtn/>
        </div>
      <div className='lg:absolute flex items-center justify-center  right-2 top-0'> 
       <img src={bannerPic} alt="banner-pic" className='lg:w-full lg:h-full' />
      </div>
    </div>
  )
}

export default Banner
