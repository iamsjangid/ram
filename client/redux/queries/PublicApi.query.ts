// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const PublicApi = createApi({
  reducerPath: 'PublicApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI+"/public" }),
//   tagTypes:['addToCart','getAllItems'],
  endpoints: (builder) => ({

     applyVendor: builder.mutation<any,any>({
       query: (obj) => ({
             url:`/apply-vendor`, 
         method:'POST',
         body:obj,
        }),
    }),
   
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {

            useApplyVendorMutation
} = PublicApi