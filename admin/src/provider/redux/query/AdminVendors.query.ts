import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddCategory } from '../types'
import { BACKEND_URI, LOCALSTORAGEKEY } from '@/constant';

// Define a service using a base URL and expected endpoints



export const AdminVendorApi = createApi({
    reducerPath: 'AdminVendorApi',
    tagTypes: ['getAllVendors'],
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URI }),
    endpoints: (builder) => ({

        createVendor: builder.mutation<String, any>({
            query: (obj) => ({
                url: '/admin/vendors/create',
                method: 'POST',
                body: obj,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),
            invalidatesTags: ['getAllVendors']

        }),

        getAllVendors: builder.query<any, any>({
            query: ({}) => ({
                url: '/admin/vendors/create',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),
            providesTags: ['getAllVendors']

        }),

        toggleVendorById: builder.mutation<any, any>({
            query: ({ id}) => ({
                url: '/admin/vendors/vendor/' + id,
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),

            invalidatesTags: ['getAllVendors']
        }),


        deleteVendorById: builder.mutation<any, any>({
            query: ({ id }) => ({
                url: '/admin/vendors/vendor/' + id,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),

            invalidatesTags: ['getAllVendors']
        }),
        getVendorById: builder.query<any, any>({
            query: ({ id }) => ({
                url: '/admin/vendors/vendor/' + id,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            })
        }),
    }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateVendorMutation , useGetAllVendorsQuery , useToggleVendorByIdMutation, useDeleteVendorByIdMutation, useGetVendorByIdQuery } = AdminVendorApi