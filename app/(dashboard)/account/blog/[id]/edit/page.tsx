import {UpdateBlogForm} from '@/app/components/blog-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';
import { prisma } from '@/scripts';

export const metadata: Metadata = {
  title: 'Edit article',
};

export default async function Blog({params}: {params: any}) {
  const {id} = params;

  const blogItem = await prisma?.articles.findUnique({
      where: {
          artid: parseInt(id)
      }
  })

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Article',
                href: '/account/blog',
              },
              {
                label: 'Edit article',
                href: '/account/blog/create',
                active: true,
              },
            ]}
            />
            </div>

            <div className='w-full md:w-[1000px] flex justify-start items-start'>

         <UpdateBlogForm blog={blogItem} />
         </div>
        </main>
      )
}