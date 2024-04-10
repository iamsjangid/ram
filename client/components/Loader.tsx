"use client";
import React from 'react'
import { Triangle } from 'react-loader-spinner'

const LoadingPage = () => {
  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#003cff"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default LoadingPage