import {AddUserForm} from '@/app/components/user-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create user',
};

export default async function Page() {

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Users',
                href: '/account/users',
              },
              {
                label: 'Create user',
                href: '/account/users/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddUserForm />
        </main>
      )
}