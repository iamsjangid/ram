"use client";
import React, { useState } from 'react'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import Link from 'next/link';
import { ImEyeBlocked, ImEye } from "react-icons/im";
import { toast } from 'react-toastify';
import { useGetAllVendorsQuery, useToggleVendorByIdMutation, useDeleteVendorByIdMutation } from '@/provider/redux/query/AdminVendors.query';
import Loader from '../common/Loader';
const AllVendors = () => {
  const { data,isLoading,isError } = useGetAllVendorsQuery({});
  const [selectPage,setSelectPage] = useState(1)
  
  if(isError){
    return <div>
      <h1>something went wrong</h1>
    </div>
  }

  if (isLoading){
    return <>
          <Loader/>
    </>
  }
  
  const length = data.total as number || 0;
  const page = 4;
  const pages = Math.ceil(length / page);
  return (
    <>
        <div className="flex justify-between items-center py-4">
        <h1 className='text-3xl font-semibold'>All Vendors  selectPage{selectPage} </h1>
          <ul className="flex items-center gap-x-2 px-4 ">
          <li>  <button
            disabled={selectPage === 1 || data.total ===0  }
            onClick={() => setSelectPage(selectPage - 1)}
            className="p-4 bg-black transition-all duration-500 hover:rounded-full disabled:bg-zinc-400 text-white"
          >
            <IoChevronBack />
          </button></li>
          <li><button
            disabled={selectPage === pages || data.total === 0}
            onClick={() => setSelectPage(selectPage + 1)}
            className="p-4 bg-black transition-all duration-500 hover:rounded-full disabled:bg-zinc-400 text-white"
          >
            <IoChevronForward />
          </button></li>
          </ul>
        </div>

        <table className="w-full px-3 py-4 border">
          <thead className=''>
            <tr className='border'>
            <th className='border'>ID</th>
            <th className='border'>Name</th>
            <th className='border'>Mobile No</th>
            <th className='border'>Image</th>
            <th className='border'>Status</th>
            <th className='border'>Actions</th>
            </tr>
          </thead>
              <tbody>
                {
            data && data.vendors && data.vendors.slice((selectPage - 1) * page, selectPage * page).map((c:any,i:number)=>{
                    return  <Row data={c}  key={i} />
                  })
                }
              </tbody>

        </table>

      </>
  )
}


const Row = ({ data }: { data :any})=>{

  const [toggleVendorById, toggleVendorByIdResponse] = useToggleVendorByIdMutation()
  const [deleteVendorById, deleteVendorByIdResponse] = useDeleteVendorByIdMutation()
  


  const onDeleteHandler = async(id: string) => {
    try {
      const { data, error }: any = await deleteVendorById({ id })
      if (error) {
        toast.error(error.data.message);
        return
      }

      toast.success(data.msg);

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const updateToggleHandler = async(id: string) => {
    try {
      const { data,error}:any = await toggleVendorById({id})
      if(error){
        toast.error(error.data.message);
            return
      }

        toast.success(data.msg);

    } catch (error: any) {
      toast.error(error.message)
    }
  }




  return <>
    <tr  className='py-4'>
      <td className="border text-center py-4">{data._id}</td>
      <td className="border text-center py-4">{data.name}</td>
      <td className="border text-center py-4">{data.mobile_no}</td>
      <td className="border-t text-center py-4 flex justify-center items-center">
        <img src={data.photo.uri} className='w-[150px] h-[150px] object-cover overflow-hidden border-[.1px]' alt="image" />
      </td>
      <td className="border text-center py-4">  <span className={`px-2 py-2 inline-block ${data.isActive ? ' bg-[#5eeb34]' : ' bg-red'} rounded-full animate-pulse`}></span></td>
      <td className='border-b flex gap-x-4  justify-center py-4 items-center'>
        <button title="update" disabled={toggleVendorByIdResponse.isLoading} onClick={() => updateToggleHandler(data._id)} className='p-2 rounded-sm bg-green-500 transition-all duration-300 disabled:bg-green-300 text-white'>
          {!data.isActive ? <ImEyeBlocked /> : <ImEye />}
        </button>
        <Link  href={`/vendor/${data._id}`} className='p-2 rounded-sm bg-black text-white'>
          <LuFileEdit />
        </Link>

        <button title="delete" disabled={deleteVendorByIdResponse.isLoading} onClick={() => onDeleteHandler(data._id)} className='p-2 rounded-sm bg-red disabled:bg-orange-300  text-white'>
          <MdDelete />
        </button>
      </td>
    </tr>
    </>

}


export default AllVendors