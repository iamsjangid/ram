"use client";
import React, { useState, ReactNode, useEffect, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { BACKEND_URI, LOCALSTORAGEKEY, public_routes } from "@/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserSlicePath, setUser } from "@/provider/redux/slice/User.slice";
import Loader from "../common/Loader";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isLoading,setIsLoading] = useState(true);
  const pathname = usePathname()
  const router = useRouter()
      const UserSlice = useSelector(UserSlicePath);
      const dispatch = useDispatch();




  const fetchUser = async (token: string, setIsLoading:any)=>{
 
      const response = await axios.get(`${BACKEND_URI}/admin/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      dispatch(setUser(response?.data?.user));
      setIsLoading(false)

 
  }
  
  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGEKEY) || ''
    // if (!token && pathname.startsWith(public_routes.AUTH) ){
    //         router.replace(`/auth/signin`)
    //         setIsLoading(false);

    //       }
            if(!token){    
              router.push(`/auth/signin`)
              setIsLoading(false);
              return
            }
    if (UserSlice.user){ 
      setIsLoading(false);
      return

    }
    else{
    (async()=>{
          try {
            await fetchUser(token, setIsLoading);
            setIsLoading(false); 

          } catch (error) {  
                  router.push("/auth/signin")
            setIsLoading(false);

          }
      return

    })()
    }


  }, [])
      if (isLoading) {
        return <Loader />
      }

  return (
    <>
    <Suspense fallback={<Loader />}>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {!pathname.startsWith(public_routes.AUTH)  &&  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {!pathname.startsWith(public_routes.AUTH) &&   <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
               {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      </Suspense>
    </>
  );
}
