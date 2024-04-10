"use client";
import { Form, Formik, ErrorMessage, Field} from 'formik'
import React, { useRef } from 'react'
import SubmitButton from '../reuseable/SubmitButton';
import { IoDocumentTextOutline } from "react-icons/io5";

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useCreateVendorMutation } from '@/provider/redux/query/AdminVendors.query';
const AddVendorPage = () => {

  const [createVendor, createVendorResponse ] = useCreateVendorMutation();

  const fileRef = useRef<any>(null);

  const validationSchema =  yup.object({
    name: yup.string().required("Vandor Name is Required"),
    email: yup.string().email("EMail Must be Valid").required("Email  is Required"),
    mobile_no: yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile No is Required'),
    photo: yup.mixed().required("Vendor Photo is Required"),
    adhar_card: yup.mixed().required("Vendor Adhar Card is Required"),
    agreement: yup.mixed().required("Vendor Agreement is Required"),

  })

    const initialValues = {
      name:'',
      email:'',
      mobile_no:'',
      photo: null,
      adhar_card: null,
      agreement: null,


    }


        const onSubmitHandler =async (e:any,{resetForm}:any)=>{
          try {


                const formData = new FormData();

            formData.append("name", e.name);
            formData.append("email", e.email);
            formData.append("mobile_no", e.mobile_no);
            formData.append("photo", e.photo);
            formData.append("adhar_card", e.adhar_card);
            formData.append("agreement", e.agreement);

            // console.log(e);
            // console.log(formData);

            const { data, error }:any = await createVendor(formData)
            if(error){
              toast.error(error?.data?.message);
              return
            }

            toast.success(data.msg);

            if (fileRef.current) {
              // fileRef.current.reset();
              fileRef.current.value = '';
            }
            resetForm()

                  
          } catch (error:any) {
            toast.error(error.message);
          }
        }

  return (
    <>

      <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}  >
                {({handleSubmit,values,setFieldValue})=>(
                  <>
            <form onSubmit={handleSubmit} className='w-full  md:w-[90%] lg:w-[80%] px-2 py-10 mx-auto'>
              <div className="mb-3">
                <label htmlFor="name">Vendor Name</label>
                <Field name="name" type="text" placeholder='Enter Your Name' className="w-full rounded-md px-4 py-2 border outline-none" />
                <ErrorMessage name='name' component={'p'} className='text-red text-sm' />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Vendor Email</label>
                <Field name="email" type="text" placeholder='Enter Your Email Address' className="w-full rounded-md px-4 py-2 border outline-none" />
                <ErrorMessage name='email' component={'p'} className='text-red text-sm' />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile_no">Vendor Mobile No</label>
                <Field name="mobile_no" type="text" placeholder='Enter Your Mobile No' className="w-full rounded-md px-4 py-2 border outline-none" />
                <ErrorMessage name='mobile_no' component={'p'} className='text-red text-sm' />
              </div>


              <div className="mt-3">
                <h1 className='text-3xl flex items-center gap-x-4'>Documents <IoDocumentTextOutline className='text-xl' /> </h1>
              </div>
              <hr className="h-4 w-full md:w-1/2 mb-2" />
              <div className="mb-3 flex gap-x-4">
                <div className="w-full lg:w-1/2">
                  <label htmlFor="photo">Vendor photo</label>

                  <input  onChange={(e)=>{
                    if (e.target.files) { setFieldValue('photo', e.target.files[0]) }
                  }} type="file" placeholder='Enter Your Mobile No' className="w-full rounded-md px-4 py-2 border outline-none" />
                  <ErrorMessage name='photo' component={'p'} className='text-red text-sm' />

                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <img ref={fileRef} src={values.photo ? URL.createObjectURL(values.photo) : `https://via.placeholder.com/150`} className="w-[100px] h-[100px] border object-cover  overflow-hidden"/>
                </div>
              </div>
                   

              <div className="mb-3 flex  gap-x-4">
                <div className="w-full lg:w-1/2">
                  <label htmlFor="photo">Vendor Adhar Card</label>

                  <input  onChange={(e) => {
                    if (e.target.files) { setFieldValue('adhar_card', e.target.files[0]) }
                  }} type="file"  className="w-full rounded-md px-4 py-2 border outline-none" />
                  <ErrorMessage name='adhar_card' component={'p'} className='text-red text-sm' />

                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <img   ref={fileRef} src={values.adhar_card ? URL.createObjectURL(values.adhar_card) : `https://via.placeholder.com/150`} className="w-[100px] h-[100px] border object-cover  overflow-hidden" />
                </div>
              </div>

              
              <div className="mb-3 flex  gap-x-4">
                <div className="w-full lg:w-1/2">
                  <label htmlFor="photo">Vendor Agreement</label>

                  <input   onChange={(e) => {
                    if (e.target.files) { setFieldValue('agreement', e.target.files[0]) }
                  }} type="file" className="w-full rounded-md px-4 py-2 border outline-none" />
                  <ErrorMessage name='agreement' component={'p'} className='text-red text-sm' />

                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <img ref={fileRef} src={values.agreement ? URL.createObjectURL(values.agreement) : `https://via.placeholder.com/150`} className="w-[100px] h-[100px] border object-cover  overflow-hidden" />
                </div>
              </div>

              <div className="mb-3">
                <SubmitButton title='Submit' loading={createVendorResponse.isLoading}  className='bg-red disabled:bg-green-400' />
              </div>
                              </form>
                  </>
                )}
             {/* <Form className='w-full  md:w-[90%] lg:w-[80%] px-2 py-10 mx-auto'>
             



                    </Form> */}
                  </Formik>

    </>
  )
}

export default AddVendorPage