import {AddAreaGroupForm} from '@/app/components/areagroup-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Area Group',
};

export default async function Page() {

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Area Groups',
                href: '/account/areagroups',
              },
              {
                label: 'Create Area Group',
                href: '/account/areagroups/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddAreaGroupForm />
        </main>
      )
}