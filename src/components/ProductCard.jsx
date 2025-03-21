import React, { useState } from 'react'
import CallToActionBtn from './CallToActionBtn'
import { useCart } from '../contexts/CartContext';
import AddToCartBtn from './AddToCartBtn';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../contexts/AppContext';


const ProductCard = ({product,setSelectedItemId,setSelectedProduct}) => {
 
    const [isHovered, setIsHovered] = useState(false);
    const { cart,dispatch } = useCart();
     const {setClickedProduct } = useAppContext();
     const [cartUpdateMsg, setCartUpdateMsg] = useState("")
     let itemInCart = cart.find((item) => item._id === product?._id) || 0
    const navigate = useNavigate();


    // function to handle adding product to cart
    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(itemInCart?.added){
            setCartUpdateMsg("Product Already Added")
            setTimeout(()=>{
              setCartUpdateMsg("")
            },3000)
          
        }
        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity:1} });
      };
    
      //function to open the quick view modal
    const handleQuickView =(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setSelectedItemId(product?._id)
        setSelectedProduct(product)
    }

    // handler function to navigate to the product details page
    const handleNavigate =()=>{
        navigate(`/home/product/${product?._id}/`);
        setClickedProduct(product)
    }


  return (
     <>
   
     <div onClick={handleNavigate} className='cursor-pointer relative bg-white p-4 rounded-xl w-full  lg:w-max h-max'>
       
        <div className='flex  items-center justify-between lg:justify-center gap-4  '>
            <div>
                <div 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-26 h-26 sm:w-40 sm:h-45 rounded-sm overflow-hidden transition-all relative duration-500 ease-in-out">
                    <img src={product?.pictures[0]}  
                    alt="Product Default" 
                    className={`absolute inset-0 object-cover transition-opacity duration-500 ${
                    isHovered ? "opacity-0" : "opacity-100"
                    } w-26 h-26 sm:w-40 sm:h-45 rounded-sm`} />
                    <img src={product?.pictures[1]}  
                    alt="Product Hover" 
                    className={`absolute inset-0 object-cover transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                    }  w-26 h-26 sm:w-40 sm:h-45 rounded-sm`} />
            
                </div>
       
                <h2 className='text-2xl font-medium ml-2 mt-4'>{`₦${product?.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}`}</h2>
      
            </div>
   
            <div>
                <h1 className='text-2xl font-semibold mb-1 w-[90%] leading-6'>{product?.name}</h1>
                <h3 className='text-sm font-light mb-3'>{`(${product?.quantity})`}</h3>
                <CallToActionBtn card/>
            </div>
        </div>
        {cartUpdateMsg ? <p className='my-2 text-green-600 text-center text-sm'>{cartUpdateMsg}</p>:""}
        <div onClick={handleAddToCart}  className='w-full mt-4 flex justify-center items-center cursor-pointer'>
           <AddToCartBtn extraStyles={"bg-black w-[95%]"} text={"Add to cart"}/>
        </div>
        <div onClick={handleQuickView} className='w-full mt-4 flex justify-center  items-center cursor-pointer'>
            <button className='p-3 border border-gray-300 bg-white w-[95%] hover:text-black/50
            hover:bg-black/5 cursor-pointer text-black transition-all duration-400 ease-in-out '>Quick View</button>
        </div>
  
    </div>
     </>
    
   
  )
}

export default ProductCard
