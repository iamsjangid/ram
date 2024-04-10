import React from 'react'
import Hero from '@/components/Home/Hero'
import MarqueeComponent from '@/components/Home/Marquee'
import ProductsComponent from '@/components/Home/Products'
import Striped from '@/components/Home/Striped'
import CategoryComponent from '@/components/Home/Category' 
const page = () => {
  return (
    <>
                <Hero/>
      <MarqueeComponent />
      <ProductsComponent  />
      <Striped/>
      <CategoryComponent/>


     

    </>
  )
}

export default page


