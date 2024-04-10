import { useGetAllCategoriesQuery, useOperationsMutation } from '@/provider/redux/query/Categories.query';
import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Loader from '../common/Loader';
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from 'react-toastify';
const RowElement = ({index,data}:{index:number,data:any})=>{
  const [  operations,operationResponse ] = useOperationsMutation()


  const onDeleteHandler = async () => {
    try {

      const reponse: any = await operations({ operation :"DELETE",id:data._id});

      if (reponse.error) {
        console.log(reponse.error);

        toast.error(reponse.error.data.message);
        return
      }
      toast.success(reponse.data.msg);

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const onEditStatusHandler = async () => {
    try {

      const reponse: any = await operations({ operation: "STATUS", id: data._id });

      if (reponse.error) { 

        toast.error(reponse.error.data.message);
        return
      }
      toast.success(reponse.data.msg);

    } catch (error: any) {
      toast.error(error.message)
    }
  }
  

  const onDeleteSubCategoryHandler = async (sub_id:string) => {
    try {

      const reponse: any = await operations({ operation: "DELETE_SUB_CATEGORY", id: data._id, sub_id: sub_id });

      if (reponse.error) {

        toast.error(reponse.error.data.message);
        return
      }
      toast.success(reponse.data.msg);

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  




  return <tr className='border'>

    <td className='border-r text-center'>{index}</td>
    <td className='border-r text-center'>
      {data.title}
    </td>
    <td className='border-r text-center'>
          <ul>
            {
          data.sub_categories.map((cur:any,i:number)=>{
            return <li key={i} className='boder-b border py-3 flex justify-center gap-x-3 items-center'>
              <span className="capitalize">{cur.title}</span>
              <button onClick={()=>onDeleteSubCategoryHandler(cur._id)} className="">
                <TiDeleteOutline className='text-xl hover:text-2xl transition-all duration-300' />
              </button>
            </li>
          })
            }
          </ul>
    </td>
    <td className='border-r text-center'>
      <img src={data.category_image.uri} className='w-1/2 object-cover' alt="iamge" />
    </td>
    <td className="border-r text-center">
      <span className={`px-2 py-2 inline-block ${data.isActive ? ' bg-[#5eeb34]' :' bg-red'} rounded-full animate-pulse`}></span>
    </td>
    <td className='border-r text-center'>
      <button onClick={onDeleteHandler} disabled={operationResponse.isLoading} className="px-4 disabled:bg-blue-400 py-2 bg-primary mx-2 rounded-sm text-white"><FaTrash /></button>
      <button onClick={onEditStatusHandler} disabled={operationResponse.isLoading} className="px-4 disabled:bg-blue-400 py-2 bg-purple-600 mx-2 rounded-sm text-white"><FaRegEdit/></button>
    </td>
  </tr>
}

const AllCategory = () => {


      const {data,isLoading}:any = useGetAllCategoriesQuery({});

  if (isLoading){
    return <Loader/>
  }

  return (
    <>
      <table className="md:table-fixed table-auto w-full border">
  <thead>
    <tr className='border'>
            <th className='border-r'>Id</th>
            <th className='border-r'>Title</th>
      <th  className='border-r'>Sub Categories</th>
            <th className='border-r'>Image</th>
            <th className='border-r'>Status</th>
      <th  className='border-r'>Actions</th>
    </tr>
  </thead>
  <tbody>
        {
            data && data.categories && data.categories.map((cur:any,i:number)=>{
              return <RowElement key={i} index={i+1} data={cur} />
          })
        }
  </tbody>
</table>

    </>
  )
}

export default AllCategory