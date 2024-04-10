// Need to use the React-specific entry point to import createApi
import { loginUser, registerUserObj, responseRegisterUser } from '@/types/Auth.query'
import { ProductResponse } from '@/types/Product.query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI+"/product" }),
  endpoints: (builder) => ({
   
     getAllProducts: builder.query<ProductResponse,{}>({
      query: () => ({
        url:`/list`, 
        method:'GET'
      })
    }),
     getAllCategories: builder.query<{},{}>({
      query: () => ({
        url:`/category/list`, 
        method:'GET'
      })
    }),
       getProductBySlug: builder.query<{},{}>({
      query: (slug) => ({
        url:`/data/${slug}`, 
        method:'GET'
      })
    }),



    
    
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery,useGetAllCategoriesQuery,useGetProductBySlugQuery } = ProductApi