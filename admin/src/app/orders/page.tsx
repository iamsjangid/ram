"use client";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import { useGetAllOrdersQuery } from '@/provider/redux/query/AdminOrder.query';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react'
import * as yup from 'yup'
const OrdersPage = ( ) => {

    const { data, error, isLoading, isError }:any = useGetAllOrdersQuery({});

    if (isError) { 
        return  <>
                something weong wrong
        </>
    }

    if (isLoading){
        return <Loader/>
    }

  return (
    <>

                        <Breadcrumb pageName='Orders'  />

          <div className=" w-[96%] mx-auto p-10 rounded-xl bg-white overscroll-auto transition-all duration-300 shadow-md lg:w-[90%]">
              <table className='w-full  '>
                <tr className='border-b border-black py-2'> 
                      <th className='text-center'>ID</th>
                      <th className='text-center'>Products</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Actions</th>
                </tr>
                  {/* {JSON.stringify(data)} */}
                        {
                      data && data.length > 0 && data.map((c:any, i:number)=>{
                                return  <Card  data={c} key={i} />
                            })
                        }
                
              </table>
            </div>


    </>
  )
}

export default OrdersPage


const Card = ({ data }: { data :any} )=>{
    


    
    const colors= {
        'PENDING':'bg-yellow-500',
        'DISPATCH':'bg-orange-500',
        'DELIVERED':'bg-green-500'
    }
    const validationData= yup.object({
        status:yup.string().required("")
    })


            const initalvalues = {
                status: data?.status || 'bg-yellow-500'
            }

    return <>

    
        <tr className='py-3'>
            <td className='text-center py-3'>{data?._id}</td>
            <td className='text-center py-3'>
                        <div className="w-full shadow-md py-4 px-2 rounded-md  flex justify-center items-center">
                                    <ul className='w-full  select-none'>
                                       

                                            {
                            data.products.map((cur: { title :string,qty:number },i:number)=>{
                                return <li key={i} className=' p-3 my-2 w-full flex flex-col gap-y-3'>
                                        <div className="">
                                        <h1>product: {cur.title.slice(0,10)}</h1>
                                            <h1>quantity: {cur.qty}</h1>
                                        </div>
                                        <hr className="w-1/2 mx-auto" />
                                    </li>
                            })
                                            }
                       
                                    </ul>
                        </div>

            </td>
            <td className='text-center py-3 select-none'>
                {/* <Formik initialValues={{status:''}} onSubmit={()=>{}}>
                                <Form>
                                  <select name="status" id="" className='outline-none border-none'>
                                      <option value="Pending">Pending</option>
                                      <option value="Dispatch">Dispatch</option>
                                      <option value="Cancel">Cancel</option>
                                  </select>
                                </Form>
                            </Formik> */}

                <div className="flex justify-center items-center">
                    <span className="relative flex h-3 w-3">

                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                            
                                    // @ts-ignore
                            colors[initalvalues.status]
                            } opacity-75`} />
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${
                        // @ts-ignore
                            colors[initalvalues.status]
                            }`} />
                    </span>
                </div>

            </td>
            <td className='text-center py-3' >
                <Link href={`/orders/details/${data._id}`} className="px-4  py-2 rounded-xl inline-flex items-center gap-x-2 bg-red text-white">
                    View
                </Link>
            </td>
        </tr>
    </>
}