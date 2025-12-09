import { prisma}from '@/scripts'
import Image from 'next/image';
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
    const {content} = await params;

    const thepage = await prisma.contentpages.findFirst({
        where: {
            cpagelinkname: content
        },
        select: {cpagename: true, cpagecontent:true}
    })

    return {
      title: thepage?.cpagename,
      description: thepage?.cpagecontent
    }
  }

  export async function generateStaticParams() {

    const allcontents = await prisma.contentpages.findMany({
        orderBy: {createdAt: 'desc'},
        take:3,
        skip: 0,
        select: {
            cpagelinkname: true
        }
    })
    return [allcontents ]
  }

export default async function Page({params}: {params: any}) {
    const {content} = await params;

    const post = await prisma.contentpages.findFirst({
        where: {
            cpagelinkname: content
        }
    })


    return (
        <div className='p-3 bg-white text-gray-900'>
        <div className='w-full md:w-[1200px] mx-auto p-3 md:p-5 bg-white'>
            <h3 className='text-xl md:text-3xl mt-7 py-5'>{post?.cpagename}</h3>


            {post?.cpagephoto !== ''  && post?.cpagephoto !== null && post?.cpagephoto !== 'undefined' && <div className='w-full md:w-4/5 my-2 py=1 flex justify-center items-center'>
            <Image
              height={300}
              width={400}
              src={`https://support.orbansprings.com/${post?.cpagephoto}`}
              alt={`${post?.cpagename}`}
              className='rounded-lg'
            />  
                </div>}

                <div dangerouslySetInnerHTML={{__html: `${post?.cpagecontent}`}} />
            </div>
            </div>
    )

    }