"use client";
import BackButton from '@/components/BackButton';
import LogoComponent from '@/components/Logo';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
const SignUpPage = () => {

 

  return (
    <>
    
          <div className='w-full h-full lg:flex lg:justify-between '>
              <div className=" hidden lg:flex w-1/4 h-screen bg-yellow-500" id='sidepannel'>
                  <video src='https://cdn.dribbble.com/uploads/48292/original/30fd1f7b63806eff4db0d4276eb1ac45.mp4?1689187515' muted loop autoPlay className='h-full w-w-full block object-cover'>
                  </video>
              </div>
              <BackButton/>
              <div className="min-h-screen w-full  px-5 md:px-24 py-14 ">
                  {/* <h1 className=' text-2xl'>Sign up to Mynstar</h1> */}
                  <LogoComponent />
                  <div className="my-3  w-full lg:w-[40%] ">
                      <button type='button' className='w-full flex justify-center items-center gap-x-2 text-white py-3 rounded-full px-4 bg-black'>
                          <FcGoogle />
                          <span className='text-xs'>Sign up with Google</span>
                      </button>
                  </div>

                  <div className="my-3  w-full lg:w-[40%] gap-x-2 flex items-center justify-center text-zinc-500">
                      <div className="w-1/2 border-b  border-zinc-200" />
                      <span className='inline-flex'> {"  "}  or  {"  "}</span>
                      <div className="w-1/2 border-b border-zinc-200" />
                  </div>
                  <div className="my-3  w-full lg:w-[40%] ">
                      <Link href={"/register_email"} className='w-full flex justify-center items-center text-sm gap-x-2 text-black py-3 rounded-full px-4 bg-white border'>
                          <span>Continue with email</span>
                      </Link>
                  </div>
                  <div className="my-3  w-full lg:w-[40%]  gap-x-2 flex items-center justify-center text-zinc-500">
                      <div className="w-1/2 border-b  border-zinc-200" />
                      <span className='inline-flex'> {"  "}  or  {"  "}</span>
                      <div className="w-1/2 border-b border-zinc-200" />
                  </div>
                  <div className="my-3  w-full lg:w-[40%] ">
                      <button className='w-full flex justify-center items-center text-sm gap-x-2 text-black py-3 rounded-full px-4 bg-white border'>
                          <span>Continue with Mobile</span>
                      </button>
                  </div>

                  <div className="py-10  w-full lg:w-[40%] ">
                      <p className="text-center text-xs w-full">
                          By creating an account you agree with our <span className="underline">Terms of Service, Privacy Policy</span>, and our default <span className="underline">Notification Settings</span>.
                      </p>

                  </div>

                  <div className="py-10  w-full lg:w-[40%] ">
                      <p className='w-full text-center text-sm '>Already have an account? <Link className='underline' href={"/signin"}>Sign In</Link></p>
                  </div>
              </div>





          </div>
    </>
  )
}

export default SignUpPage