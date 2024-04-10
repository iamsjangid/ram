import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoImage from '@/logo-image.png'
const LogoComponent = () => {
  return (
    <>
          <Link href={'/'} className="logo flex     items-center justify-center  lg:justify-start  w-[100%] gap-x-3">
              <Image src={LogoImage} alt="logo"
                  width={500} height={500}
          className='w-[8%]  ' />
              <div>
                  <span className="text-2xl logo-font text-[--text-color1] font-bold"  >MynStars</span>
                  <div className="punch-line text-zinc-500 text-sm">Keep it simple</div>
              </div>
          </Link>

    </>
  )
}

export default LogoComponent