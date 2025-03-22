import { useState } from "react";
import { Link } from "react-router-dom";

import { IoCloseOutline } from "react-icons/io5";

const Sidebar = ({ isOpen, closeSideBar, setIsOpen }) => {


    return (
        <>

            <div
                className={`fixed inset-0 bg-black/35 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 " : "opacity-0  pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            <div
                className={`fixed top-0 left-0 h-full w-[75%] bg-white
             text-black transform lg:hidden  ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out p-6 z-50`}
            >

                <IoCloseOutline onClick={closeSideBar} className=" absolute top-4 right-2 w-8 h-8" />


                <Link  to="/home"className="text-xl font-semibold my-6 header">Reed</Link>






                <nav className="flex flex-col space-y-4">
                    <Link to="/home" onClick={()=>setIsOpen(false)} className="hover:bg-gray-700 p-2 rounded-md">
                        Home
                    </Link>
                    <Link to="/men" onClick={()=>setIsOpen(false)}  className="hover:bg-gray-700 p-2 rounded-md">
                        Men
                    </Link>
                    <Link to="/women" onClick={()=>setIsOpen(false)}  className="hover:bg-gray-700 p-2 rounded-md">
                        Women
                    </Link>
                    <Link to="/profile"onClick={()=>setIsOpen(false)}  className="hover:bg-gray-700 p-2 rounded-md">
                        Profile
                    </Link>
                    <Link to="/contact"onClick={()=>setIsOpen(false)}  className="hover:bg-gray-700 p-2 rounded-md">
                        Contact Us
                    </Link>
                    <Link
                        to="/Create-Product"
                        onClick={()=>setIsOpen(false)} 
                        className="hover:bg-gray-700 p-2 rounded-md"
                    >
                        Create Product
                    </Link>
                </nav>
            </div>

        </>
    );
};

export default Sidebar;
