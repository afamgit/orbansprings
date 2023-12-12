import {AddPageForm} from '@/app/components/page-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create page',
};

export default async function Page() {

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Pages',
                href: '/account/content-pages',
              },
              {
                label: 'Create Page',
                href: '/account/content-pages/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddPageForm />
        </main>
      )
}