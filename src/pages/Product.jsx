import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";

import { data2 } from '../data/generalData'
import { TfiAngleRight } from "react-icons/tfi";
import SocialMediaIcons from '../components/SocialMediaIcons';
import { IoMdStar } from "react-icons/io";
import { useCart } from '../contexts/CartContext';
import { FaCircle } from "react-icons/fa";
import AddToCartBtn from '../components/AddToCartBtn';
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { useAppContext } from '../contexts/AppContext';
import { addReview } from '../services/api';
import { ToastContainer, toast } from "react-toastify";

import ReviewForm from '../components/ReviewForm';
import DisplayReviews from '../components/DisplayReviews';




const Product = () => {
    const { id } = useParams();
    const { products, setProducts } = useAppContext()
    const productToView = products?.find((item) => item._id === id)
    const [selectedPic, setSelectedPic] = useState(productToView?.pictures[0])
    const [refundDivOpen, setRefundDivOpen] = useState(false)
    const [starHovered, setStarHovered] = useState(undefined)
     const [cartUpdateMsg, setCartUpdateMsg] = useState("")
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [reviewDetails, setReviewDetails] = useState({
        rating: 0,
        title: "",
        description: "",
        name: "",
        email: ""
    })
   
    const { cart, dispatch } = useCart();
    const refundDivRef = useRef(null);

    let itemInCart = cart.find((item) => item._id === productToView?._id) || 0 // get item from cart in reducer
    const isButtonDisabled = itemInCart?.quantity === 0 // checks to know if quantity is zero to disable minus button
      

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(itemInCart?.added){
            setCartUpdateMsg("Product Already Added")
            setTimeout(()=>{
              setCartUpdateMsg("")
            },3000)
          
        }
        dispatch({ type: "ADD_TO_CART", payload: { ...productToView, quantity:1} });
      };
    //   function to handle increase of quantity
    const handleQuantityIncrease = () => {
        if (!itemInCart) {
            dispatch({ type: "ADD_TO_CART", payload: { ...productToView, quantity: 0 } });

        }

        dispatch({ type: "INCREASE_CART_QUANTITY", payload: { ...productToView } })
    }

     //   function to handle deccrease of quantity
    const handleQuantityDecrease = () => {

        dispatch({ type: "REDUCE_CART_QUANTITY", payload: { ...productToView } })
    }

     //   function to handle increase of height of refund policy div
    const increaseHeight = () => {
        if (refundDivRef.current) {
            setRefundDivOpen(true)
        }
    };
     //   function to handle decrease of height of refund policy div
    const decreaseHeight = () => {
        if (refundDivRef.current) {
            setRefundDivOpen(false)
        }
    };
    
    const handleReviewStar = (number) => {
        setReviewDetails(prev => ({ ...prev, rating: number }))

    }
    
    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
           
            setIsSubmitLoading(true)
            const response = await addReview(productToView?._id, reviewDetails).then(() => {
                toast.success(`Review Submitted Successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false, 
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsSubmitLoading(false)
            })
           
        } catch (error) {
            setIsSubmitLoading(false)
            console.log(error)
        }

    }

    return (
        <div className='text-black w-full   mt-22  '>
            <div className='text-black w-full  lg:mx-auto lg:w-[90%]'>
            <ToastContainer />
            <nav className='pl-4 lg:pl-0'>
                <ul className='flex items-center gap-2'>
                    <NavLink to={"/home"}>
                        <li className='cursor-pointer'>
                            Home
                        </li>
                    </NavLink>
                    <li><TfiAngleRight className='w-3 h-3' />
                    </li>
                    <li className='cursor-default'>{productToView?.name}</li>
                </ul>
            </nav>
            <main className='flex   gap-5 mt-5 flex-col lg:flex-row px-4 lg:px-0'>


                {/* left main */}
                <div className='   flex justify-center flex-col w-full items-center relative  flex-1/2 h-full'>
                    <div className='border w-full border-gray-300 rounded-sm p-4 md:flex-row flex-col-reverse  flex justify-center items-center relative   h-[600px]  '>
                        <div className='md:absolute  top-4 left-4 flex md:block md:pt-0 pt-8 justify-between w-full flex-wrap'>
                            {productToView && productToView?.pictures.map((pic, index) => (
                                <div onClick={() => setSelectedPic(pic)} key={index} className={`${pic.length === 0 && "hidden"}`}>
                                    {pic && <img className={`${selectedPic === pic && "border-3 rounded-lg border-black"} md:w-10 md:h-10 w-13 h-13 mb-4  cursor-pointer hover:scale-125 `} src={pic} alt="preview-pic" />}
                                </div>

                            ))}


                        </div>
                        <div className=' '>

                            {selectedPic ? <img className='w-[350px] h-[350px]  object-cover' src={selectedPic} alt="" /> : productToView && <img className='w-[350px] h-[350px] object-cover' src={productToView?.pictures[0]} alt="" />}

                        </div>
                    </div>
                    <div className='border border-gray-300 rounded-sm p-4 pt-8 mt-8  relative w-full  h-full'>
                        <h2 className='text-xl mb-8'>Description</h2>
                        <p className='text-md text-gray-500'>{productToView?.description}</p>
                    </div>
                    <div ref={refundDivRef} className={` ${refundDivOpen ? "h-max" : "h-18"} border border-gray-300 rounded-sm p-4 pt-8 mt-8  relative w-full   overflow-hidden transition-all duration-900 ease-in-out`}>
                        <div className={`flex w-full justify-between items-center `}>
                            <h2 className='text-xl mb-8'>Refund Policy</h2>
                            {refundDivOpen ? <FaAngleDown onClick={decreaseHeight} className='w-4 h-4 self-start cursor-pointer' /> :

                                <FaAngleRight onClick={increaseHeight} className='w-4 h-4 self-start cursor-pointer' />
                            }
                        </div>


                        <p className='text-md text-gray-500'>{productToView?.description}</p>
                    </div>
                         
                </div>


                {/* right main */}
                <div className='   
                flex-1/2 h-full sticky top-[100px]'>

                    {/* top right main */}
                    <div className='border border-gray-300 rounded-sm p-4 pl-8  '>
                        <h2 className='font-medium text-4xl dosis'>{productToView?.name}</h2>
                        <SocialMediaIcons />

                        <div className='flex gap-1 mt-8'>
                            {Array(5).fill(0).map((item,index) =>

                                <IoMdStar
                                   key={index}
                                    className={`  w-6 h-6  cursor-pointer 
                                    ${productToView?.averageRating-1 >= index ? "text-red-900 stroke-0" : "text-white stroke-gray-400 stroke-8"} 
                                    `} />


                            )}
                            <h3 className='text-gray-500 font-light'>{`(${productToView?.reviews.length} ${productToView?.reviews.length <= 1 ? "Review" : "Reviews"})`} </h3>
                        </div>
                        <h2 className='font-normal roboto mt-5'>Price:
                            <span className='font-bold ml-8 text-2xl roboto '>{`₦${(productToView && (productToView?.price * itemInCart?.quantity || productToView?.price).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }))}`}
                            </span>
                        </h2>
                        <div>
                            <h3 className='font-normal roboto mt-5 flex items-center'>Stock:

                                {
                                    productToView?.inStock ?
                                        <span className='font-bold text-green-600 ml-8 text-md roboto flex items-center gap-3 '>{``}
                                            <FaCircle className='w-2 h-2' />
                                            In stock
                                        </span> :
                                        <span className='font-bold text-red-600 ml-8 text-md roboto flex items-center gap-3 '>{``}
                                            <FaCircle className='w-2 h-2' />
                                            Out of stock
                                        </span>
                                }


                            </h3>

                        </div>
                        <div className='flex items-center gap-3 mt-4'>
                            <h3>Quantity:</h3>
                            <div className='flex'>
                                <button disabled={isButtonDisabled} onClick={handleQuantityDecrease} className='py-2 text-gray-500 hover:text-gray-700 cursor-pointer rounded-tl-sm rounded-bl-sm px-4 border border-gray-200'>-</button>
                                <h3 className='py-2 px-6 border border-gray-200'>{itemInCart && itemInCart?.quantity}</h3>
                                <button onClick={() => handleQuantityIncrease()} className='py-2 px-4 text-gray-500 hover:text-gray-700 cursor-pointer  rounded-tr-sm rounded-br-sm border border-gray-200'>+</button>

                            </div>

                        </div>
                        <h3 className='text-gray-500 font-light mt-12'>Usually ready in 2-4 days</h3>
                        <div className=' w-full flex items-center justify-between  mt-6 flex-wrap'>

                            <div className='w-[48%]' onClick={handleAddToCart}>
                            <AddToCartBtn extraStyles={"bg-black rounded-sm w-full"} text={"Add to cart"} />
                            </div>
                          
                            <AddToCartBtn extraStyles={"bg-red-800 rounded-sm w-[48%] hover:bg-red-800/70"} text={"Buy now"} />
                        </div>
                        {cartUpdateMsg ? <p className='my-2 text-green-600 text-center text-sm'>{cartUpdateMsg}</p>:""}
                        <div className='flex justify-center items-center'>
                            <h3 className='font-semibold text-lg mt-4'>Checkout Securely With</h3>

                        </div>
                        <div className='flex items-center justify-center gap-8 w-full flex-wrap mt-4'>

                            {data2.checkoutImages.map((pic) => (
                                <img key={pic?.id} src={pic.url} alt="checkout-image" className={`${pic?.id === 1 ? "bg-black px-1 py-3 rounded-md" : "bg-black/5 border border-black/8 px-1 py-3 rounded-md"} w-13 h-13`} />
                            ))}



                        </div>

                    </div>


                    {/* bottom right main */}

                  <ReviewForm handleReviewStar={handleReviewStar} productToView={productToView} setStarHovered={setStarHovered} starHovered={starHovered} reviewDetails={reviewDetails} setReviewDetails={setReviewDetails} isSubmitLoading={isSubmitLoading} handleSubmitReview={handleSubmitReview}/>

                </div>
                   
            </main>
            </div>
            
            <DisplayReviews productToView={productToView}/>
        </div>
    )
}

export default Product
