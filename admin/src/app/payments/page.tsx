"use client";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import moment from 'moment';
import React, { FormEvent, useState } from 'react'

const PaymentPage = () => {
    const [search,setSearch] = useState('')


    const onSearchHandler = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
                console.log("submit");
                
        } catch (error:any) {
            console.log("Error",error.message);
            
        }
    }
  return (
    <>
                    <Breadcrumb  pageName='Payments'  />

                    <div className="my-4 flex items-center justify-end px-3 w-full ">
              <form onSubmit={onSearchHandler} className="md:w-1/3 w-full bg-red-500">
                  <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" className='w-full py-3 rounded-md px-5  font-[] border-[.2px] outline-none' placeholder='Search By Order Id ' />
              </form>
                    </div>

                    <div className="my-5 w-full bg-white px-5 py-8 rounded-md min-h-[50vh]">
                            <>
        <h1 className="text-2xl text-center"> Order ID {`" ${search} "`} </h1>
          <div className=" w-full transition-all duration-300 md:w-[60%] lg:w-[40%]  mx-auto min-h-[20vh] shadow-lg rounded-md bg-white py-8 text-center">
                  <h1 className="text-lg font-semibold">Payment Date: <span className='uppercase'>789456123</span> </h1>
            <h1 className="text-lg font-semibold">Payment Date: <span className='uppercase'> {moment().format('LL')} </span> </h1>

            <h1 className="text-lg font-semibold">Payment : <span className='uppercase'> &#8377; {555} /- </span> </h1>

            <h1 className="text-lg font-semibold py-2 ">Status : <span className='uppercase text-sm bg-green-500 px-2 py-2 text-white'> Success </span> </h1>

                </div>


                            </>

                    </div>
    
    </>
  )
}

export default PaymentPage