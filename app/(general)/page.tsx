import Image from 'next/image'
import {prisma} from '@/scripts'
import {HomeServices} from '../components/home-services'
import {Testimonials} from '../components/testimonials'
import {BottomAppBanner} from '../components/bottom-app-banner'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache';

import { Metadata } from 'next'
import { BsArrowUpRight, BsEyeFill } from 'react-icons/bs'
import moment from 'moment'
import gettingStarted1 from '../../public/get_started_1.jpeg'
import gettingStarted2 from '../../public/get_started_2.jpeg'
import gettingStarted3 from '../../public/get_started_3.jpeg'
import gettingStarted4 from '../../public/get_started_4.jpeg'

export const metadata: Metadata = {
  title: 'Home',
};

const gettingStarted = [
  {name: 'Download our app',
  image: '/get_started_1.png'
},
{name: 'Set up app',
image: '/get_started_2.png'
},
{name: 'Start making orders',
image: '/get_started_3.png'
},
{name: 'Get our meter',
image: '/get_started_4.png'
},
]

export default async function Home() {
  
noStore()
  const blogs = await prisma.articles.findMany({
    orderBy: {createdAt: 'desc'},
    skip: 0,
    take: 3
    })
    
  const partners = await prisma.contentpages.findMany({
    where: {cpagemenu: 'Partner'}
  })
  const datatest = await prisma.testimonials.findMany()


  return (
    <div className="bg-gray-100 w-full">
        <div
    className="bg-[url('/running_water_bg.jpg')] bg-center h-[500px] md:h-screen w-full" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
  >
    <div className='relative flex justify-center items-center'>
      <div className='absolute top-[100px] left-[40px] w-4/5 md:top-[200px] md:left-[150px] md:w-[700px] text-white bg-black bg-opacity-20 p-3 md:p-7 rounded'>
        <h1 className='text-3xl md:text-5xl text-white'>Clean & Affordable Water</h1>
        <h1 className='text-3xl md:text-5xl  py-1'>At Your Finger Tips</h1>
        <p className='text-sm md:text-xl py-2'>Get water, when you need it! Efficient potable water delivery service at your fingertips.</p>
        
        <div className='mt-3'>
          <Link
              className="py-3 px-6 my-4 rounded bg-blue-800 text-white"
              href="#downloadapp"
            >
              Download App
            </Link>
            </div>
      </div>
    </div>
  </div>
      <div className="py-5">
         <HomeServices />
      </div>

      <div className='py-3 md:p-6 bg-white'>
        <div className='py-3 bg-white w-full md:max-w-[1200px] mx-auto'>
        <h1 className='my-4 py-3 text-gray-800  text-center text-3xl md:text-5xl'>How to get started</h1>

        <div className='flex justify-center items-center'>
        <div className='md:flex md:grid md:grid-cols-4'>

        {gettingStarted.map((item,i) => {
          return (
            <Image
            key={i}
              height={300}
              width={300}
              src={item.image}
              alt={item.name}
            />
          )
        })}
        </div>
        </div>
        </div>
      </div>
      <div className='bg-sky-500 p-8'>
        <h1 className='text-5xl text-center my-3 py-3 text-white'>What our customers say</h1>
        
        <Testimonials  data={datatest}/>


      </div>

      <div className='bg-gray-200 p-8 text-gray-900'>
        <h1 className='text-5xl text-center text-gray-800 my-3 py-3'>Press</h1>
        <div className='w-full md:max-w-[1200px] mx-auto flex justify-start items-center flex-wrap'>
        {blogs.map((item,i) => {
            let imgSrc = item.artphoto?.includes('images') ? `https://orbansprings.com/${item.artphoto}` : `${item.artphoto}`

          return (
            <Link href={`/press/${item.titleslug}`} key={i} className='w-full md:flex gap-2 p-3'>
                <div className='w-full md:w-1/5'>
                <Image
            key={i}
              height={200}
              width={300}
              src={`${imgSrc}`}
              alt={item.title}
              className='rounded-lg'
            />
                </div>
                <div className='w-full md:w-4/5 mt-2 p-2 md:p-5'>
                <h3 className='text-xl text-gray-800 md:text-3xl'>{item.title}</h3>

            <div className='my-1 py-2 flex justify-start items-start'>
                <div className='flex justify-center items-center text-sm'>
                <BsEyeFill className='mr-2 text-sky-300' /> {item.views} <span className='ml-2'>{moment(item.createdAt).format('DD/MM/YYYY')}</span>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{__html: `${item.fullcontent.split(' ',75).join(' ')}`}} />

            <p className='text-sky-400 font-bold text-xl flex items-center'>Read more <BsArrowUpRight size={18} className='text-sm' /></p>

                </div>
              </Link>
          )
        })}
      </div>

      <div className='p-3 md:p-5'>
        <h1 className='text-5xl text-center my-3 py-3 text-gray-800'>Our Partners</h1>
        <div className='w-full md:max-w-[1200px] mx-auto flex justify-center items-center flex-wrap'>
        {partners.map((item,i) => {          
          return <div className='p-1 m-1 flex flex-col justify-center items-center md:p-3 md:m-3 bg-blue-900 rounded-lg' key={i}>
            <h3 className='font-bold text-white'>{item.cpagename}</h3>
        </div>
        })}
      </div>
      </div>

<div className='my-5' id='downloadapp'>
  <BottomAppBanner />
  </div>

      </div>
    </div>
  )
}
