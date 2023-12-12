import { prisma } from '@/scripts';
import { UpdateMeterForm } from '@/app/components/meter-form';
import { fetchCustomers } from '@/app/utils/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update meter',
  };

export default async function Team({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const meter = await prisma.meters.findUnique({
        where: {
            meterid: id
        }
    })

    const customers = await fetchCustomers()

    return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
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