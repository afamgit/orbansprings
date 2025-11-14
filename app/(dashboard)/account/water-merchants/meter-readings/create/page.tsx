import {AddMeterReadingForm} from '@/app/components/meter-reading-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';
import { prisma } from '@/scripts';
import { auth } from '@/auth';
import { getProfileUser } from '@/app/utils/data';

export const metadata: Metadata = {
  title: 'Create Meter Reading',
};

export default async function Page() {

    const userInfo = await auth()
    const profile = await getProfileUser(userInfo?.user.email || '')
    const userId = profile?.username.toString() || ''

    const meters = await prisma.meters.findMany({
        where: {
            m_assigned_to: userId
        }
    });

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Water Merchants',
                href: '/account/water-merchants',
              },
              {
                label: 'Meter Readings',
                href: '/account/water-merchants/meter-readings',
              },
              {
                label: 'Create Meter Reading',
                href: '/account/water-merchants/meter-readings/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddMeterReadingForm meters={meters} />
        </main>
      )
}
