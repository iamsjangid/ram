"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
const BackButton = () => {

  const router = useRouter()

  return (
    <>
      <div className=" lg:hidden w-full py-4 px-10">
        <button onClick={() => router.push("/")} className='text-2xl bg-black text-white  p-2 rounded-full'><IoIosArrowBack/></button>
                    </div>
    </>
  )
}

export default BackButton