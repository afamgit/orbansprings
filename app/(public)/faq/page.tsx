import {prisma} from '@/scripts'
import { BottomAppBannerHorizontal } from '@/app/components/bottom-app-banner-horizontal'
import {Faq} from '@/app/components/faq'
import { Key } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
};

export default async function Page() {
  const questions = await prisma.faqs.findMany()

  return (
    <div className="bg-gray-100">
      <div className='w-full md:max-w-[1200px] mx-auto flex flex-col justify-center items-center'>
      <h1 className='mt-3 py-3 text-sky-600 font-bold text-3xl text-center md:text-5xl'>Frequently Asked Questions</h1>
      <h1 className='my-1 py-1 text-sky-600 font-bold text-3xl text-center md:text-5xl'>{`(FAQs)`}</h1>
      <h3 className='text-xl md:text-2xl my-3 py-3 font-medium'>You have questions? We are here to help.</h3>
      </div>

      <Faq data={questions} />

    
<BottomAppBannerHorizontal />

    </div>
  )
}
