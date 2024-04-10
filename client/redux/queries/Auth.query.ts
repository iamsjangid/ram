// Need to use the React-specific entry point to import createApi
import { loginUser, registerUserObj, responseRegisterUser } from '@/types/Auth.query'
import { createApi, fetchBaseQuery, QueryCacheKey } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl:process.env.NEXT_PUBLIC_BACKEND_URI+"/auth" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<responseRegisterUser,registerUserObj>({
      query: (obj) => ({
        url:`/register`,
        body:obj,
        method:'POST'
      })
    }),
     loginUser: builder.mutation<responseRegisterUser,loginUser>({
      query: (obj) => ({
        url:`/login`,
        body:obj,
        method:'POST'
      })
    }),
     profileUser: builder.query<{},{}>({
      query: () => ({
        url:`/profile`,
        method:'GET',
        headers:{
          'Authorization':'Bearer '+localStorage.getItem("token") || ''
        }
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation,useLoginUserMutation , useProfileUserQuery} = AuthApi

