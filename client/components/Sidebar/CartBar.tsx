"use client";
import { NotFoundCartImage } from '@/constant';
import { useCheckIntoCartQuery, useCheckoutWithInCartOperationsMutation } from '@/redux/queries/AddToCart';
import Link from 'next/link';
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { HiMiniPlusCircle,HiMiniMinusCircle } from "react-icons/hi2";
import { toast } from 'react-toastify';
//bg-opacity-25 bg-slate-500
export const CartBar = ({setCartbar,Cartbar}:any) => {

      const {data,isLoading}:any = useCheckIntoCartQuery({})
  const [checkoutFn, checkoutFnResponse] = useCheckoutWithInCartOperationsMutation()


  const checkoutFunctionForOperations = async ({ q, item }: { q: string, item: string }) => {
    try {

      const { data, error }: any = await checkoutFn({ q: q, item: item })  
      if (error) {
        toast.error(error?.data?.message)
        return
      }

      toast.success(data.msg)

    } catch (error: any) {
      toast.error(error.message)
    }
  }

      

  const CartCard = ({ image, qty, title, id }: { image: string, qty: string, title: string, id :string})=>{
        return <>
          <div className="w-full border px-3 py-2 flex justify-between items-center min-h-[20vh]">
            <div className="w-1/3 overflow-hidden ">
              <img src={image} alt={title} className="w-full object-contain " />
            </div>
            <div className="w-1/4">
              <h1 className=' text-lg md:text-sm lg:text-lg '>{title.length > 10 ? title.slice(0, 10) + "..." : title}</h1>
              <div className="flex gap-x-2 items-center">
                <HiMiniPlusCircle onClick={() => checkoutFunctionForOperations({ q: 'ADD', item: id })} className="text-2xl rounded-full  text-black border hover:border-none transition-all duration-300 bg-transparent" />
                <h1 className="text-2xl">{qty}</h1>
                <HiMiniMinusCircle onClick={() => checkoutFunctionForOperations({ q: 'MINUS', item: id })} className="text-2xl  rounded-full  text-black border hover:border-none transition-all duration-300 bg-transparent" />
              </div>
            </div>
            <button disabled={checkoutFnResponse.isLoading} onClick={() => checkoutFunctionForOperations({ q: 'DELETE', item: id })}  className="p-3 rounded-full hover:bg-black text-black border hover:border-none transition-all duration-300 hover:text-white">
              <MdDelete  className='text-2xl bg-transparent' />
            </button>

          </div>
        
        </>
      }
 
      

  return (
      <div  className={`w-full z-[10] transition-all duration-500 ${Cartbar ? 'translate-x-0' : 'translate-x-[100%]'} fixed top-0 bg-opacity-25 bg-slate-500 flex  items-end justify-end flex-col `}>
      <div  className="sidebar  min-h-screen  w-full  md:w-[70%] lg:w-[30%] bg-white " >
        <div className="header  border-b-[.6px] py-4 flex items-center justify-between px-4">
                  <span className="text-xl font-light">Cart</span>   

                  <RxCross2 onClick={setCartbar} className="text-3xl font-light" />

                                </div>
        {isLoading ? <>loading...</>
          : <div id="sidebar" className="w-full  h-[70vh] overflow-y-auto px-3">
            
                                        {
              // JSON.stringify(data)  
              data&& data.products && data.products.length>0  &&   data.products.map((cur:any,i:number)=>{
                return <CartCard title={cur.product.title} id={cur._id} image={cur.product.images[0].file} qty={cur.qty} key={i} />
              })
                                            

                                        }
                                      </div>}

                                      {
          data && data.products && data.products.length > 0 && <>
            
                                              <div className="px-4 pb-14 ">
              <h1 className='text-2xl text-center'>total: &#8377; {data.totalPrice}/-</h1>
                                              </div>

          </>
                                      }

                                      <div className="w-full"> 
          <Link onClick={setCartbar} href={'/checkout'} className="px-4 w-full flex text-center py-4 text-white bg-emerald-400    justify-center  rounded items-center ">Checkout</Link>
                                      </div>
                    </div>
      </div>
  )
}


//bg-opacity-25 bg-slate-500
export const DummyCartBar = ({ setCartbar, Cartbar }: any) => {
 





  return (
    <div className={`w-full z-[10] transition-all duration-500 ${Cartbar ? 'translate-x-0' : 'translate-x-[100%]'} fixed top-0 bg-opacity-25 bg-slate-500 flex  items-end justify-end flex-col `}>
      <div className="sidebar  h-screen  w-full  md:w-[70%] lg:w-[30%] bg-white " >
        <div className="header  border-b-[.6px] py-4 flex items-center justify-between px-4">
          <span className="text-xl font-light">Cart</span>

          <RxCross2 onClick={setCartbar} className="text-3xl font-light" />

        </div>
       
          <div id="sidebar" className="w-full  flex justify-center items-center flex-col gap-y-2 h-[80vh] overflow-y-auto px-3">
          <img src={NotFoundCartImage} alt='empty-image' className='w-1/2' />
          <h1 className="text-zinc-300 text-2xl font-bold">Empty</h1>
          </div>

        <div className="w-full">
          <Link onClick={setCartbar} href={'/checkout'} className="px-4 w-full flex text-center py-4 text-white bg-black    justify-center  rounded items-center ">Checkout</Link>
        </div>
      </div>
    </div>
  )
}
