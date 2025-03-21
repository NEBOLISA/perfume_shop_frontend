import React from 'react'

const AddToCartBtn = ({text,extraStyles,onclick, }) => {
  return (
    <button  onClick={onclick} className={`p-3 bg-black  transition-all duration-400 ease-in-out
    hover:bg-black/80 cursor-pointer text-white ${extraStyles}`}>{text}</button>
  )
}

export default AddToCartBtn
