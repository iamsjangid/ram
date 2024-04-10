import React from 'react'
import { ImSpinner } from 'react-icons/im'

type Button = {
    className?:string | undefined,
    title:string ,
    loading?:boolean | undefined,
    full?:boolean,
    disabled?:boolean
}

const SubmitButton = ({ className, title, loading = false, full = true, disabled }: Button) => {
  return (
    <>
      <button  type="submit" disabled={loading || disabled} className={`flex ${full ?'w-full':''} justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 outline-none  inline-flex ${className}`}>
             {title} {!loading ?  '' : <ImSpinner className='animate-spin text-2xl text-white transition-all duration-300' />}
          </button>
    </>
  )
}

export default SubmitButton