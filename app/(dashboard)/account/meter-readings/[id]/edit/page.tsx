import { prisma } from '@/scripts';
import { UpdateMeterReadingForm } from '@/app/components/meter-reading-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update meter reading',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const reading = await prisma.meterReadings.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    const meters = await prisma.meters.findMany();

    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Meter Readings',
                href: '/account/meter-readings',
              },
              {
                label: 'Edit meter reading',
                href: `/account/meter-readings/${id}/edit`,
                active: true,
              },
            ]}
            />
            </div>
    
    <UpdateMeterReadingForm reading={reading} meters={meters} />
    </main>
    )

}
