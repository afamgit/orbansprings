import { prisma} from '@/scripts'
import Link from 'next/link'
import Image from 'next/image'

export default async function Page() {

    const posts = await prisma.blog.findMany()

    return (
        <div className='p-3 bg-white'>
        <div className='w-full md:w-[1200px] mx-auto flex justify-start items-center flex-wrap'>
        {posts.map((item,i) => {
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
      </div>


    )

    }