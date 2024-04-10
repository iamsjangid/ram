// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { loginDetails } from '../types'
import { BACKEND_URI } from '@/constant';

// Define a service using a base URL and expected endpoints



export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl:BACKEND_URI }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<String,loginDetails>({
      query: (obj) => ({
        url:'/admin/auth/login',
        body:obj,
        method:'POST'
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation } = AuthApi