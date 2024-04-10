import React from 'react'
import { FaRegEdit, FaTrash } from 'react-icons/fa'

const ListProducts = () => {
  return (
    <>
     <table className="table-auto w-full border">
  <thead>
    <tr>
      <th className='border'>ID</th>
      <th className='border'>Title</th>
            <th className='border'>Status</th>
            <th className='border'>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr className='py-3'>
            <td className='border'>1</td>
            <td className='border'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td className='border'>Malcolm Lockyer</td>
      <td className='border flex justify-center items-center gap-x-3'>
              <button 
              // onClick={onDeleteHandler}               disabled={operationResponse.isLoading}
                className="px-4 disabled:bg-blue-400 py-2 bg-primary mx-2 rounded-sm text-white">
                  <FaTrash /></button>

              <button 
              // onClick={onEditStatusHandler} disabled={operationResponse.isLoading} 
              className="px-4 disabled:bg-blue-400 py-2 bg-purple-600 mx-2 rounded-sm text-white">
                <FaRegEdit /></button>

      </td>
    </tr>
   
  </tbody>
</table>
 
    </>
  )
}

export default ListProducts