import Link from 'next/link';
import React from 'react'
import { RiUser3Line } from "react-icons/ri";
const UserIcon = () => {
  return (
    <>
      <Link href={"/profile"}   className='inline-flex justify-center items-center p-3 rounded-full  hover:bg-black hover:text-white transition-all duration-300 text-black bg-transparent border-[.9px]'>
              <RiUser3Line className='text-2xl bg-transparent' />
         </Link>
        </>
  )
}

export default UserIcon