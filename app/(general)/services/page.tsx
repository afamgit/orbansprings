import Image from 'next/image'
import { prisma } from '@/scripts'
import { BottomAppBannerHorizontal } from '@/app/components/bottom-app-banner-horizontal'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
};
  
export default async function Page() {

    const services = await prisma.contentpages.findMany({
        where: {
            cpagemenu: 'Service'
        }
    })

  return (
    <div className="bg-gray-100">
      <div className='max-w-[1200px] mx-auto flex flex-col justify-center items-center'>
              <h1 className='my-3 py-3 text-sky-600 font-bold text-5xl'>Services</h1>
      <h3 className='text-xl my-2 py-2 font-medium'>These are the services Orban Springs provides</h3>

      {services.map((item,i) => {
        return (
            <div key={i} className='md:flex justify-center items-center my-2 p-3'>
                <div className='w-72 h-72 shrink-0'>
                    <Image
                        src={`/${item.cpagephoto}`}
                        width={300}
                        height={300}
                        alt={`${item.cpagename}`}
                    />
                </div>
                <div className='p-3 md:p-5'>
                <h1 className='my-1 py-1 text-blue-800 font-bold text-2xl'>{item.cpagename}</h1>
                    <p className='text-xl'>{item.cpagecontent}</p>
                </div>
            </div>
        )
      })}
            </div>



      <BottomAppBannerHorizontal />

    </div>
  )
}
