import { AddMeterForm } from '@/app/components/meter-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { prisma } from '@/scripts';

export const metadata: Metadata = {
  title: 'Create Meter',
};

export default async function Page() {
    const customers = await prisma.users.findMany({
        where: {
            role: 'customer'
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
                            label: 'Create Meter',
                            href: '/account/meters/create',
                            active: true,
                        },
                    ]}
                />
            </div>
            <AddMeterForm customers={customers} />
        </main>
    );
}
