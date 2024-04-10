import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { AddCategory } from '../types'
import { BACKEND_URI, LOCALSTORAGEKEY } from '@/constant';

// Define a service using a base URL and expected endpoints



export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: fetchBaseQuery({ baseUrl:BACKEND_URI }),
  endpoints: (builder) => ({
    
     addProduct: builder.mutation<String,any>({
      query: (obj) => ({
        url:'/admin/product/add',
        body:obj,
        method:'POST',
        headers:{
              'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`, 
        }
      }),

    }),

    
    
  }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddProductMutation } = ProductApi