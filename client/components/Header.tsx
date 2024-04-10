"use client";
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";

import {CartBar,DummyCartBar} from './Sidebar/CartBar'
import { usePathname } from 'next/navigation';
import { white_routes_hidden_header_footer } from '@/helpers/routes';
import { useDispatch, useSelector } from 'react-redux';
import { UserSlicePath, removeUser } from '@/redux/Slices/user.slice';
import { useCheckIntoCartQuery } from '@/redux/queries/AddToCart';
import LogoImage from '@/logo.jpeg'
import { CiLogin } from "react-icons/ci";
import { IconType } from 'react-icons';
import UserIcon from './UserIcon';
import { toast } from 'react-toastify';
import { AuthApi } from '@/redux/queries/Auth.query';
const ItemWithIcon = ({   Icon, title ,...props }:any)=>{
    
    

    return      <>
        <li {...props}>
            <div className="relative">
                <Icon className="text-4xl" />
                <span className='absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full'>0</span>
            </div>
            <span className="capitalize">{title}</span>

        </li>
    </>
}
const ItemWithIconWithBadge = ({ user, Icon, title, badgeValue, ...props }: any) => {



    return <>
        {
            user ? <>
                <li {...props}>
                    <div className="relative">
                        <Icon className="text-4xl" />
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full'>{badgeValue}</span>
                    </div>
                    <span className="capitalize">{title}</span>

                </li>
            </> : <>
                <li {...props}>
                    <Icon className="text-4xl" />
                    <span className="capitalize">{title}</span>

                </li>
            </>
        }

    </>
}


const Item = ({ title, link,Icon }: { title: string, link:string,Icon:IconType }) => {


    return <li>
        <Link href={link} className="capitalize  px-4 md:px-7 py-4  lg:bg-black rounded-full lg:text-white  transition-all duration-300 text=black  md:hover:text-white flex items-center">
            <Icon className="text-3xl md:hidden" />
            <span className=' hidden md:block' >{title}</span>
            </Link>

    </li>
}


const Header = () => {

    const [Cartbar, setCartbar] = useState(false);
    const pathname = usePathname()
    const user = useSelector(UserSlicePath)
    const dispatch = useDispatch()
                console.log(user);

                const logoutHandler = ()=>{
                    try {
                        localStorage.removeItem("token");
                        dispatch(removeUser(null))
                        // dispatch(AuthApi.util)

                    } catch (error:any) {
                            toast.error(error.message)
                    }
                }


    const {data}:any = useCheckIntoCartQuery({})

    const SetCartState = () =>{

                
        setCartbar(!Cartbar);
    }
   
    return (
        <>
            <div className=' py-2 px-4 w-full '>
                <nav className={'flex justify-between   mt-3 items-center w-[93%]  md:w-[90%] mx-auto gap-x-2'}>

                    <Link href={'/'} className="logo flex items-center  w-[50%] gap-x-3">
                        <Image src={LogoImage} alt="logo"
                            width={500} height={500}
                            className='w-[30%]' />
                        <div>
                            <span  className="text-2xl logo-font text-[--text-color1] font-bold"  >MynStars</span>
                            <div className="punch-line text-zinc-500 text-sm">Keep it simple</div>
                        </div>
                    </Link>


                    <form className="search hidden md:flex w-full  bg-white items-center gap-x-2 rounded-full px-2">
                        <CiSearch className="text-black text-4xl " />
                        <input type="text" className="w-full  rounded-full border border-none outline-none  px-3 py-4" placeholder="search someting" />

                    </form>

                    <ul className="flex w-[50%] gap-x-4 items-center   justify-end">
                        {user && <UserIcon   />}
                        {!user  &&  <Item Icon={CiLogin} title='Login' link={'/signin'} />}
                        <ItemWithIconWithBadge user={user} badgeValue={data && data?.total} onClick={SetCartState}  Icon={CiShoppingCart} />
                    </ul>



                </nav>


            </div>
        
            {user ? <CartBar setCartbar={SetCartState} Cartbar={Cartbar} /> : <DummyCartBar setCartbar={SetCartState} Cartbar={Cartbar} />} 

        </>
    )
}

export default Header