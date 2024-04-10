import Link from 'next/link'
import React from 'react'

const Striped = () => {
  return (
    <>
      <section className=" bg-[#FFCE00] body-font py-24 my-10">
  <div className="container mx-auto flex md:h-[70vh]  gap-y-5 items-center justify-center flex-col">

                      <h1 className=" text-5xl md:text-7xl  w-[90%] lg:w-[40%] text-center mx-auto">Find your next designer today</h1>
                  <div className="text-center  w-[90%]  lg:w-[40%]  mx-auto">


                          <p className="mb-8 leading-relaxed">
                              The world’s leading brands use Dribbble to hire creative talent. Browse millions of top-rated portfolios to find your perfect creative match.
                          </p>
                          <div className="flex justify-center flex-col md:flex-row my-7 items-center md:items-start gap-x-0 gap-y-3">
              <button className="w-full  text-white bg-black border-0 py-4  px-8 focus:outline-none hover:bg-black rounded-full text-sm text-nowrap flex justify-center items-center">Get started now</button>
                              <button className="w-full ml-4  text-gray-700 bg-gray-100 border-0 py-4  px-8 focus:outline-none hover:bg-gray-200 rounded-full text-sm text-nowrap flex justify-center items-center">Learn about hiring</button>
                          </div>
                          <div className="py-4">
                            <p className="text center  text-sm md:text-xl">
                           Are You Designer? <Link href="/join-us" className="underline">Join Mynstars</Link>
                            </p>
                          </div>
                      </div>
  </div>
</section>

    </>
  )
}

export default Striped