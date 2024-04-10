import React from 'react'
import { MdLocalShipping } from 'react-icons/md'

const OrderCard = ({id}:{id:number}) => {
    // const percentage = id.split('').reduce((a, c) => a + c)
  return (
    <>
          <div className="w-full border  rounded-md flex items-center justify-between px-10 py-4">
              <div className="image flex justify-center gap-x-6 items-start select-none">
                  <img src="https://res.cloudinary.com/dfyasiqxg/image/upload/v1710682083/products/myrzmnfabxnjeuxycvic.jpg" className='w-[100px] object-cover h-[100px] rounded-full' alt="" /> <div className="text-rt py-4 flex flex-col gap-y-4">
                      <h1 className='text-xl'>Lorem ipsum dolor sit amet.</h1>
                      <h1 className='text-sm flex items-center gap-x-1'>status : <span className='w-[15px] h-[15px]  rounded-full  inline-block'></span> <span className='select-none'>Pending</span></h1>
                      <div className="w-full bg-gray-200 border rounded-full h-2.5">
                          <div className={`${id%2==0 ? 'bg-green-500':`bg-yellow-500`} h-2.5 rounded-full`} style={{ width: `${Math.random()*99}%` }} />
                          <div className="text-xs capitalize">arriving soon</div>
                      </div>

                  </div>

              </div>
              <div className="icon">
                  <button className='inline-flex justify-center items-center p-3 rounded-full  hover:bg-black hover:text-white transition-all duration-300 text-black bg-transparent border-[.9px]'>
                      <MdLocalShipping className='text-3xl bg-transparent' />
                  </button>
              </div>
          </div>

    </>     
  )
}

export default OrderCard