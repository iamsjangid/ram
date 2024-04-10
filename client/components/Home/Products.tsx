"use client";
import  { useState } from 'react'
import { IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import {  CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { useGetAllProductsQuery } from '@/redux/queries/Product.query';
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '@/redux/queries/AddToCart';
import { ImSpinner } from 'react-icons/im'; 
import { useSelector } from 'react-redux';
import { UserSlicePath } from '@/redux/Slices/user.slice';
const Card = ({data}:any)=>{
    const userData =  useSelector(UserSlicePath)
    const [addToCartFn,AddToCartResponse] = useAddToCartMutation()
                console.log(data);
                
    const AddToCart = async()=>{

        if (!userData){
            toast.error("please first login")
                        return
        } 
        const response:any = await addToCartFn({item:data._id})
        if (response.error){
            toast.error(response?.error?.data?.message)
            return 
        }
        
        toast.success(response.data.msg)
    }


    const wishList = async () => {
        toast.success("product added in wishList")
    }
    const [descShow,setDescShow] = useState<boolean>(false);

    return <>
        <div onMouseEnter={() => setDescShow(true)} onMouseLeave={() => setDescShow(false)} className="card  w-full  lg:w-1/3 xl:w-1/4 p-4 overflow-hidden rounded-xl ">
                    
           <div className=" relative overflow-hidden">
                <Link href={`/product/${data.slug}`} className="w-full" >
                <img src={data?.images[0]?.file ? data?.images[0]?.file :"https://cdn.dribbble.com/userupload/11949610/file/still-e02e3f14136ec9423b24b206f1886a86.png?format=webp&resize=200x150&vertical=center"} alt="" className="w-full h-full object-cover rounded-xl" />
            </Link>
                <div className={` ${descShow ? 'translate-y-0' : 'translate-y-[100%]'}   transition-all duration-300 border-b-[100px] border-b-black  opacity-20 blur-md bg-opacity-25 h-[12vh] w-full absolute bottom-0  flex justify-between items-center px-3`}>
                           

                </div>
                <div className={` ${descShow ? 'translate-y-0' : 'translate-y-[100%]'}   transition-all duration-300  bg-opacity-20 h-[12vh] w-full absolute bottom-0  flex justify-between items-center px-3`}>
                    <span className="inline-block text-ellipsis text-white">
                        {data.product_feature.length>20 ? data.product_feature.substring(0, 20) + "..." : data.product_feature}
                    </span>
                    <div className="btn flex items-center gap-x-3">
                        <button onClick={wishList} title='Add To wishlist' className="rounded-full p-3 text-xl bg-white">
                            <IoIosHeartEmpty />
                        </button>
                        <button onClick={AddToCart} title='Add To Cart' className="rounded-full p-3 text-xl bg-white">
                            {!AddToCartResponse.isLoading? <CiShoppingCart   />:<ImSpinner className='animate-spin transition-all duration-200' /> }
                        </button>
                    </div>

                </div>
           </div>
            <div className={` py-2 px-4 flex justify-between items-center`}>
                        <div className="flex gap-x-2 items-center">
                    <img src="https://cdn.dribbble.com/userupload/12775657/file/original-641fa0d9ef681538cc687f925687392d.jpg?format=webp&resize=273x205&vertical=center" className={"w-10 h-10 rounded-full"} alt="" />
                    <span>{data.title.length <= 10 ? data.title : data.title.slice(0,10)+"..."}</span>
                        </div>
                <div className="flex gap-x-4 items-center">
                                <div className="flex items-center">
                        <IoIosHeartEmpty/>
                        <span>{data?.price}</span>
                                </div>
                    <div className="flex items-center">
                        <IoIosStar className='text-yellow-500' />
                        <span>{data?.rating}</span>
                    </div>


                </div>
            </div>

                               

                </div>
    </>
}

const ProductsComponent = ({ isHeadShow }: { isHeadShow? :boolean | undefined}) => {

    const {data,isLoading}  = useGetAllProductsQuery({})

    if (isLoading){
        return <div>loading...</div>
    }
 
    

  return (
    <>
          {isHeadShow  && <h1 className="text-center text-4xl font-light">Explore inspiring designs</h1>}

                <div className="w-full md:w-[96%] mx-auto min-h-[50vh] mt-10  flex justify-center items-center flex-wrap">
                            {
                  data?.products.map((cur,i)=>{
                      return <Card data={cur}  key={i} />
                                })
                            }
                </div>
                <div className="py-3 flex justify-center items-center">
                    <Link href="/" className="border-[1.2px] border-black rounded-full px-3 py-3">
                  Browse more inspiration
                    </Link>
                </div>
            </>
  )
}

export default ProductsComponent