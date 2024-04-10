import React from 'react' 
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { toast } from 'react-toastify'
import SubmitButton from '../../reuseable/SubmitButton'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetAllCategoriesQuery } from '@/provider/redux/query/Categories.query'
import { useAddProductMutation } from '@/provider/redux/query/Product.query'
const AddProduct = () => {




    const { data, isLoading }: any = useGetAllCategoriesQuery({});

    const [AddProductFn,AddProductFnResponse] = useAddProductMutation({})

    const validationSchema = Yup.object({
        title: Yup.string().required('Please provide a title.'),
        subtitle: Yup.string().required('Please provide a subtitle.'),
        images: Yup.mixed().required('Please upload at least one image.').required(),
        category: Yup.string().required('Please select a category.'),
        subCategory: Yup.string().required('Please select a sub-category.'),
        old_price: Yup.number().required('Please provide the old price.').typeError('Old price must be a number.'),
        price: Yup.number().required('Please provide the price.').typeError('Price must be a number.'),
        colors: Yup.array(),
        size: Yup.string(),
        product_feature: Yup.string().required('Please provide a product feature.'),
        rating: Yup.number().required('Please provide a rating.').typeError('Rating must be a number.').max(5, 'Rating must be less than or equal to 5.'),
        patterns: Yup.string().required('Please provide patterns information.'),
        print_location: Yup.string().required('Please provide print location information.'),
        tags: Yup.array(),
        finish: Yup.string(),
    })

    const initialValues = {
        title: '',
        subtitle: '',
        images: null,
        category: '',
        subCategory: '',
        old_price: '',
        price: '',
        colors: [],
        size: '',
        product_feature: '',
        rating: '',
        patterns: '',
        print_location: '',
        tags: [],
        finish: '',
    }

    // const onSubmitHandler = async (e: any, { resetForm }: any) => {
    //     try {
    //             console.log({msg:"done",e});
    //         const formData = new FormData();

    //         for (const key in e) {
    //             console.log(key+"    "+e[key]);
                
    //             if (Array.isArray(e[key])) {
    //                 // Handle arrays
    //                 e[key].forEach((item:any, index:number) => {
    //                     formData.append(`${key}[${index}]`, item);
    //                 });
    //             } else {
    //                 // Handle non-arrays
    //                 formData.append(key, e[key]);
    //             }
    //         } 

    //         const { data, error }: any = await AddProductFn(formData);

    //         if (error) {
    //             console.log(error);

    //             toast.error(error.data.message);
    //             return
    //         }
    //         toast.success(data.msg);
    //         resetForm()

    //     } catch (error: any) {
    //         toast.error(error.message)
    //     }
    // }
    // const onSubmitHandler = async (e: any, { resetForm }: any) => {
    //     try {
    //         console.log({ msg: "done", e });
    //         const formData = new FormData();
          
    //         for (const [key, value] of Object.entries(e)) { 
    //                 formData.append(key, value as any); 
    //         }
    //         const { data, error }: any = await AddProductFn(formData);

    //         if (error) {
    //             console.log(error);
    //             toast.error(error.data.message);
    //             return;
    //         }

    //         toast.success(data.msg);
    //         resetForm();
    //     } catch (error: any) {
    //         toast.error(error.message);
    //     }
    // };


    // const onSubmitHandler = async (e: any, { resetForm }: any) => {
    //     try {
    //         console.log({ msg: "done", e });
    //         const formData = new FormData();

    //         // Append non-file inputs
    //         for (const [key, value] of Object.entries(e)) {
    //             if (key !== "images" && !Array.isArray(value)) {
    //                 formData.append(key, value as any);
    //             }
    //         }

    //         // Append each image file
    //         if (e.images && e.images.length > 0) {
    //             Array.from(e.images).forEach((image, index) => {
    //                 formData.append(`images[${index}]`, image as File);
    //             });
    //         }

    //         const { data, error }: any = await AddProductFn(formData);

    //         if (error) {
    //             console.log(error);
    //             toast.error(error.data.message);
    //             return;
    //         }

    //         toast.success(data.msg);
    //         resetForm();
    //     } catch (error: any) {
    //         toast.error(error.message);
    //     }
    // };

    const onSubmitHandler = async (e:any, { resetForm }:any) => {
        try {
            const formData = new FormData();

            // Loop through the properties and append them to FormData
            for (const key in e) {
                if (e.hasOwnProperty(key)) {
                    const value = e[key];

                    if (value instanceof FileList) {
                        // Handle file input (e.g., images)
                        for (let i = 0; i < value.length; i++) {
                            formData.append(`${key}[${i}]`, value[i]);
                        }
                    } else if (Array.isArray(value)) {
                        // Handle arrays (e.g., colors, tags)
                        value.forEach((item, index) => {
                            formData.append(`${key}[${index}]`, item);
                        });
                    } else {
                        // Handle other types (e.g., strings, numbers)
                        formData.append(key, value as any);
                    }
                }
            }
            const { data, error }: any = await AddProductFn(formData);

                    if (error) {
                        console.log(error);
                        toast.error(error.data.message);
                        return;
                    }

                    toast.success(data.msg);
  

            // Reset the form or perform other actions
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

  return (
    <>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
              <div className="flex flex-col gap-9">
                  {/* <!-- Contact Form --> */}
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                      <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initialValues}>

                          {({ handleSubmit, setFieldValue,values }) => (
                              <form onSubmit={handleSubmit} >
                                  <div className="p-6.5">
                                      <div className="mb-4.5 flex flex-col  xl:flex-row flex-wrap">
                                        
                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                 Product Title
                                              </label>
                                              <Field
                                                  name="title"
                                                  type="text"
                                                  placeholder="Enter Product Title"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='title' className='text-red text-sm capitalize' component={'p'} />

                                          </div>
                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Product Sub Title
                                              </label>
                                              <Field
                                                  name="subtitle"
                                                  type="text"
                                                  placeholder="Enter Product Sub Title"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='subtitle' className='text-red text-sm capitalize' component={'p'} />

                                          </div>

                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Category
                                              </label>
                                              <Field
                                              as="select"
                                                  name="category"
                                                  type="text"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              >
                                                  <option defaultValue="" > select one </option>
                                                        {
                                                            isLoading?<>
                                                          <option defaultValue="" disabled> loading... </option>

                                                            </>: <>
                                                                        {
                                                                  data && data.categories && data.categories.map((cur: any, i: number) => {
                                                                      return <option value={cur._id}  key={i} > {cur.title} </option>
                                                                  })
                                                                        }
                                                            </>
                                                        }

                                              </Field>
                                              <ErrorMessage name='category' className='text-red text-sm capitalize' component={'p'} />

                                          </div>
                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Sub Category
                                                 
                                              </label>
                                              <Field
                                                  as="select"
                                                  name="subCategory" 
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              >
                                                  {values.category && <option defaultValue={' '} >select for {`"${data.categories.find((c: any) => c._id === values.category)?.title }"`} </option>}

                                                  {
                                                      !values.category ? <>
                                                          <option  defaultValue={' '} disabled>{values.category} </option>

                                                      </> : <>
                                                          {
                                                                  data && data.categories && data.categories.filter((category:any) =>  category._id === values.category)[0]?.sub_categories.map((cur: any, i: number) => (
                                                                      <option value={cur._id} key={i}>{cur.title}</option>
                                                                  ))
                                                          }
                                                      </>
                                                  }

                                              </Field>
                                              <ErrorMessage name='subCategory' className='text-red text-sm capitalize' component={'p'} /> 

                                          </div>
                                          
                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Old Price
                                              </label>
                                              <Field
                                                  onInput={(e: any) => e.target.value.replace(/\D/g, '')}

                                                  name="old_price"
                                                  type="text"
                                                  placeholder="Enter Product Old Price"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='old_price' className='text-red text-sm capitalize' component={'p'} />

                                          </div>

                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  New Price
                                              </label>
                                              <Field
                                                  onInput={(e: any) => e.target.value.replace(/\D/g, '')}

                                                  name="price"
                                                  type="text"
                                                  placeholder="Enter Product Real Price"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='price' className='text-red text-sm capitalize' component={'p'} />

                                          </div>
                                        
                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Size
                                              </label>
                                              <Field
                                                  name="size"
                                                  type="text"
                                                  placeholder="Enter Product size"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='size' className='text-red text-sm capitalize' component={'p'} />

                                          </div>
 
                                          <div className="w-full md:w-1/2 px-6 py-3 ">
                                                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                      Product Images
                                                  </label>
                                              <input
                                                      multiple
                                                      type="file"
                                                  onChange={(e:any) => {
                                                          if (e.target.files) {
                                                              setFieldValue('images', e.target.files)
                                                          }

                                                      }}
                                                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                  />
                                                  <ErrorMessage name='images' className='text-red text-sm capitalize' component={'p'} />

                                              </div>


                                          
                                          <div className=" w-full  px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Product Feature
                                              </label>
                                              <Field
                                              rows={8}
                                              as="textarea"
                                                  name="product_feature"
                                                  type="text"
                                                  placeholder="Enter Product Feature"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='product_feature' className='text-red text-sm capitalize' component={'p'} />

                                          </div>

                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Rating
                                              </label>
                                              <Field
                                                  onInput={(e: any) => e.target.value.replace(/\D/g, '')}
                                                  name="rating"
                                                  type="text"
                                                  placeholder="Enter Product Rating"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='rating' className='text-red text-sm capitalize' component={'p'} />

                                          </div>


                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Pattern
                                              </label>
                                              <Field
                                                  name="patterns"
                                                  type="text"
                                                  placeholder="Enter Product Patterns"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='patterns' className='text-red text-sm capitalize' component={'p'} />

                                          </div>

                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Print Location
                                              </label>
                                              <Field
                                                  name="print_location"
                                                  type="text"
                                                  placeholder="Enter Product Print Location"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='print_location' className='text-red text-sm capitalize' component={'p'} />

                                          </div>

                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Finish
                                              </label>
                                              <Field
                                                  name="finish"
                                                  type="text"
                                                  placeholder="Enter Product finish"
                                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                              <ErrorMessage name='finish' className='text-red text-sm capitalize' component={'p'} />

                                          </div>


                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Tags
                                              </label>



                                              <FieldArray name="tags">
                                                  {({ insert, remove, push }) => (
                                                      <div>
                                                          <div className=" w-full justify-end  ">
                                                              <button
                                                                  className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default text-white bg-black  font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1 cursor-pointer duration-300 transition-all outline-none border-none"
                                                                  type="button"
                                                                  onClick={() => push(' ')}>
                                                                  Add{``}
                                                              </button>

                                                          </div>

                                                          {values.tags.length > 0 &&
                                                              values.tags.map((item: string, index: number) => (
                                                                  <div key={index} className='my-3 px-4 rounded-md py-4 gap-y-4  flex flex-col   '
                                                                  >

                                                                      <div className="flex items-center w-full">
                                                                          <Field
                                                                              type="text"
                                                                              placeholder={`Enter tag ${index + 1}`}
                                                                              className={`w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                                                              name={`tags[${index}]`}
                                                                          />
                                                                          <RiDeleteBin6Line
                                                                              onClick={() => remove(index)}
                                                                              className='text-2xl text-red' />
                                                                      </div>





                                                                  </div>
                                                              ))}

                                                      </div>
                                                  )}
                                              </FieldArray>




                                          </div>

                                          <div className=" w-full md:w-1/2 px-6 py-3 ">
                                              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                  Colors
                                              </label>
                                              


                                              <FieldArray name="colors">
                                                  {({ insert, remove, push }) => (
                                                      <div>
                                                          <div className=" w-full justify-end  ">
                                                                  <button
                                                                      className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default text-white bg-black  font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1 cursor-pointer duration-300 transition-all outline-none border-none"
                                                                      type="button"
                                                                      onClick={() => push(' ')}>
                                                                      Add{``}
                                                                  </button>
                                                            
                                                          </div>

                                                          {values.colors.length > 0 &&
                                                              values.colors.map((item:string, index:number) => (
                                                                  <div key={index} className='my-3 px-4 rounded-md py-4 gap-y-4  flex flex-col   '
                                                                  >
                                                                   
                                                                    <div className="flex items-center w-full">
                                                                          <div className="w-full flex gap-x-4 items-center">
                                                                            
                                                                              <Field
                                                                                  type="color"
                                                                                  placeholder={`Enter Color Code ${index + 1}`}
                                                                                //   className={` rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                                                                  name={`colors[${index}]`}
                                                                              /> 
                                                                              <p style={{backgroundColor:item}} className={`
                                                                              bg-[${item}] text-sm px-3 py-2 rounded-md w-full text-white
                                                                              `}>{item}</p>
                                                                          </div>
                                                                          <RiDeleteBin6Line 
                                                                              onClick={() => remove(index)}
                                                                          className='text-2xl text-red' />
                                                                    </div>
                                                                    

                                                                      


                                                                  </div>
                                                              ))}

                                                      </div>
                                                  )}
                                              </FieldArray>




                                          </div>

                                        
                                        


                                      </div>



                                   

                                      {/*  */}
                                      <SubmitButton className='' title='Add Product' 
                                          loading={AddProductFnResponse.isLoading}
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

export default AddProduct