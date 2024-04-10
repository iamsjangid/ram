"use client";
import Loader from '@/components/Loader'
import { useCheckIntoCartQuery, useCheckoutPaymentMutation, useCheckoutWithInCartOperationsMutation } from '@/redux/queries/AddToCart'
import React from 'react'
import { FaCirclePlus,FaCircleMinus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import Link from 'next/link';
import {  Form,Formik,ErrorMessage, Field  } from 'formik'
import { MdAlternateEmail, MdOutlinePerson } from "react-icons/md"; 
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import { UserSlicePath } from '@/redux/Slices/user.slice';
const Checkout = () => {


  const user = useSelector(UserSlicePath)

  const validationSchema = yup.object().shape({
    email: yup.string().email("Enter valid Email").required("Email must be required"),
    name: yup.string().required("Name must be required"),
    address: yup.string().required("Address must be required"), 
  })
  const initialValues = {
    email: user?.email || '',
    name: user?.name || '',
    address: '',
  }

  const { data, isLoading }:any = useCheckIntoCartQuery({})

  const [checkoutFn, checkoutFnResponse] = useCheckoutWithInCartOperationsMutation()
  const [orderPaymentFn, orderPaymentFnResponse] = useCheckoutPaymentMutation()





  

  if (isLoading || checkoutFnResponse.isLoading || orderPaymentFnResponse.isLoading){
    return <Loader/>
  }


  const checkoutFunctionForOperations = async({ q,item}: { q: string, item: string })=>{
          try {

            const { data,error }:any = await checkoutFn({ q: q, item: item })
            console.log({data});
            if(error){
              toast.error(error?.data?.message)
              return
            }
                  
                toast.success(data.msg)

          } catch (error:any) {
            toast.error(error.message)
          }
  }







  const onSubmitHandler = async(e:any,{resetForm}:any)=>{
    try {
     
      const { data, error }: any = await orderPaymentFn(e);

      console.log(error)

      if(error){
        toast.error(error?.data?.message)
        return 
      } 
      
      var options = {
        "key": "rzp_test_i8eEWosjuFbzMi", // Enter the Key ID generated from the Dashboard
        "amount": data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": data.order.currency,
        "name": "CodewithKrishna",
        "description": "Test Transaction",
        "image": "https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg",
        "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:8888/api/v1/addtocart/checkcart/payment-verification",
        "prefill": {
          "name": e.name,
          "email": e.email,
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
            //@ts-ignore
        var rzp1 = new window.Razorpay(options);
        rzp1.open();


  
      

    } catch (error:any) {

      console.log(error);
      
      toast.error(error.message)
    }
  }

  return (
    <>
        <div>
 
  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 ">
              
            {
                data&&   data.products && data.products.length>0 ? data.products.map((cur:any,i:any)=>{
                return <div key={i} className="flex flex-col rounded-lg bg-white sm:flex-row">
                    {/* {JSON.stringify(cur)} */}
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cur.product.images[0]  && cur.product.images[0].file} alt="product image" />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{cur.product.title}</span>
                    <span className="float-right text-gray-400">{cur.product.category}</span>
                    <div className="flex gap-x-4 items-center">
                      <p className="text-lg font-bold"> &#8377; {cur.product.price * cur.qty} </p>
                      <div className="btn flex items-center gap-x-2">
                        <button onClick={() => checkoutFunctionForOperations({ q: 'ADD', item: cur._id })} className='text-black transition-all duration-300 hover:text-zinc-500' ><FaCirclePlus/></button>
                        <span>{cur.qty}</span>
                        <button onClick={() => checkoutFunctionForOperations({ q: 'MINUS', item: cur._id })} className='text-black transition-all duration-300 hover:text-zinc-500' ><FaCircleMinus /></button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => checkoutFunctionForOperations({ q: 'DELETE', item: cur._id })}>
                    <FaRegTrashAlt  />
                        </button>
                </div>

              }):<>
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">

                      <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`https://as2.ftcdn.net/v2/jpg/00/96/17/77/1000_F_96177722_WVPu6QSACm8qYSdZUeghT7WPXjIvrf4E.jpg`} alt="product image" />
                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">No Product in Cart</span>
                        <div className="flex gap-x-4 items-center py-4">
                          <Link href={'/'} className="bg-black px-4 py-2 rounded-md text-white">Add Product</Link>
                        </div>
                      </div>

                    </div>
              </>
            }

      </div>
  
    </div>
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">Complete your order by providing your payment details.</p>
      
            <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema} >
            <Form className='w-full'>
                 
                  <div className="w-full">
                    <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                    <div className="relative">
                      <Field type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="john@gmail.com" />
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <MdOutlinePerson />
                      </div>
                    </div>
                    <ErrorMessage name='name' component={'p'} className='text-red-500' />
                  </div> 

                <div className="w-full">
                  <label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                  <div className="relative">
                    <Field type="email" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="john@gmail.com" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <MdAlternateEmail />
                    </div>
                  </div>
                  <ErrorMessage name='email' component={'p'} className='text-red-500' />

                </div> 

                <div className="w-full">
                  <label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
                  <div className="relative">
                    <Field as="textarea" rows={5} id="address" name="address" className="w-full rounded-md border border-gray-200 px-4 py-3   text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Type full address" />
                  </div>
                  <ErrorMessage name='address' component={'p'} className='text-red-500' />

                </div> 



                  {/* Total */}
                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">&#8377; {data?.totalPrice ? data?.totalPrice : 0}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">&#8377; {data?.shipping ? data?.shipping : 0}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">&#8377; {data?.totalPrice ? Number(data?.totalPrice) + Number(data.shipping ? data.shipping:0) : 0} /-</p>
                  </div>
          
           

      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>


              </Form>
            </Formik>
    </div>
  </div>
</div>

    
    </>
  )
}

export default Checkout