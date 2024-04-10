import Loader from '@/components/common/Loader'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Authentication',
    description: 'Login to Admin Pannel'
}

const AuthLayout = ({ children }:{children:React.ReactNode}) => {
  return (
      <Suspense fallback={<Loader />}>{children}</Suspense>
  )
}

export default AuthLayout