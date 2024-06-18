import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';
import { prisma } from '@/scripts';
import { auth } from '@/auth';
import { getProfileUser } from '@/app/utils/data';
import { AddTruckForm } from '@/app/components/truck-form';

export const metadata: Metadata = {
  title: 'Create truck',
};

export default async function Page() {

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const fleet = profile?.id || 1000


      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Vendor Merchants',
                href: '/account/vendor-merchants/trucks',
              },
              {
                label: 'Create truck',
                href: '/account/vendor-merchants/trucks/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddTruckForm fleet={fleet} />
        </main>
      )
}