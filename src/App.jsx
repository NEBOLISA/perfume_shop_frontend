import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import './App.css'
import { CartProvider } from './contexts/CartContext';
import { AppProvider } from './contexts/AppContext';
import CreateProduct from './pages/CreateProduct';
import Footer from './components/Footer';

function App() {
  

  return (
    <div className=' relative'>
      
      <CartProvider>
       
      <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Create-Product" element={<CreateProduct/>} />
          <Route path="/home/product/:id/" element={<Product />} />
        </Routes>
        <Footer/>
      </Router>
      </AppProvider>
      </CartProvider>
     
    </div>
  )
}

export default App
