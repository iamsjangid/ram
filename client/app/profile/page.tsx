"use client";
import OrderCard from '@/components/profile/OrderCard'
import { AddToCartApi } from '@/redux/queries/AddToCart';
import { removeUser } from '@/redux/Slices/user.slice';
import { useRouter } from 'next/navigation';
import React from 'react' 
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const ProfilePage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const logoutHandler = () => {
        try {
            localStorage.removeItem("token");
            dispatch(removeUser(null))
            dispatch(AddToCartApi.util.resetApiState())
            router.push("/")

        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <div className="min-h-screen w-[96%] flex flex-col md:flex-row  items-start md:w-[90%] ">
                <div className="w-1/2">
                    <div className="w-1/2 avatar mx-auto flex-col flex items-center justify-center">
                        <img className='w-[30%]' src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="" />
                        <button onClick={logoutHandler} className="px-12 py-2 rounded-lg bg-white border transition-all duration-300 hover:bg-black hover:text-white">Logout</button>
                    </div>

                    {/* <div className="logout-btn justify-center items-center">
                                    </div> */}
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-y-4">
                    <h1 className='text-3xl font'>Arriving Orders</h1>

                  {
                    Array(5).fill(null).map((cur,i)=>{
                        return <OrderCard key={new Date().getTime() + 2} id={i+1} />
                    })
                  }

                </div>

            </div>
        </>
    )
}

export default ProfilePage