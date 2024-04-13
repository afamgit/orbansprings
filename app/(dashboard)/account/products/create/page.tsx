import {AddProductForm} from '@/app/components/product-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Product',
};

export default async function Page() {

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Products',
                href: '/account/products',
              },
              {
                label: 'Create Product',
                href: '/account/products/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddProductForm />
        </main>
      )
}