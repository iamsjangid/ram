"use client";
import BackStripe from '@/components/Breadcrumbs/BackStripe'
import SubmitButton from '@/components/reuseable/SubmitButton';
import { useGetAllOrdersByIdQuery, useUpdateOrderStatusByIdMutation } from '@/provider/redux/query/AdminOrder.query';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react'
import { TbGardenCartOff } from "react-icons/tb";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
const OrderDetailsPage = ({params}:{params:{slug:string}}) => {


            const {isLoading,isError,data}:any = useGetAllOrdersByIdQuery(params.slug)
    const [UpdateOrderStatusById, UpdateOrderStatusByIdResponse] = useUpdateOrderStatusByIdMutation()




            


    if (isError){
        return <>
            <BackStripe />
            <h1>Something went wrong</h1>
        </>
    }



    if (isLoading) {
        return <>
            <BackStripe />
            <h1>loading...</h1>
        </>
    }

    const CancelHandler = async()=>{
        try {
                    toast.success("success"+params.slug)
        } catch (error:any) {
            toast.error(error.message)
        }
    }


    const initialValues= {
        status:data?.status || ''
    }

    const onSubmitChangeHandler = async ({ status }: { status: string },{setValues}:any)=>{
                try {
                    // toast.success("status updated   " + status)


                    const { data, error }: any = await UpdateOrderStatusById({id:params.slug,status});

                    if (error) {
                        console.log(error);

                        toast.error(error.data.message);
                        return
                    }
                    toast.success(data.msg);

                    setValues({ status })
                } catch (error:any) {
                    toast.error(error.message)
                }
    }

    return (
      <>
      
                <BackStripe  />



          <div className="w-[90%] mx-auto bg-white min-h-[50vh] py-5 px-4 flex  justify-center items-start flex-col-reverse lg:flex-row gap-y-7">


                <div className=" w-full lg:w-1/2  flex gap-y-5 flex-col"> 
                <div className="w-full flex justify-start items-center"><button className="flex items-center gap-x-2 rounded-md outline-none border-none px-3 py-2 bg-primary text-white"> <LiaFileInvoiceSolid/> Invoice </button></div>
                
                
                <h1 className="text-start underline text-lg lg:text-xl font-bold">OrderId: {data._id}</h1>
                    <h1 className="text-start  text-lg lg:text-xl font-bold">Order Date: <span className="bg-red px-4 text-white">{moment(data.order_date).format('LL')}</span></h1>
                    <h1 className="text-start  text-lg lg:text-xl font-bold">Total Price:  <span className="bg-green-500 px-4 text-white">{data?.total_amount}</span> </h1>
                  <div className="text-start   font-bold">
                      <label className='text-lg lg:text-xl'>User Address:</label> 

                        <p className="text-sm py-3 px-4">Name: {data.shipping_details.name}</p>
                        <p className="text-sm py-3 px-4">email: {data.shipping_details.email}</p>
                        <p className="text-sm py-3 px-4">address: {data.shipping_details.address}</p>
                        <p className="text-sm py-3 px-4">date: {moment(data.shipping_details.date).format('LL')}</p>    
                  </div>


                

        <div className="flex  gap-x-5 py-4 w-1/2 flex-col">
                     <div className="flex py-4">
                            <h1 className="text-start  text-lg lg:text-xl font-bold">Status:
                                {data.status === 'PENDING' && <span className='text-white px-4 bg-yellow-500'>  {data.status} </span>}
                                {data.status ===  'CANCEL' &&  <span className='text-white px-4 bg-red'>  {data.status} </span>}
                                {data.status ===  'DISPATCH' && <span className='text-white px-4 bg-orange-500'>  {data.status} </span>}
                                {data.status ===  'DELIVERED' && <span className='text-white px-4 bg-green-500'>  {data.status} </span>}
                             </h1>
                     </div>
                    
                        <Formik initialValues={initialValues} onSubmit={onSubmitChangeHandler} >
                        <Form className='w-full'>
                                <Field as="select" name="status" id="" className=' w-full outline-none border p-2 rounded-md px-3'>
                                    <option value="">Select</option>
                                    <option  value="PENDING">Pending</option>
                                    <option  value="DISPATCH">Dispatch</option>
                                    <option  value="CANCEL">Cancel</option>
                                    <option  value="DELIVERED">Delivered</option>
                                </Field>
                                <div className=" py-2 flex justify-end items-center">
                                    {/* <button disabled={UpdateOrderStatusByIdResponse.isLoading} onClick={CancelHandler} className="px-5 py-2 bg-green-500 inline-flex items-center gap-x-2 disabled:bg-green-300 rounded-sm text-white" > <TbGardenCartOff className='text-2xl' /> Update </button> */}

                                    <SubmitButton  full={false} title='Update' loading={UpdateOrderStatusByIdResponse.isLoading} className="bg-green-500 disabled:bg-green-300" />
                                </div>
                        </Form>
                      </Formik>
        </div>

                   
              </div>
                <div className=" w-full lg:w-1/2 flex items-center justify-center flex-col">
                  {/* <img src="https://images.unsplash.com/photo-1707343848610-16f9afe1ae23" alt="" className='w-1/2 object-cover' /> */}

                    <div className="text-start  w-full  font-bold">
                        <label className='text-lg lg:text-xl'>Products:</label>

                        {
                            data && data.products && data.products.length > 0 && data.products.map((c: any, i: number) => {
                                return <div key={i} className='w-full border rounded-md px-4 py-2 flex justify-between items-center my-2' >
                                    <div className="">
                                        <p className="text-sm py-3 px-4 text-ellipsis">Name: {c.title}</p>
                                        <p className="text-sm py-3 px-4">Quanitity: {c.qty}</p>
                                        <p className="text-sm py-3 px-4">Price: {c.price}</p>

                                    </div>
                                    <div className="w-1/5">
                                        <img src={c.image} alt={c.title} />

                                    </div>
                                </div>
                            })
                        }

                    </div>

                <div className=" w-full lg:w-1/2 flex items-center justify-center flex-wrap">

                                        {/* {
                                            Array(10).fill(null).map((cur:any,i:number)=>{
                                                return <div className="w-1/3 p-2" key={i}>
                                                    <img src={`https://res.cloudinary.com/dfyasiqxg/image/upload/v1710682083/products/myrzmnfabxnjeuxycvic.jpg`}  alt={`roast ${i}`} />
                                                </div>
                                            })
                                        } */}
                </div>
              </div>

            </div>
      </>
  )
}

export default OrderDetailsPage