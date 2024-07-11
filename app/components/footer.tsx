'use client'

import { useState } from "react";
import Link from "next/link";
import { NewsletterSignup } from './newsletter-sign-up-form'
import {FaCopyright, FaEnvelope, FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import {AiFillPhone} from 'react-icons/ai'
import Image from 'next/image'
import moment from "moment";

const Footer = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row p-5">
        <div className="basis-2/5">
        <div
          className="p-1"
        >
          <Image src='/logo_dark_bg.jpeg' height={100} width={200} alt="logo" />
        </div>

        <p>About Orban Springs</p>
          <NewsletterSignup />
        
        </div>
        <div className="basis-1/5 my-3">
        <h4 className='text-3xl'>Quick Links</h4>
        <ul>
          <li className='my-1 py-1'><Link href='/'>Home</Link></li>
          <li className='my-1 py-1'><Link href='/services'>Services</Link></li>
          <li className='my-1 py-1'><Link href='/about'>About</Link></li>
          <li className='my-1 py-1'><Link href='/faq'>FAQ</Link></li>
          <li className='my-1 py-1'><Link href='/contact'>Contact</Link></li>
          <li className='my-1 py-1'><Link href='/press'>Press</Link></li>
        </ul>

        </div>
        <div className="basis-1/5 md:px-2 my-3">
        <h4 className='text-3xl'>Contact</h4>
        <div className='flex my-1 py-1 items-center'>
        <AiFillPhone className='mr-2' />

          07081790086
        </div>
        <div className='flex my-1 py-1 items-center'>
          <FaEnvelope className='mr-2' />
          info@orbansprings.com
        </div>

             
        </div>
        <div className="basis-1/5 md:px-2 my-3">
            <h4 className='text-3xl'>Socials</h4>
            <Link href='/'><div className='flex items-center my-1 py-1'><FaFacebook className='mr-1 text-2xl' />Facebook</div></Link>
            <Link href='/'><div className='flex items-center my-1 py-1'><FaInstagram className='mr-1 text-2xl' />Instagram</div></Link>
            <Link href='/'><div className='flex items-center my-1 py-1'><FaTwitter className='mr-1 text-2xl' />Twitter</div></Link>
          </div>
      </div>
      <hr className='max-w-[1200px] mx-auto py-3' />
      <div className="w-[1200px] mx-auto flex justify-between">
        <div className="flex items-center mb-2">
        <div className='flex items-center mx-2'>Copyright <FaCopyright className="pl-2" size={24} /> {moment().format('YYYY')}</div>
            <Link href='/page/terms-of-service'><div className='flex items-center mx-2 py-1'>Terms of service</div></Link>
            <Link href='/page/privacy-policy'><div className='flex items-center mx-2 py-1'>Privacy policy</div></Link>
        </div>
            <a href="https://justwebservices.com" target="_blank"><div className='flex items-center my-1 py-1'>Developed by Just Web Services</div></a>
          </div>
    </div>
  );
};
export default Footer;
