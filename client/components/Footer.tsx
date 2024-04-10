import Link from 'next/link'
import React from 'react'
import { GrLocation } from "react-icons/gr";
import { SiMinutemailer } from "react-icons/si";
import { RiFacebookFill,RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TiSocialPinterest } from "react-icons/ti";
import { ImYoutube } from "react-icons/im";
const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">


              <div>
                <Link href='/' className=" text-4xl md:text-2xl logo-font text-[--text-color1] font-bold"  >MynStars</Link>
                <div className="punch-line text-zinc-500 text-sm">Keep it simple</div>
              </div>
              <p className="text-sm text-heading">Joy brought to you by artists</p>

              <ul className="contact-infor">
                <li className='flex flex-col  py-4'>

                  <p className='inline-flex items-center '>  <GrLocation className='text-xl text-brand' />    <strong className='text-sm font-bold'>Address: </strong></p>
                  <span className='text-sm font-regular'>GPA T G ARTE CONSTRUCTION REP B,SY NO46/4KNO72 AECS Bommanahalli South Bangalore Karnataka - 560068- India

                  </span></li>

                <li className='flex flex-row gap-x-2  py-4'>

                  <p className='inline-flex items-center  '>  <SiMinutemailer className='text-xl text-brand ' />    <strong className='text-sm font-bold'>Email: </strong></p>
                  <span className='text-sm font-regular'>sales@gmail.com

                  </span></li>

              </ul>

            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h4 className="text-xl font-semibold py-2">Company</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Delivery Information</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Support Center</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h4 className="text-xl font-semibold py-2">Company</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Delivery Information</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Support Center</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h4 className="text-xl font-semibold py-2">Company</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Delivery Information</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Support Center</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h4 className="text-xl font-semibold py-2">Install App</h4>
              <p className="wow fadeIn animated">From App Store or Google Play</p>
              <div className=" flex  flex-col md:flex-row  py-4 items-center justify-between gap-x-1">

                <a href="#" className=" w-1/2 md:w-[100%] md:mb-0">
                  <img className="hover:-translate-y-2 object-cover  duration-300 transition-all " src="https://w7.pngwing.com/pngs/34/523/png-transparent-app-store-apple-logo-apple-text-logo-video-game.png" alt="apple-image" />
                </a>
                <a href="#" className=" w-1/2 md:w-[100%]">
                  <img src="https://www.freepnglogos.com/uploads/play-store-logo-png/play-store-logo-nisi-filters-australia-11.png" className='hover:-translate-y-2 duration-300 object-cover transition-all aspect-[4/1.3]' alt="playstore-image" />
                </a>
              </div>
              <p className="">Secured Payment Gateways</p>
              <img className=" transition-all w-[80%] hover:-translate-y-2 duration-300 " src="https://help.zazzle.com/hc/article_attachments/360010513393/Logos-01.png" alt="dasda" />
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <Link href='/' className=" text-4xl md:text-2xl logo-font text-[--text-color1] font-bold"  >MynStars</Link>
            <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© {new Date().getFullYear()}
            </p>
            {/* <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx={4} cy={4} r={2} stroke="none" />
          </svg>
        </a>
      </span> */}
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer