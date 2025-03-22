import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import AddToCartBtn from '../AddToCartBtn';
import { useCart } from '../../contexts/CartContext';
import SocialMediaIcons from '../SocialMediaIcons';


const QuickViewModal = ({ setSelectedItemId, openViewModalOpen, selectedProduct }) => {
      const { cart,dispatch } = useCart();
    const isModalOpen = openViewModalOpen === selectedProduct?._id
    let itemInCart = cart.find((item)=> item._id === selectedProduct?._id) || 0
    const isButtonDisabled = itemInCart ?.quantity === 0
    const [selectedPic, setSelectedPic] = useState("")
     const [cartUpdateMsg, setCartUpdateMsg] = useState("")


     // function to add to product cart
    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const isItemAdded = itemInCart?.added
        
        if(itemInCart?.added){
            setCartUpdateMsg("Product Already Added")
           
            setTimeout(()=>{
              setCartUpdateMsg("")
             
            },3000)
          
        }else{
            dispatch({ type: "ADD_TO_CART", payload: { ...selectedProduct, quantity:1, added:true} });
        }
       
      };

     
    useEffect(() => {
        selectedProduct && setSelectedPic(selectedProduct?.pictures[0])
    }, [selectedProduct])


    // function to handle increase of a product quantity in cart
    const handleQuantityIncrease =()=>{
 
        if(!itemInCart){
            dispatch({ type: "ADD_TO_CART", payload: { ...selectedProduct, quantity:0} });
        }
       
            dispatch({ type: "INCREASE_CART_QUANTITY", payload: { ...selectedProduct} })
    }
  
     // function to handle decrease of a product quantity in cart
    const handleQuantityDecrease =()=>{
       
        dispatch({ type: "REDUCE_CART_QUANTITY", payload: { ...selectedProduct} })
    }

    return (
        <>
            <div onClick={(e) => { setSelectedItemId("") }} className={` ${isModalOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[200%]"} fixed inset-0 z-68 bg-black/60 w-full h-full overflow-hidden  flex justify-center items-center transition-opacity duration-500 ease-in-out`}></div>

            <div className={`${isModalOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-[200%] opacity-0"} bg-white w-[80%] mx-auto my-auto fixed inset-0 z-80
             text-black transition-all duration-500 ease-in-out  lg:h-[60%] h-max pb-4  lg:pb-0`}>
                <div className='flex items-center justify-center w-full'>
                    <div className='lg:hidden mt-12 flex justify-between gap-4 items-center flex-wrap '>
                        {selectedProduct && selectedProduct?.pictures.map((pic, index) => (
                            <div onClick={() => setSelectedPic(pic)} key={index} className={`${pic.length === 0 ? "hidden":"block"}`}>
                                {pic && <img className={`${selectedPic === pic && "border-3 rounded-lg border-black"} w-10 h-10 mb-4  cursor-pointer hover:scale-125 `} src={pic} alt="preview-pic" />}
                            </div>

                        ))}


                    </div>
                </div>

                <div className='sm:pt-0  h-full w-full flex flex-col  lg:flex-row items-center justify-center overflow-scroll'>
                    <IoCloseOutline onClick={() => setSelectedItemId("")} className='absolute top-1 lg:right-4 right-2 w-8 h-8 lg:w-12 lg:h-12 cursor-pointer' />
                    <div className=' flex justify-center items-center lg:border-r-2 lg:border-gray-200 relative h-max lg:flex-1/2 lg:h-full'>
                        <div className='lg:p-8 px-8'>
                            <div className='sm:absolute top-4 left-4 hidden lg:block '>
                                {selectedProduct && selectedProduct?.pictures.map((pic, index) => (
                                    <div onClick={() => setSelectedPic(pic)} key={index} className={`${pic.length === 0 ? "hidden":"block"}`}>
                                       { pic && <img className={`${selectedPic === pic && "border-3 rounded-lg border-black"} w-10 h-10 mb-4  cursor-pointer hover:scale-125 `} src={pic} alt="preview-pic" />}
                                    </div>

                                ))}


                            </div>
                            <div className=' '>

                                {selectedPic ? <img className='lg:w-[350px] lg:h-[350px] w-[200px] h-[200px] object-cover' src={selectedPic} alt="" /> : selectedProduct && <img className='w-[350px] h-[350px] object-cover' src={selectedProduct?.pictures[0]} alt="" />}

                            </div>
                        </div>


                    </div>
                    <div className='lg:flex-1/2 md:pt-8 pt-3 px-5   h-full '>
                        <h3 className=' font-medium text-2xl dosis'>{selectedProduct?.name}</h3>
                       
                         <SocialMediaIcons extraStyles={"!md:mt-14 !mt-4"} />

                        <h2 className='font-normal roboto mt-5'>Price: <span className='font-bold ml-8 text-2xl roboto '>{`₦${ (selectedProduct && (selectedProduct?.price * itemInCart?.quantity || selectedProduct?.price).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })) }`}</span></h2>
                        <div className='flex items-center gap-3 mt-4'>
                            <h3>Quantity:</h3>
                            <div className='flex'>
                                <button disabled={isButtonDisabled} onClick={handleQuantityDecrease} className='py-2 text-gray-500 hover:text-gray-700 cursor-pointer rounded-tl-sm rounded-bl-sm px-4 border border-gray-200'>-</button>
                                <h3 className='py-2 px-6 border border-gray-200'>{itemInCart && itemInCart?.quantity}</h3>
                                <button onClick={()=>handleQuantityIncrease()} className='py-2 px-4 text-gray-500 hover:text-gray-700 cursor-pointer  rounded-tr-sm rounded-br-sm border border-gray-200'>+</button>

                            </div>

                        </div>
                        <div className='flex items-center gap-1 md:gap-3 mt-6 flex-wrap lg:flex-nowrap'>
                            <div className='w-full' onClick={handleAddToCart}>
                            <AddToCartBtn extraStyles={"bg-black rounded-sm w-[95%]"}  text={"Add to cart"}/>
                            </div>
                           
                           <AddToCartBtn extraStyles={"bg-red-800 w-[95%] rounded-sm hover:bg-red-400"}text={"Buy now"}/>
                        </div>
                        {cartUpdateMsg ? <p className='my-2 text-green-600 text-center text-sm'>{cartUpdateMsg}</p>:""}
                    </div>
                </div>
            </div>

        </>

    )
}

export default QuickViewModal
