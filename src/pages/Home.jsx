import React, {  useEffect, useState } from 'react'

import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { ToastContainer, toast } from "react-toastify";
import { useCart } from '../contexts/CartContext'
import QuickViewModal from '../components/modals/QuickViewModal'
import { fetchProducts } from '../services/api'
import { useAppContext } from '../contexts/AppContext'
import BeatLoader from 'react-spinners/BeatLoader'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const Home = () => {
  const {products, setProducts} = useAppContext()
  const { cart} = useCart();
  const [openViewModalOpen,setOpenViewModal]= useState("")
  const [selectedProduct, setSelectedProduct]=useState("")
  const [fetchIsLoading, setFetchIsLoading] = useState(false)
  //const [products, setProducts] = useState()
  
  useEffect(()=>{
    getProducts()

 },[])

   const setSelectedItemId = (id)=>{
     setOpenViewModal(id)
   }


   //fetch products from the database
   const getProducts = async()=>{
    setFetchIsLoading(true)
    try {
     
      const response = await fetchProducts()
        setFetchIsLoading(false)
    
       setProducts(response?.products)
    } catch (error) {
      //
     if(error.code === "ERR_NETWORK"){
        toast.error(`Check Connection!`, {
                           position: "top-right",
                           autoClose: 3000,
                           hideProgressBar: false, 
                           closeOnClick: true,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                       });
     }else{
      setFetchIsLoading(false)
     }
    }
    
  
     
   }


   
  return (
    <div className='px-3 lg:mx-auto lg:w-[90%]'>
      <ToastContainer/>
          <QuickViewModal openViewModalOpen={openViewModalOpen} selectedProduct={selectedProduct} setSelectedItemId={setSelectedItemId}/>
        <Banner/>
        <h3 className='font-bold text-3xl mt-9'>Latest Arrivals</h3>
        <div className='mt-4 flex gap-4 flex-wrap justify-center md:justify-between'>
            {
              fetchIsLoading ? <div className='flex w-full h-full items-center justify-center '>
              <BeatLoader
                  size={13}
                  cssOverride={override}
                  color="black"
                  style={{ color: "white", display: "block" }}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
          </div> :
                products?.map((product)=>(
                    <ProductCard  key={product?._id} product={product} setSelectedItemId={setSelectedItemId} openViewModalOpen={openViewModalOpen} setSelectedProduct={setSelectedProduct} />
                    
                ))
            }
      
       

        </div>
        {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 */}
    </div>
  )
}

export default Home
