"use client";
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
const ForgetPage = () => {



    return (
        <div className='w-full h-full flex justify-between '>
            <div className="w-1/4 h-screen bg-yellow-500" id='sidepannel'>
                <video src='https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949' muted loop autoPlay className='h-full w-w-full block object-cover'>
                </video>
            </div>
            <form className="min-h-screen w-full px-24 py-24 ">
                <h1 className=' text-2xl'>Forgot Password?</h1>
                
                        <p className="pt-10 text-sm w-[40%]">
                    Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                        </p>
                <p className="py-5 text-sm w-[40%]">
                    For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
                </p>
                <div className="mb-3 mt-10 w-[40%] ">

                    <label className='font-bold'>Email Address</label>
                    <input type="text" className='w-full flex justify-center items-center gap-x-2 text-black py-3 rounded-2xl px-4 border' />

                </div>
              
              
                <div className="my-3 w-[40%] ">
                    <button className='w-full flex justify-center items-center gap-x-2 text-white py-3 rounded-full px-4 text-sm bg-black'>
                        <span>Send Reset Instructions</span>
                    </button>
                </div>

                <div className="py-10 w-[40%]">
                    <p className='w-full text-center text-sm '>Already Know? <Link className='underline' href={"/signup"}>Sign Up</Link></p>
                </div>
            </form>

        </div>




    )
}

export default ForgetPage