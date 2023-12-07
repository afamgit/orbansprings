import Image from 'next/image'
import {prisma} from '@/scripts'
import {HomeServices} from '../components/home-services'
import {Testimonials} from '../components/testimonials'
import {BottomAppBanner} from '../components/bottom-app-banner'
import Link from 'next/link'
import { authOptions } from '../utils/auth'
import { auth } from "../../auth"
// import { getServerSession } from "next-auth/next"



const gettingStarted = [
  {name: 'Download our app',
  image: '/get_started_1.jpeg'
},
{name: 'Set up app',
image: '/get_started_2.jpeg'
},
{name: 'Start making orders',
image: '/get_started_3.jpeg'
},
{name: 'Get our meter',
image: '/get_started_4.jpeg'
},
]

export default async function Home() {

  const blogs = await prisma.blog.findMany({
    orderBy: {createdAt: 'desc'},
    skip: 0,
    take: 3
    })
    
  const partners = await prisma.contentpages.findMany({
    where: {cpagemenu: 'Partner'}
  })
  const datatest = await prisma.testimonials.findMany()


  return (
    <div className="bg-gray-100">
        <div
    className="bg-[url('/running_water_bg.jpg')] bg-center h-[500px] md:h-screen w-full" style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
  >
    <div className='relative flex justify-center items-center'>
      <div className='absolute top-[100px] left-[40px] w-4/5 md:top-[200px] md:left-[150px] md:w-[700px] text-white bg-black bg-opacity-20 p-3 md:p-7 rounded'>
        <h1 className='text-3xl md:text-5xl text-white'>Clean & Affordable Water</h1>
        <h1 className='text-3xl md:text-5xl  py-1'>At Your Finger Tips</h1>
        <p className='text-sm md:text-xl py-2'>Get water, when you need it! Efficient potable water delivery service at your fingertips.</p>
        <button className="py-3 px-6 my-4 rounded bg-blue-800 text-white">
          Download App
        </button>
      </div>
    </div>
  </div>
      <div className="py-5">
         <HomeServices />
      </div>

      <div className='py-3 md:p-6 bg-white'>
        <div className='py-3 bg-white w-full max-w-[1200px] mx-auto'>
        <h1 className='my-4 py-3 text-center text-3xl md:text-5xl'>How to get started</h1>

        <div className='flex justify-center items-center'>
        <div className='md:flex'>

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

      <div className='bg-gray-200 p-8'>
        <h1 className='text-5xl text-center my-3 py-3'>Press</h1>
        <div className='w-full md:w-[1200px] mx-auto flex justify-start items-center flex-wrap'>
        {blogs.map((item,i) => {
          return (
            <Link href={`/press/${item.titleslug}`} key={i} className='w-full md:w-1/3 gap-2 p-3'>
              <Image
            key={i}
              height={500}
              width={400}
              src={`https://orbansprings.com/${item.artphoto}`}
              alt={item.title}
              className='rounded-lg'
            />
            <h3 className='text-2xl my-1 py-2'>{item.title}</h3>
              </Link>
          )
        })}
      </div>

      <div className='p-3 md:p-5'>
        <h1 className='text-5xl text-center my-3 py-3'>Our Partners</h1>
        <div className='w-full md:w-[1200px] mx-auto flex justify-center items-center flex-wrap'>
        {partners.map((item,i) => {          
          return <div className='p-1 m-1 flex flex-col justify-center items-center md:p-3 md:m-3 bg-blue-900 rounded-lg' key={i}>
            <h3 className='font-bold text-white'>{item.cpagename}</h3>
        </div>
        })}
      </div>
      </div>

<div className='my-5'>
  <BottomAppBanner />
  </div>

      </div>
    </div>
  )
}
