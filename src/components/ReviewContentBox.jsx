import React from 'react'
import { IoMdStar, IoMdThumbsUp } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";

const ReviewContentBox = ({ productToView, review }) => {

    //variables used to generate the reviewer initals
    const nameArray = review?.name.split(" ").filter(Boolean)
    const firstNameInitial = nameArray[0].split("")[0]
    const lastNameInitial = nameArray.length === 2 ? nameArray[1].split("")[0] : ""

    // function to format date from the database
    const formatCreatedAt = (createdAt) => {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    };

    return (
        <div className='w-full flex gap-4 flex-wrap lg:flex-nowrap mb-2 border border-gray-200 mt-3 rounded-md p-4'>
            <div className='lg:flex-[40%] flex-auto bg-gray-200 border border-gray-300 p-3 rounded-md mt-4'>
                <div className='flex flex-col space-y-5 p-2'>
                    <div className='flex gap-3 items-center'>
                        <div className='w-12 h-12 rounded-full bg-[#d3d3d9] flex items-center justify-center'>

                            {firstNameInitial + lastNameInitial}
                        </div>
                        <h3>{review?.name}</h3>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <img className='w-12 h-12' src={productToView?.pictures[0]} alt="" />
                        <div>
                            <h3 className='text-sm font-semibold'>Reviewing</h3>
                            <h3 className='font-normal text-sm mt-1'>{productToView?.name}</h3>
                        </div>

                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='rounded-full bg-red-800 p-[2px] flex items-center justify-center'>
                            <IoMdThumbsUp className='w-3 h-3 text-white' />
                        </div>

                        <h3 className='text-sm font-light'>I recommend this product</h3>
                    </div>
                </div>
            </div>
            <div className='lg:flex-[70%] flex-auto mt-4'>
                <div className='flex gap-1 '>
                    {Array(5).fill(0).map((item, index) =>
                        <IoMdStar
                            key={index}
                            className={`  w-6 h-6  cursor-pointer 
                                ${productToView?.averageRating - 1 >= index ? "text-red-900 stroke-0" : "text-white stroke-gray-400 stroke-8"} 
                                                        `} />
                    )}
                </div>
                <h2 className='mt-3 font-normal'> {review?.title}</h2>
                <h2 className='mt-3 font-light'> {review?.description}</h2>
            </div>
            <div className='lg:flex-[20%] flex-auto mt-4 '>
                <div className='w-full h-[60%] flex flex-col justify-between'>
                    <h3 className='font-light text-gray-600 text-sm text-end'>{formatCreatedAt(review?.createdAt)}</h3>
                    <div className='flex items-center gap-2 justify-end flex-wrap lg:flex-nowrap'>
                        <h3 className='font-light text-gray-600 text-sm'> Was this helpful?</h3>
                        <div className='flex items-center gap-1'>
                            <IoMdThumbsUp className='font-light text-gray-600 text-sm cursor-pointer' />
                            <h3 className='font-light text-gray-600 text-sm'>0</h3>
                        </div>
                        <div className='flex items-center gap-1'>
                            <IoMdThumbsUp className='font-light text-gray-600 text-sm cursor-pointer' />
                            <h3 className='font-light text-gray-600 text-sm'>0</h3>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ReviewContentBox
