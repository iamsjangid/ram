import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddCategory } from '../types'
import { BACKEND_URI, LOCALSTORAGEKEY } from '@/constant';

// Define a service using a base URL and expected endpoints



export const AdminOrderApi = createApi({
    reducerPath: 'AdminOrderApi',
    tagTypes: ['getAllOrders','getAllOrdersById'],
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URI }),
    endpoints: (builder) => ({

        getAllOrders: builder.query<String, any>({
            query: (obj) => ({
                url: '/admin/product/get-all-orders',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),

            providesTags: ['getAllOrders']
        }),

        getAllOrdersById: builder.query<String, any>({
            query: (id) => ({
                url: `/admin/product/get-all-orders/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),
            providesTags: ['getAllOrdersById']

        }),

        updateOrderStatusById: builder.mutation<String, any>({
            query: (obj) => ({
                url: `/admin/product/get-all-orders/${obj.id}`,
                method: 'PUT',
                body:{status:obj.status},
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGEKEY)}`,
                }
            }),
            invalidatesTags: ['getAllOrders','getAllOrdersById']

        }),


    }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllOrdersQuery ,  useGetAllOrdersByIdQuery , useUpdateOrderStatusByIdMutation   } = AdminOrderApi