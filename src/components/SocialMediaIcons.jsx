import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { RiTelegram2Fill } from "react-icons/ri";
const SocialMediaIcons = ({extraStyles,iconStyles}) => {
  return (
    <div className={`border-b mt-14 h-max border-gray-300 w-full  flex gap-4 items-center justify-center lg:justify-end ${extraStyles} `}>
                            <a href='https://www.facebook.com' className={`mb-5 rounded-full flex justify-center items-center  w-6 h-6 bg-gray-300 hover:bg-blue-500 ${iconStyles}`} >
                                <FaFacebookF className={  `w-4 h-4 text-white cursor-pointer`}  />
                            </a>
                            <a href='https://www.instagram.com' className={`mb-5 rounded-full flex justify-center items-center  w-6 h-6 bg-gray-300 hover:bg-gradient-to-b from-[#0066ff] to-[#ff0066] ${iconStyles}`}>
                                <AiFillInstagram className={  `w-4 h-4 text-white cursor-pointer`} />
                            </a>
                            <a href='https://www.twitter.com' className={`mb-5 rounded-full flex justify-center items-center  w-6 h-6 bg-gray-300 hover:bg-black ${iconStyles}`}>
                                <RiTwitterXFill className={  `w-4 h-4 text-white cursor-pointer`} />
                            </a>
                            <a href='https://www.telegram.com' className={`mb-5 rounded-full flex justify-center items-center  w-6 h-6 bg-gray-300 hover:bg-[#0088cc] ${iconStyles}`}>
                                <RiTelegram2Fill className={  `w-4 h-4 text-white cursor-pointer`} />
                            </a>


                        </div>
  )
}

export default SocialMediaIcons
