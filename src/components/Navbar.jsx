import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import SearchBar from './SearchBar';
import { SlHandbag } from "react-icons/sl";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import Sidebar from './Sidebar';
import { useCart } from '../contexts/CartContext';


// this is a responsive sidebar for mobile users

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
     const { cart} = useCart();
 
    //  handles opening of mobile sidebar   
    function handleSideBarOpen(){
        setIsOpen(true)
    }
     //  handles closing of mobile sidebar   
    function handleSideBarClose(){
        setIsOpen(false)
    }
  return (
    <div className='fixed top-0 left-0 right-0 bg-white/60 z-60 flex items-center justify-between p-2  md:p-4   '>
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} closeSideBar={handleSideBarClose} />
        <div className='hidden lg:block '>
        <NavLink to="/home" className='text-black header text-3xl '>Reed</NavLink>
        </div>
        
        <RxHamburgerMenu className='lg:hidden w-5 h-5' onClick={handleSideBarOpen}  />


        <nav className=" text-black  hidden lg:block">
            <div className="container  flex justify-between items-center">
                <ul className="flex space-x-6">
                    <li>
                        <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            
                            ` px-0.5 py-2 text-sm ${
                            isActive ? "border-b-2 font-semibold  border-black  " : "hover:opacity-70"
                            }`
                        }
                        >
                        Home
                        
                        </NavLink>
                    
                    </li>
                    <li>
                    <NavLink
                        to="/men"
                        className={({ isActive }) =>
                            ` px-0.5 py-2  text-sm ${
                            isActive ? "border-b-2 font-semibold  border-black  " : "hover:opacity-70"
                            }`
                        }
                        >
                        Men
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                        to="/women"
                        className={({ isActive }) =>
                            ` px-0.5 py-2  text-sm ${
                            isActive ? "border-b-2 font-semibold  border-black  " : "hover:opacity-70"
                            }`
                        }
                        >
                        Women
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            ` px-0.5 py-2  text-sm ${
                            isActive ? "border-b-2 font-semibold  border-black  " : "hover:opacity-70"
                            }`
                        }
                        >
                        Contact Us
                        </NavLink>
                       
                    </li>
                    <li>
                    <NavLink
                        to="/Create-Product"
                        className={({ isActive }) =>
                            ` px-0.5 py-2  text-sm ${
                            isActive ? "border-b-2 font-semibold  border-black  " : "hover:opacity-70"
                            }`
                        }
                        >
                        Create Product
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>

        
    
              
        <div className='lg:hidden'>
            <SearchBar />
        </div>
      
        <div className='flex items-center justify-center gap-4 lg:hidden'>
            <div className='relative'>
                <SlHandbag />

                <div className='rounded-full absolute top-0 left-2 bg-amber-600 text-white w-3 h-3 flex items-center justify-center text-[10px]'>{cart?.length ? cart.length: 0}</div>
            </div>
            <CgProfile className='lg:hidden w-5 h-5' />
        </div>


        <div className='lg:flex hidden  items-center justify-center gap-8'>
            <SearchBar />
            <div className='relative'>
                <SlHandbag />

                <div className='rounded-full absolute -top-2 left-2 bg-amber-600 text-white w-5 h-5 flex items-center justify-center text-[12px]'>{cart?.length ? cart.length: 0}</div>
            </div>
            <button className='px-3 py-1 bg-black text-white text-sm rounded-sm '>
                Sign In</button>
                

        </div>
    </div>
  )
}

export default Navbar
