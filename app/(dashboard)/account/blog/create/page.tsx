import {AddBlogForm} from '@/app/components/blog-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add article',
};

export default async function Page() {

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Blog',
                href: '/account/blog',
              },
              {
                label: 'Add article',
                href: '/account/blog/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddBlogForm />
        </main>
      )
}