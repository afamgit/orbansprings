import Image from 'next/image'
import {prisma} from '@/scripts'
import {HomeServices} from '../components/home-services'
import {Testimonials} from '../components/testimonials'
import {BottomAppBanner} from '../components/bottom-app-banner'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache';
import { getArticlePhotoUrl } from '@/app/utils/utils'

import { Metadata } from 'next'
import { BsArrowUpRight, BsEyeFill } from 'react-icons/bs'
import moment from 'moment'

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
  <div className="relative h-[600px] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-slate-900">
    <div 
      className="absolute inset-0 bg-[url('/running_water_bg.jpg')] bg-cover bg-center opacity-70"
      style={{ backgroundRepeat: 'no-repeat' }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent" />
    
    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8 z-10">
      <div className="max-w-[650px] bg-slate-900/20 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-6 uppercase tracking-wider">
          💧 Smart Water Solutions
        </span>
        <h1 className="text-4xl md:text-6xl text-white font-extrabold tracking-tight leading-tight mb-4">
          Clean & Affordable <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">Water</span> At Your Fingertips
        </h1>
        <p className="text-lg text-slate-200 mb-8 font-light leading-relaxed">
          Get water, when you need it! Efficient, potable water delivery services powered by real-time IoT technology.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link
            className="py-4 px-8 rounded-xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
            href="#downloadapp"
          >
            Download App
          </Link>
          <Link
            className="py-4 px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            href="/services"
          >
            Our Services
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
        <div className='md:flex md:grid-cols-4'>

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

          return (
            <Link href={`/press/${item.titleslug}`} key={i} className='w-full md:flex gap-2 p-3'>
                <div className='w-full md:w-1/5'>
                <Image
            key={i}
              height={200}
              width={300}
              src={`${getArticlePhotoUrl(item.artphoto)}`}
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
