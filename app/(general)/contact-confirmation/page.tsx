import {prisma} from '@/scripts'
import Image from 'next/image'
import { ContactForm } from '@/app/components/contact-form'
import { BottomAppBannerHorizontal } from '@/app/components/bottom-app-banner-horizontal'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact form confirmation',
  };

export default async function Page({searchParams}: {searchParams:{msg: string}}) {

  const msg = searchParams.msg

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className='w-full md:max-w-[1200px] mx-auto flex flex-col justify-center items-center p-2 md:p-5'>
        <div className='w-full md:max-w-[900px] mx-auto flex flex-col justify-center items-center'>
        <h1 className='mt-3 py-3 text-sky-600 text-center font-bold text-5xl'>Contact</h1>
      </div>
      
      
      <div className='w-full md:max-w-[1200px] mx-auto md:flex justify-start items-start'>
        <div className='w-full md:w-[800px] flex flex-col justify-start items-start md:w-3/5 rounded-lg p-2'>
          <p className='text-4xl mt-4'>Message sent</p>
          <p className='text-xl my-3'>Thank you! {msg}</p>
        </div>
        <div className='w-full md:w-2/5 flex flex-col justify-center items-center p-5'>
            <div className='w-[350px] my-2 px-4 py-2 flex justify-start items-center bg-white shadow-md rounded'>
                <Image
                    src={`/phone_icon.jpeg`}
                    height={100}
                    width={100}
                    alt='phone'
                />
                <div className='p-2'>
                    <h2 className='font-medium text-2xl'>Phone Number</h2>
                    <p>07081790086</p>
                </div>
            </div>
            <div className='w-[350px] my-2 px-4 py-2 flex justify-start items-center bg-white shadow-md rounded'>
                <Image
                    src={`/email_icon.jpeg`}
                    height={100}
                    width={100}
                    alt='phone'
                />
                <div className='p-2'>
                    <h2 className='font-medium text-2xl'>Email</h2>
                    <p>info@orbansprings.com</p>
                </div>
            </div>
            <div className='w-[350px] my-2 px-4 py-2 flex justify-start items-center bg-white shadow-md rounded'>
                <Image
                    src={`/location_icon.jpeg`}
                    height={100}
                    width={100}
                    alt='address'
                />
                <div className='p-2'>
                    <h2 className='font-medium text-2xl'>Address</h2>
                    <p>07081790086</p>
                </div>
            </div>
        </div>
      </div>
      
      
      </div>


    
<BottomAppBannerHorizontal />

    </div>
  )
}
