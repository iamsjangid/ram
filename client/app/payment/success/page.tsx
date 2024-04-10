"use client";
import { useCheckIntoCartQuery } from '@/redux/queries/AddToCart';
import React from 'react'

const OrderPaymentPage = ({ searchParams }: { searchParams: { payment_id :string}}) => {
 

  return (
      <div className="w-full min-h-screen flex justify-center items-center">
          <div>id :{searchParams.payment_id} </div>
      </div>
  )
}

export default OrderPaymentPage