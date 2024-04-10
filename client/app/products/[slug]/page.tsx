"use client";
import CategoryComponent from '@/components/Home/Category';
import ProductsComponent from '@/components/Home/Products';
import Link from 'next/link';
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
const ProductCategory = ({ params }: { params :{slug:string}}) => {

  const [Filter, setFilter] = useState(false);
  const [feed, setFeed] = useState(false);
  return (


    <>  
      <div className="container">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">

            <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
              <h1 className="title-font  text-4xl  md:text-6xl tracking-normal  mb-4 font-medium text-gray-900 ">Trending typography, lettering, and calligraphy</h1>
              <p className="mb-8 leading-relaxed">Explore the technique of type design, lettering, and calligraphy from popular <br /> design portfolios</p>



              <div className="flex w-full justify-center items-end">



                <div className="relative mr-4 lg:w-full xl:w-[60%] w-2/4 flex md:w-full  text-left border  focus:border-pink-500 focus:ring-2 ring-pink-100 transition-all duration-300  rounded-full overflow-hidden px-4 text-2xl items-center" >
                  <CiSearch />
                  <input type="text" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50  focus:ring-2 focus:ring-[--bg-primary] border-black focus:bg-transparent  text-base  outline-none text-gray-700 py-4 rounded-full px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Search 18 million+ shots...
'  />
                </div>

              </div>


        <div className="flex gap-x-3 mx-auto  py-4 flex-wrap gap-y-3 justify-center items-center ">
                <p>Trending searches</p>
                <Link className='px-3 py-1 border rounded-full transition-all duration-200 hover:border hover:border-black ' href={`/products/${new Date().getTime()}`}>type</Link>
                <Link className='px-3 py-1 border rounded-full transition-all duration-200 hover:border hover:border-black ' href={`/products/${new Date().getTime()}`}>lettering</Link>
                <Link className='px-3 py-1 border rounded-full transition-all duration-200 hover:border hover:border-black ' href={`/products/${new Date().getTime()}`}>branding</Link>
                <Link className='px-3 py-1 border rounded-full transition-all duration-200 hover:border hover:border-black ' href={`/products/${new Date().getTime()}`}>minimal</Link>
        </div>
            </div>



          </div>
        </section>

          <section  className='w-full flex items-center justify-evenly' id="filters">
          <div className="">

            <div  onClick={()=>setFeed(!feed)}  className= " relative px-3 py-2 border rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center gap-x-3">
              Popular
              <LiaAngleDownSolid className={`${feed?'rotate-180':'rotate-0'} transition-all duration-300`} />


              <ul className={`${feed ? 'opacity-100 translate-y-0' :' translate-y-4 hidden'}  transition-transform absolute top-10 right-0 z-10 bg-red-500 px-5 py-2  flex flex-col gap-y-3  duration-500`}>
                <li>fdfa</li>
                <li>fdfasdad</li>
                  </ul>

              </div>


          </div>
          <div className="">
            <ul className="flex gap-x-10 items-center capitalize">
                      {
                        Array(10).fill(null).map((cur,i)=>{
                          return <li key={i}>
                            <Link className='' href={`/products/${new Date().getTime()}`}>minimal</Link>
                          </li>
                        })
                      }
            </ul>
          </div>
          <div className="">
            <div onClick={()=>setFilter(!Filter)} className="px-3 py-2 border rounded-full transition-all duration-200 cursor-pointer inline-flex items-center gap-x-2">
              <IoFilterOutline/>
              filters</div>

          </div>

          </section>


        <section id="search_filter" className={` ${Filter?'min-h-[20vh]':'hidden'} my-3 transition-all duration-300 bg-red-500`}>
  fdsadadsadadasdsada
</section>

      <ProductsComponent isHeadShow={false}/>
      <CategoryComponent/>


      </div>

    </>
  )
}

export default ProductCategory