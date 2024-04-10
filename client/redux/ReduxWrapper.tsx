"use client";
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

const ReduxWrapper = ({children}:{children:React.ReactNode}) => {
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
    setLoading(false);
  },[])


  return (
     <>
      <Provider store={store}>{children}</Provider>

     </>
  )
}

export default ReduxWrapper