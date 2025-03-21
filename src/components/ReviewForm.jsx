import React, { useState } from 'react'
import AddToCartBtn from './AddToCartBtn';
import BeatLoader from 'react-spinners/BeatLoader';
import { IoMdStar } from 'react-icons/io';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const ReviewForm = ({ handleReviewStar, productToView, setStarHovered, starHovered, reviewDetails, setReviewDetails, isSubmitLoading, handleSubmitReview }) => {

    const [emailValidMsg, setEmailValidMsg] = useState("")
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

    //function ti check if email entered by the reviewer is valid
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    return (
        <div className='border border-gray-300 rounded-sm p-4  mt-8'>
            <h2 className='font-normal text-black text-xl '>Write your Review</h2>
            <h2 className='font-medium text-lg dosis mt-4'>{productToView?.name}</h2>
            <div className='flex gap-1 mt-2'>
                {Array(5).fill(0).map((item, index) =>

                    <IoMdStar
                        key={index}
                        onClick={() => handleReviewStar(index + 1)}
                        onMouseOver={() => setStarHovered(index)}
                        onMouseOut={() => setStarHovered(undefined)}
                        className={`  w-10 h-10  cursor-pointer 
                    ${index <= starHovered || reviewDetails.rating - 1 >= index ? "text-red-900 stroke-0" : "text-white stroke-gray-400 stroke-8"} `} />
                )}

            </div>
            <div className='border border-gray-300 rounded-sm p-4 pt-2  mt-3'>
                <h3 className='text-gray-500'>Review Title</h3>
                <input onChange={(e) => setReviewDetails(prev => ({ ...prev, title: e.target.value }))}
                    value={reviewDetails.title}
                    type="text" name="" id="" className='w-full outline-0 py-1' />
            </div>
            <div className='border border-gray-300 rounded-sm p-4 pt-2  mt-3'>
                <h3 className='text-gray-500'>Review Description</h3>
                <textarea onChange={(e) => setReviewDetails(prev => ({ ...prev, description: e.target.value }))}
                    value={reviewDetails.description} name="" id="" cols="30" className='w-full outline-0 py-1' />

            </div>
            <div className='border border-gray-300 rounded-sm p-4 pt-2  mt-3'>
                <h3 className='text-gray-500'>Name</h3>
                <input onChange={(e) => setReviewDetails(prev => ({ ...prev, name: e.target.value }))}
                    value={reviewDetails.name} type="text" name="" id="" className='w-full outline-0 py-1' />
            </div>
            <div className='border border-gray-300 rounded-sm p-4 pt-2  mt-3'>
                <h3 className='text-gray-500'>Email Address</h3>
                <input onChange={(e) => {
                    setReviewDetails(prev => ({ ...prev, email: e.target.value }))
                    !isValidEmail(e.target.value) ?
                        setEmailValidMsg("Email not valid") :
                        setEmailValidMsg("")

                }}
                    value={reviewDetails.email} type="text" name="" id="" className='w-full outline-0 py-1' />
            </div>
            {emailValidMsg.length !== 0 && <h2 className='text-red-700 py-3 '>{emailValidMsg}</h2>}
            <AddToCartBtn onclick={handleSubmitReview} disabled={isSubmitDisabled} text={
                isSubmitLoading ? (<div className='flex w-full h-full items-center justify-center '>
                    <BeatLoader
                        size={10}
                        cssOverride={override}
                        color="white"
                        style={{ color: "white", display: "block" }}
                        aria-label="Loading Spinner"
                        data-testid="loader" />
                </div>) :
                    "Submit Review"} extraStyles={"w-full rounded-sm bg-red-800 hover:bg-red-800/80 mt-3"} />
        </div>
    )
}

export default ReviewForm
