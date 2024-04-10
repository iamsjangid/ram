"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import LoginPerson from "@/components/assets/LoginPerson";
import { MdOutlineMail } from "react-icons/md"; 
import { CiLock } from "react-icons/ci";
import { PiPasswordThin } from "react-icons/pi";
import {Formik,Form,Field,ErrorMessage} from 'formik'
import  * as yup from 'yup'
import { loginDetails } from "@/provider/redux/types";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/provider/redux/query/Auth.query";
import { LOCALSTORAGEKEY } from "@/constant";
import { useRouter } from "next/navigation";

 

const SignIn: React.FC = () => {

      const router = useRouter()
      const [Loginuser,LoginUserResponse] = useLoginUserMutation();

  const initialValues:loginDetails= {
    email:'',
    password:'',
    passkey:''
  }

  const validationSchema = yup.object({
    email: yup.string().email("email must valid").required("email is requried"),
    password: yup.string().required("password is requried"),
    passkey: yup.number().required("passkey is requried"),
  })


  const onSubmitHandler = async(e:loginDetails,{resetForm}:any)=>{
          try {
            const { data,error}:any = await Loginuser(e);
                if(error){
                  toast.error(error?.data?.message);
                  return
                }

                toast.success(data.msg);

            localStorage.setItem(LOCALSTORAGEKEY,data.token);

            router.push("/");

          } catch (error:any) {
                toast.error(error.message)
          }
  }

  return ( 
        <>
        
      {/* <Breadcrumb pageName="Sign In" /> */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                {/* <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                /> */}
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <span className="mt-15 inline-block">
                  <LoginPerson/>
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to TailAdmin
              </h2>
              <Formik initialValues={initialValues} onSubmit={onSubmitHandler } validationSchema={validationSchema} >

                <Form>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <Field
                      name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <MdOutlineMail className="text-xl" />
                      </span>
                    </div>
                    <ErrorMessage name='email' className="text-sm text-red" component={'p'}  />
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Re-type Password
                    </label>
                    <div className="relative">
                      <Field
                        name="password"
                        type="password"
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <CiLock className="text-xl" />
                      </span>
                    </div>
                    <ErrorMessage name='password' className="text-sm text-red" component={'p'} />

                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Enter Passkey
                    </label>
                    <div className="relative">
                      <Field
                         name="passkey"
                        type="text"
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <PiPasswordThin className="text-xl" />
                      </span>
                    </div>
                    <ErrorMessage name='passkey' className="text-sm text-red" component={'p'} />

                  </div>
                  <div className="mb-5">
                    <button
                      disabled={LoginUserResponse.isLoading}
                      type="submit" 
                      className="w-full disabled:bg-blue-500 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >Sign In</button>
                  </div>

                </Form>
                      </Formik>



            </div>
          </div>
        </div>
      </div> 
        </>
  );
};

export default SignIn;
