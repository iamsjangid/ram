"use client"; 
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AddProduct from '@/components/products/product/AddProduct';
import ListProducts from '@/components/products/product/ListProducts';
import React, { useState } from 'react'
const ProductPage = () => {
        const [index,setIndex] = useState<number>(0);
  return (
    <>
          <ul className='flex gap-x-4 py-5'>
              <li> <button onClick={() => setIndex(0)} className="bg-primary text-lg rounded-md px-8 py-2 text-white">Add</button>  </li>
              <li> <button onClick={() => setIndex(1)} className="bg-red text-lg rounded-md px-8 py-2 text-white">All</button>  </li>

          </ul>
          <Breadcrumb pageName={index == 0 ? `Add Product` : 'All Products'} />

          {
              index === 0 && <AddProduct />
          }
          {
              index === 1 && <ListProducts />
          }



    </>
  )
}

export default ProductPage