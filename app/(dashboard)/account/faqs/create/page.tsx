import {AddFaqForm} from '@/app/components/faq-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create question',
};

export default async function Page() {

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'FAQs',
                href: '/account/faqs',
              },
              {
                label: 'Create Question',
                href: '/account/faqs/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddFaqForm />
        </main>
      )
}