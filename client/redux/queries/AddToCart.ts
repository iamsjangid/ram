// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AddToCartApi = createApi({
  reducerPath: 'AddToCartApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI+"/addtocart" }),
  tagTypes:['addToCart','getAllItems'],
  endpoints: (builder) => ({

     addToCart: builder.mutation<{msg:string},{item:string}>({
       query: (obj) => ({
         url:`/`, 
         method:'POST',
         body:obj,
         headers:{
           'Authorization':'Bearer '+localStorage.getItem("token") || ''
          }
        }),
         invalidatesTags:['getAllItems']
    }),
    checkIntoCart: builder.query<{},{}>({
       
      query: (obj) => ({
        url:`/checkcart`, 
        method:'GET', 
         headers:{
          'Authorization':'Bearer '+localStorage.getItem("token") || ''
        }
      }),
       providesTags:['getAllItems'],
    }),
    checkoutWithInCartOperations: builder.mutation<{},{q:string,item:string}>({
       
      query: (obj) => ({
        url:`/checkcart/function?q=${obj.q}`, 
        method:'PUT',
        body: {item:obj.item},
         headers:{
          'Authorization':'Bearer '+localStorage.getItem("token") || ''
        }
      }),
        invalidatesTags:['getAllItems']

    }),
  checkoutPayment: builder.mutation<{},{name:string,email:string,address:string}>({
       
      query: (obj) => ({
        url:`/checkcart/payment`, 
        method:'POST',
        body: obj,
         headers:{
          'Authorization':'Bearer '+localStorage.getItem("token") || ''
        }
      }),
        // invalidatesTags:['getAllItems']

    }),

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddToCartMutation,
  useCheckIntoCartQuery , 
  useCheckoutWithInCartOperationsMutation,
  useCheckoutPaymentMutation
} = AddToCartApi