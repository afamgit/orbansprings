import { prisma} from '@/scripts'
import Image from 'next/image';
import moment from 'moment';
import { BsEyeFill } from 'react-icons/bs';
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: any
  searchParams: any
}

  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const {slug} = await params;

    const thepost = await prisma.articles.findFirst({
        where: {
            titleslug: slug
        },
        select: {mkeys: true, mdesc:true, title:true, author:true}
    })

    return {
      title: thepost?.title,
      description: thepost?.mdesc
    }
  }

  export async function generateStaticParams() {

    const allSlugs = await prisma.articles.findMany({
        orderBy: {createdAt: 'desc'},
        take:3,
        skip: 0,
        select: {
            titleslug: true
        }
    })
    return [allSlugs ]
  }

export default async function Page({params}: {params: any}) {
    const {slug} = await params;

    const post = await prisma.articles.findFirst({
        where: {
            titleslug: slug
        }
    })


    return (
        <div className='p-3 bg-white text-gray-900'>
        <div className='w-full md:w-[1200px] mx-auto p-3 md:p-5 bg-white'>
            <h3 className='text-xl md:text-3xl mt-7 py-5'>{post?.title}</h3>

            <div className='my-1 py-2 flex justify-start items-start'>
                <div className='flex justify-center items-center text-sm'>
                <BsEyeFill className='mr-2 text-sky-300' /> {post?.views} <span className='ml-2'>{moment(post?.createdAt).format('DD/MM/YYYY')}</span>
                </div>
            </div>

            <div className='w-full md:w-4/5 my-2 py=1 flex justify-center items-center'>
            <Image
              height={300}
              width={400}
              src={`${post?.artphoto}`}
              alt={`${post?.title}`}
              className='rounded-lg'
            />  
                </div>

                <div dangerouslySetInnerHTML={{__html: `${post?.fullcontent}`}} />
            </div>
            </div>
    )

    }