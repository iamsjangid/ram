import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { AddCategory } from '../types'
import { BACKEND_URI, LOCALSTORAGEKEY } from '@/constant';

// Define a service using a base URL and expected endpoints



export const CategoryApi = createApi({
  reducerPath: 'CategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl:BACKEND_URI }),
  tagTypes:['categories'],
  endpoints: (builder) => ({
    addCategory: builder.mutation<String,any>({
      query: (obj) => ({
        url:'/product/category/add',
        body:obj,
        method:'POST',
        headers:{
            
              'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
              
        }
      }),
      invalidatesTags:['categories']
    }),
    getAllCategories:  builder.query<String,any>({
        providesTags:['categories'],
      query: (obj) => ({
        
        url:'/product/category/',
        method:'GET',
        headers:{
              'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
        },
        
      }),
    }),
     addSubCategory: builder.mutation<String,any>({
      query: (obj) => ({
        url:'/product/category/add/sub',
        body:obj,
        method:'POST',
        headers:{
              'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
        }
      }),
      invalidatesTags:['categories']

    }),
     operations: builder.mutation<String,any>({
      query: (obj) => ({
        url:'/product/category/operations',
        body:obj,
        method:'POST',
        headers:{
              'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
        }
      }),
      invalidatesTags:['categories']

    }),
    
  }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddCategoryMutation , useGetAllCategoriesQuery , useAddSubCategoryMutation,useOperationsMutation} = CategoryApi