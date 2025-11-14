import {AddMeterReadingForm} from '@/app/components/meter-reading-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';
import { prisma } from '@/scripts';

export const metadata: Metadata = {
  title: 'Create Meter Reading',
};

export default async function Page() {

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
                label: 'Create Meter Reading',
                href: '/account/meter-readings/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddMeterReadingForm meters={meters} />
        </main>
      )
}
