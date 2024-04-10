"use client";
import { Form, Formik, ErrorMessage, Field } from 'formik'
import React, { useRef } from 'react'
import SubmitButton from '@/components/reuseable/SubmitButton';
import { IoDocumentTextOutline } from "react-icons/io5";

import * as yup from 'yup';
import { toast } from 'react-toastify';
import BackStripe from '@/components/Breadcrumbs/BackStripe';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetVendorByIdQuery } from '@/provider/redux/query/AdminVendors.query';
import Loader from '@/components/common/Loader';
import { VscVerifiedFilled, VscUnverified } from "react-icons/vsc";
const AddVendorPage = ({ params:{slug} }:{params:{slug:string}}) => {

    
    const { data, isLoading, isError } = useGetVendorByIdQuery({ id: slug })

    const fileRef = useRef<any>(null);


    if (isError){
        return <>
            <BackStripe />

            <h1 className="text-3xl">No Vendor Details</h1>
        </>
    }

    if (isLoading) {
        return <>
                    <Loader/>
        </>
    }

    const validationSchema = yup.object({
        name: yup.string().required("Vandor Name is Required"),
        email: yup.string().email("EMail Must be Valid").required("Email  is Required"),
        mobile_no: yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile No is Required'),
        photo: yup.mixed() ,
        adhar_card: yup.mixed() ,
        agreement: yup.mixed(),

    })

    const initialValues = {
        name: data.name || '',
        email: data.email || '',
        mobile_no: data.mobile_no || '',
        photo: null,
        adhar_card: null,
        agreement: null,


    }


    const onSubmitHandler = (e: any, { resetForm }: any) => {
        try {


            const formData = new FormData();

            formData.append("name", e.name);
            formData.append("email", e.email);
            formData.append("mobile_no", e.mobile_no);
            formData.append("photo", e.photo);
            formData.append("adhar_card", e.adhar_card);
            formData.append("agreement", e.agreement);

            console.log(e);
            console.log(formData);
            if (fileRef.current) {
                // fileRef.current.reset();
                fileRef.current.value = '';
            }
            resetForm()


        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <>
                    <BackStripe  />

            <Breadcrumb pageName={`Vendor Details`} />

                            <div className="bg-white">
                <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}  >
                    {({ handleSubmit, values, setFieldValue }) => (
                        <>
                 
                                <div className="py-6 px-10 flex  justify-center lg:justify-end items-center gap-x-5">
                                <h1 className="flex items-center text-2xl capitalize lg:text-4xl text-zic">
                                    {data.name}
                                    {data.isVerified ? <VscVerifiedFilled className="text-teal-500" />:
                                    <VscUnverified className="text-red" />}
                                </h1>
                                <button type='button' className="px-4 py-2 bg-red text-white rounded-sm">Delete</button>
                                <button type='button' className={`px-4 py-2 ${data.isActive ? 'bg-teal-500' : 'bg-primary'} text-white rounded-sm`}>{data.isActive ? 'inActive' :'Active'}</button>
                                </div>

                            <form onSubmit={handleSubmit} className='w-full   md:w-[90%] lg:w-[80%] px-2 py-10 mx-auto'>
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

                                        <input  onChange={(e) => {
                                            if (e.target.files) { setFieldValue('photo', e.target.files[0]) }
                                        }} type="file" placeholder='Enter Your Mobile No' className="w-full rounded-md px-4 py-2 border outline-none" />
                                        <ErrorMessage name='photo' component={'p'} className='text-red text-sm' />

                                    </div>
                                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                                        <img ref={fileRef} src={values.photo ? URL.createObjectURL(values.photo) : data?.photo?.uri} className="w-[100px] h-[100px] border object-cover  overflow-hidden" />
                                    </div>
                                </div>


                                <div className="mb-3 flex  gap-x-4">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="photo">Vendor Adhar Card</label>

                                        <input   onChange={(e) => {
                                            if (e.target.files) { setFieldValue('adhar_card', e.target.files[0]) }
                                        }} type="file" className="w-full rounded-md px-4 py-2 border outline-none" />
                                        <ErrorMessage name='adhar_card' component={'p'} className='text-red text-sm' />

                                    </div>
                                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                                        <img   ref={fileRef} src={values.adhar_card ? URL.createObjectURL(values.adhar_card) : data?.adhar_card?.uri} className="w-[100px] h-[100px] border object-cover  overflow-hidden" />
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
                                        <img ref={fileRef} src={values.agreement ? URL.createObjectURL(values.agreement) : data?.agreement?.uri} className="w-[100px] h-[100px] border object-cover  overflow-hidden" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <SubmitButton title='Submit' className='bg-red disabled:bg-green-400' />
                                </div>
                            </form>
                        </>
                    )}
         
                </Formik>

                            </div>

        </>
    )
}

export default AddVendorPage