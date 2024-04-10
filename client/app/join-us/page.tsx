"use client";
import { useApplyVendorMutation } from '@/redux/queries/PublicApi.query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { toast } from 'react-toastify'

import * as yup from 'yup'
import { CgSpinner } from 'react-icons/cg'

const JoinPage = () => {

  const [ApplyVendor, ApplyVendorResponse] = useApplyVendorMutation()

  // /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/


  const validationSchema = yup.object({
    name:yup.string().required("Name is Required"),
    email:yup.string().required("Email ID is Required"),
    type: yup.string()
    .oneOf(['supplier', 'designer'], 'Type must be either "supplier" or "designer"')
    .required('Type is required'),
    mobile: yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number format')
    .required('Mobile number is required'),
    gst:yup.string()
    .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid GST number format')
    .required('GST number is required'),
  })

      const initalValues = {
        name:'',
        email:'',
        mobile:'',
        gst:'',
        type:''
        

      }

  const onSubmitHandler=async(e:any,{resetForm}:any)=>{
    try{
      const { data,error }:any = await ApplyVendor(e)

      if(error){
        toast.error(error.data.message);
        return
      }

      toast.success(data.msg)

            resetForm()
    }catch(e:any){
      toast.error(e.message)
    }
  }


  return (
    <>
      <Formik initialValues={initalValues} onSubmit={onSubmitHandler} validationSchema={validationSchema} > 
        <Form className="w-full lg:w-[60%] poppins-regular mx-auto flex flex-col gap-y-4 bg-white shadow p-10  min-h-[60vh]">
          <div className="mb-3">
            <h1 className="text-3xl  poppins-light text-center select-none">Join Us</h1>
          </div>
          <div className="mb-3 ">
            <label htmlFor="name" className='poppins-regular'>Name</label>
            <Field name="name" id="name" type="text" className="w-full border outline-none rounded poppins-regular py-2 px-4 my-1 placeholder:text-zinc-400" placeholder='Enter Your Name' />
            <ErrorMessage name='name' component={'p'}  className='text-red-500 text-sm' />
          </div>
          <div className="mb-3 ">
            <label htmlFor="email" className='poppins-regular'>Email</label>
            <Field name="email" id="email" type="text" className="w-full border outline-none rounded poppins-regular py-2 px-4 my-1 placeholder:text-zinc-400" placeholder='Enter Your Email' />
            <ErrorMessage name='email' component={'p'} className='text-red-500 text-sm' />
          </div>
          <div className="mb-3 ">
            <label htmlFor="mobile" className='poppins-regular'>Mobile No</label>
            <Field name="mobile" id="mobile" type="text" className="w-full border outline-none rounded poppins-regular py-2 my-1 px-4 placeholder:text-zinc-400" placeholder='Enter Your Mobile No' />
            <ErrorMessage name='mobile' component={'p'} className='text-red-500 text-sm' />
          </div>
          <div className="mb-3 ">
            <label htmlFor="type" className='poppins-regular'>Vendor Type</label>
            <Field as="select" name="type" id="type"  className="w-full border outline-none rounded poppins-regular my-1 py-2 px-4 placeholder:text-zinc-400" placeholder='Enter Your Mobile No' >
                <option value="">Select</option>
                <option value="supplier">Supplier</option>
                <option value="designer">Designer</option>
            </Field>
            <ErrorMessage name='type' component={'p'} className='text-red-500 text-sm' />
          </div>

          <div className="mb-3 ">
            <label htmlFor="gst" className='poppins-regular'>GST No.</label>
            <Field name="gst" id="gst" type="text" className="w-full border outline-none rounded poppins-regular py-2 px-4 my-1 placeholder:text-zinc-400" placeholder='XXXXXXXXXXXX' />
            <ErrorMessage name='gst' component={'p'} className='text-red-500 text-sm' />
          </div>

        <div className="mb-3">
            <button type="submit" disabled={ApplyVendorResponse.isLoading} className="bg-blue-500 w-full py-3 rounded text-white">
              {ApplyVendorResponse.isLoading ? <CgSpinner className='animate-spin text-xl'/>: 'Submit'}
            </button>
        </div>

        </Form>
      </Formik>
    </>
  )
}

export default JoinPage