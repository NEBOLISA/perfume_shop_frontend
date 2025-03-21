import React from 'react'
import ReviewContentBox from './ReviewContentBox'
import { MdOutlineRateReview } from "react-icons/md";

const DisplayReviews = ({productToView}) => {
  return (
    <div className='border-t border-gray-300 rounded-sm p-4  mt-8 w-full ' >

      <div className='mt-14 lg:mx-auto lg:w-[90%]   p-4   w-full'>
        <h2 className='text-sm text-gray-500 mb-2'> {`${productToView?.reviews.length} ${productToView?.reviews.length <= 1 ? "review" : "reviews"}`}</h2>
           <div className='border-t border-gray-300 mt-4'>

           {productToView?.reviews.length === 0 ? <div className='w-full h-full flex items-center justify-center gap-2 my-4'> <p className='text-gray-600'>No Reviews Yet </p><MdOutlineRateReview  className='w-8 h-8 text-gray-600'/>
            </div> :productToView?.reviews.map((review)=>(
            <ReviewContentBox key={review?._id} productToView={productToView} review={review}/>
           )) }
           </div>
      </div>
    </div>
  )
}

export default DisplayReviews
