"use client";

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AddCategory from '@/components/products/AddCategory';
import AllCategory from '@/components/products/AllCategory';
import React, { useState } from 'react'

const CategoryPage = () => {

    const [index,setIndex] = useState<number>(0);

  return (
    <>
                <ul className='flex gap-x-4 py-5'> 
              <li> <button onClick={()=>setIndex(0)} className="bg-primary text-lg rounded-md px-8 py-2 text-white">Add</button>  </li>
              <li> <button onClick={()=>setIndex(1)} className="bg-red text-lg rounded-md px-8 py-2 text-white">All</button>  </li>

                </ul>
          <Breadcrumb pageName={index==0?`Add Category`:'All Category'} />

                    {
                        index === 0 && <AddCategory/>
                    }
          {
              index === 1 && <AllCategory />
          }

       

    </>
  )
}

export default CategoryPage