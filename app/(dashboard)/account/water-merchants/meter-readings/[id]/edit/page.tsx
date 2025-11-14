import { prisma } from '@/scripts';
import { UpdateMeterReadingForm } from '@/app/components/meter-reading-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { getProfileUser } from '@/app/utils/data';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Update meter reading',
  };

export default async function Page({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const userInfo = await auth()
    const profile = await getProfileUser(userInfo?.user.email || '')
    const userId = profile?.username.toString() || ''

    const reading = await prisma.meterReadings.findUnique({
        where: {
            id: id
        },
        include: {
            meter: true
        }
    })

    if(reading?.meter.m_assigned_to !== userId) {
        redirect('/account/water-merchants/meter-readings')
    }

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
                label: 'Edit meter reading',
                href: `/account/water-merchants/meter-readings/${id}/edit`,
                active: true,
              },
            ]}
            />
            </div>
    
    <UpdateMeterReadingForm reading={reading} meters={meters} />
    </main>
    )

}
