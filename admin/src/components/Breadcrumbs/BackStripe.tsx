"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
const BackStripe = () => {

    const router = useRouter()
  return (
    <>
            <div className="w-full pb-6 px-4  flex items-start justify-start">
        <button onClick={() => router.back()} className="p-3 rounded-full border text-xl md:text-2xl hover:bg-black hover:text-white  text-black hover:border transition-all duration-300">
                  <MdOutlineKeyboardArrowLeft className=' ' />
                        </button>
            </div>
    </>
  )
}

export default BackStripe