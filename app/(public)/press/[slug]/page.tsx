import { prisma} from '@/scripts'
import Image from 'next/image';
import moment from 'moment';
import { BsEyeFill } from 'react-icons/bs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Press',
  };

export default async function Page({params}: {params: {slug: string}}) {
    const slug = params.slug;

    const post = await prisma.blog.findFirst({
        where: {
            titleslug: slug
        }
    })

    return (
        <div className='p-3 bg-white'>
        <div className='w-full md:w-[1200px] mx-auto p-3 md:p-5 bg-white'>
            <h3 className='text-xl md:text-3xl mt-7 py-5'>{post?.title}</h3>

            <div className='my-1 py-2 flex justify-start items-start'>
                <div className='flex justify-center items-center text-sm'>
                <BsEyeFill className='mr-2' /> {post?.views} <span className='ml-2'>{moment(post?.createdAt).format('DD/MM/YYYY')}</span>
                </div>
            </div>

            <div className='w-full md:w-4/5 my-2 py=1 flex justify-center items-center'>
            <Image
              height={500}
              width={400}
              src={`https://orbansprings.com/${post?.artphoto}`}
              alt={`${post?.title}`}
              className='rounded-lg'
            />  
                </div>

                <div dangerouslySetInnerHTML={{__html: `${post?.fullcontent}`}} />
            </div>
            </div>
    )

    }