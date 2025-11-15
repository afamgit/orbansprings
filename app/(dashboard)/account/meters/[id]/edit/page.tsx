import { prisma } from '@/scripts';
import { UpdateMeterForm } from '@/app/components/meter-form';
import { fetchCustomers } from '@/app/utils/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update meter',
  };

export default async function Meters({params}: {params: any}) {
    const {id} = await params;

    const meter = await prisma.meters.findUnique({
        where: {
            meterid: parseInt(id)
        }
    })

    const customers = await prisma.users.findMany({
      where : {
          role: 'watermerchant'
      },
      select: {
          username: true,
          name: true
      }
  });

    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Meters',
                href: '/account/meters',
              },
              {
                label: 'Edit meter',
                href: `/account/meters/${id}/edit`,
                active: true,
              },
            ]}
            />
            </div>
    
    <UpdateMeterForm meter={meter} customers={customers} />
    </main>
    )

}