import { createContext, useContext, useReducer, useState } from "react";




// Create the Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
        const existingProduct = state.cart.find((item)=>item._id === action.payload._id)
        if(existingProduct){
            return{
                ...state,
                cart: state.cart.map((item)=>
                    item._id === action.payload._id ?
                {...item, added:action.payload.added,}
                :item
                )
            }
        }else{
            return{
                ...state,
                cart:[...state.cart, {...action.payload}]
            }
        }
        case "REDUCE_CART_QUANTITY":
           

            return {...state, cart:state.cart.map((item)=>
                item?._id === action.payload._id ? {...item,  quantity:item.quantity-1}:item
            )};
            case "INCREASE_CART_QUANTITY":
           // const item = state.cart.find((item)=>item.id === action.payload.id)

            return {...state, cart:state.cart.map((item)=>
             item?._id === action.payload._id ?    {...item,  quantity:item.quantity+1}:item
            )};

    case "REMOVE_FROM_CART":
      return {...state, cart:state.cart.filter((item) => item._id !== action.payload)}; // Remove item

    case "CLEAR_CART":
      return []; // Empty cart

    default:
      return state;
  }
};

//  Create the Context
const CartContext = createContext(undefined);

//  Create the Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {cart:[]});
  const [selectedProduct, setSelectedProduct] = useState()

  return (
    <CartContext.Provider value={{ cart:state.cart, dispatch,selectedProduct,setSelectedProduct }}>
      {children}
    </CartContext.Provider>
  );
};

//  Custom Hook to Use Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
