"use client";
import BackStripe from '@/components/Breadcrumbs/BackStripe'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import React, { lazy, Suspense,useState } from 'react'
const AllVendors = lazy(() => import('@/components/Vendors/AllVendors'))
const AddVendor = lazy(() => import('@/components/Vendors/AddVendor'))

const VendorPage = () => {

  const [state,setState]  = useState(0)
  return (
    <>
            <BackStripe/>
            <Breadcrumb pageName='Vendor Page'  />

            <div className="w-[96%] mx-auto min-h-[50vh] shadow-sm rounded-md bg-white py-4 lg:w-[94%] px-4">
                      <ul className="flex w-full justify-end px-5 items-center">
          <li onClick={() => setState(0)} className={`text-sm text-black ${state === 0 && 'border-b bg-blue-200 text-blue-500'} hover:border-b px-4 py-2 border-b-blue-500 hover:bg-blue-200 hover:text-blue-500 transition-all duration-300 cursor-pointer`}>Add Vendor</li>
          <li onClick={() => setState(1)} className={`text-sm hover:border-b px-4 py-2 ${state === 1 && 'border-b bg-blue-200 text-blue-500'} border-b-blue-500 hover:bg-blue-200 hover:text-blue-500 transition-all duration-300 cursor-pointer`}>Vendors</li>
                      </ul>

              <Suspense  fallback={<Loader/>} >
          {state === 0 && <AddVendor /> }
          {state === 1 && <AllVendors />}
              </Suspense>

            </div>
    </>
  )
}

export default VendorPage