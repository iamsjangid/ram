import React from 'react'
import * as yup from 'yup'
import {Formik ,Form,Field, ErrorMessage} from 'formik'
import { toast } from 'react-toastify'
import { useAddCategoryMutation } from '@/provider/redux/query/Categories.query'
import { AddCategory as AddCategoyType } from '@/provider/redux/types'
import SubmitButton from '../reuseable/SubmitButton'
import AddSubCategory from './AddSubCategory'
const AddCategory = () => {

    const [AddCategory,AddCategoryResponse] = useAddCategoryMutation({});

    const validationSchema = yup.object({
        title:yup.string().required("Category title is required"), 
        image:yup.mixed().required("Category image is required")
    })

    const initialValues: AddCategoyType = {
        title:"", 
        image:null
    }


    const onSubmitHandler = async (e: any,{resetForm}:any)=>{
                    try {

                        let bodyContent = new FormData();
                        bodyContent.append("title", e.title);
                        bodyContent.append("image", e.image);

                        const { data, error }: any = await  AddCategory(bodyContent);

                        if(error){
                            console.log(error);
                            
                            toast.error(error.data.message);
                            return 
                        }
                                toast.success(data.msg);
                        resetForm()
                                
                    } catch (error:any) {
                                toast.error(error.message)
                    }
        }

  return (
    <>
    
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
              <div className="flex flex-col gap-9">
                  {/* <!-- Contact Form --> */}
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                     
                      <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initialValues}>

                        {({ handleSubmit,setFieldValue })=>(
                              <form onSubmit={handleSubmit} >
                                  <div className="p-6.5">
                                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                          <div className="w-full  ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Category Title
                                              </label>
                                              <Field
                                              name="title"
                                                  type="text"
                                                  placeholder="Enter your first name"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='title' className='text-red text-sm capitalize' component={'p'}  />
                                              
                                          </div>
                                      </div>
 


                                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                          <div className="w-full  ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Category Image
                                              </label>
                                              <input
                                                  type="file"
                                                  onChange={(e)=>{
                                                    if(e.target.files){
                                                        setFieldValue('image',e.target.files[0])
                                                    }

                                                  }}
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage  name='image' className='text-red text-sm capitalize' component={'p'} />

                                          </div>


                                      </div>
                                    
                                                    {/*  */}
                                      <SubmitButton className='' title='Add Category'  loading={AddCategoryResponse.isLoading}  />
                                  </div>
                              </form>
                        )}

                        </Formik>

                  </div>
              </div>


          </div>


          <AddSubCategory/>
    </>
  )
}

export default AddCategory