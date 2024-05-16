import { prisma} from '@/scripts'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press',
};

export default async function Page() {

    const posts = await prisma.articles.findMany()

    return (
        <div className='p-3 bg-white text-gray-900'>
        <div className='w-full md:w-[1200px] mx-auto flex justify-start items-center flex-wrap'>
        {posts.map((item,i) => {

          return (
            <Link href={`/press/${item.titleslug}`} key={i} className='w-full md:w-1/3 gap-2 p-3'>
              <div className='overflow-y-hidden md:h-[300px]'>
              <Image
            key={i}
              height={550}
              width={400}
              src={`${item.artphoto}`}
              alt={item.title}
              className='rounded-lg h-[400px]'
            /></div>
            <h3 className='text-2xl my-1 py-2'>{item.title}</h3>
              </Link>
          )
        })}
      </div>
      </div>


    )

    }