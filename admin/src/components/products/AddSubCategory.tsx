import { useAddSubCategoryMutation, useGetAllCategoriesQuery } from '@/provider/redux/query/Categories.query'
import React from 'react'
import * as yup from 'yup'
import { Formik,  Field, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
import SubmitButton from '../reuseable/SubmitButton'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
const AddSubCategory = () => {

    const { isLoading, data }: any = useGetAllCategoriesQuery({});
    const [addSubCategory, addSubCategoryResponse ] = useAddSubCategoryMutation({})

    const validationSchema = yup.object({
        category : yup.string().required("Category  is required"),
        subCategory:yup.string().required("Sub Category is required")
    })

    const initialValues = {
        category : "",
        subCategory: ''
    }


    const onSubmitHandler = async (e: any, { resetForm }: any) => {
        try {

            const { data, error }: any = await addSubCategory(e);

            if (error) {
                console.log(error);

                toast.error(error.data.message);
                return
            }
            toast.success(data.msg);
            resetForm()

        } catch (error: any) {
            toast.error(error.message)
        }
    }

  return (
    <>      

                    <div className="py-10"></div>
          <Breadcrumb pageName={`Sub Category`} />
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
              <div className="flex flex-col gap-9">
                  {/* <!-- Contact Form --> */}
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                      <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initialValues}>

                          {({ handleSubmit, setFieldValue }) => (
                              <form onSubmit={handleSubmit} >
                                  <div className="p-6.5">
                                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                          <div className="w-full  ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Select Category 
                                              </label>
                                              <Field
                                              as="select"
                                                  name="category"
                                                  type="text"
                                                  placeholder="Enter your first name"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              >
                                                  <option value="" disabled selected>select</option>
                                                  {
                                                    isLoading?  <option value="" disabled >loading...</option>:<>
                                                    
                                                         {  data && data.categories &&   data.categories.map((cur:any,i:number)=>{
                                                        return  <option key={i} value={cur._id}  >{cur.title}</option>
                                                      })}
                                                    </>
                                                  }
                                              </Field>
                                              <ErrorMessage name='category' className='text-red text-sm capitalize' component={'p'} />

                                          </div>
                                      </div>



                                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                          <div className="w-full  ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                   SubCategory
                                              </label>
                                              <Field 
                                                  name="subCategory"
                                                  type="text"
                                                  placeholder="Enter Sub Category"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />

                                              <ErrorMessage name='subCategory' className='text-red text-sm capitalize' component={'p'} />

                                          </div>


                                      </div>

                                      {/*  */}
                                      <SubmitButton title='Add Sub Category' className=''
                                    //    loading={false}
                                          loading={addSubCategoryResponse.isLoading}
                                       />
                                  </div>
                              </form>
                          )}

                      </Formik>

                  </div>
              </div>


          </div>
    </>
  )
}

export default AddSubCategory