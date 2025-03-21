import { createContext, useContext,useState } from "react";







//  Create the Context
const AppContext = createContext({});

//  Create the Provider Component
export const AppProvider = ({ children }) => {
 
  const [clickedProduct, setClickedProduct] = useState(null)
  const [products, setProducts] = useState(null)

  return (
    <AppContext.Provider value={{clickedProduct, setClickedProduct,products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
