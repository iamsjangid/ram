"use client";
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { white_routes_hidden_header_footer } from '@/helpers/routes';
import { usePathname, useRouter } from 'next/navigation';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react' 
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from '@/redux/Slices/user.slice';
import axios from 'axios'; 
import LoadingPage from '@/components/Loader';

const PublicLayout = ({children}:{children:React.ReactNode}) => {
  const [isLoading,setIsLoading] = useState(true);
  // const { data,isLoading}:any = useProfileUserQuery({});
const router = useRouter()
const pathname = usePathname();
const dispatch = useDispatch();




const fetchProfile = async(token:string)=>{
  // console.log("token", token);

  console.log("login ke liye request aai hai ");
  

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/profile`,{
      headers:{
      'Authorization': 'Bearer ' + token
      }
  })

  const data = await response.data;
 
  

  if (!data || !data.profile){
    dispatch(removeUser({}));
    throw new Error("Failed To Fetch Profile");
    return
  }

   dispatch(setUser(data.profile));

   console.log("login ho chuka hai ");
   
  setIsLoading(false)
}

  useEffect(() => {
    if (window.localStorage && localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token") || '';

      (async () => {

        await fetchProfile(token)
        setIsLoading(false)
      })()
    }
  })


  useEffect(() => {
    if (white_routes_hidden_header_footer.includes(pathname)) {

      document.body.style.backgroundColor = "#fff";
    } else {
      document.body.style.backgroundColor = "#f9f6f6ee";
    }
  }, [pathname])



  useEffect(()=>{

    const token = localStorage.getItem("token") || '';
 
          

    if (token){ 
      
          (async()=>{ 
            await fetchProfile(token)
            setIsLoading(false)

          })()
    }else{
      setIsLoading(false)
    }
    
  }, [])


  // useEffect(() => { 
  //   if (!isLoading && white_routes_hidden_header_footer.includes(pathname)){
  //     router.replace("/");
  //   }
  // }, [pathname])


  if (isLoading){
    return <LoadingPage />
  }
  

 
  return (
    <>
      <ToastContainer/>
          {!white_routes_hidden_header_footer.includes(pathname) && <Header />}
          {children}
          {!white_routes_hidden_header_footer.includes(pathname) && <Footer />}
    </>
  )
}

export default PublicLayout