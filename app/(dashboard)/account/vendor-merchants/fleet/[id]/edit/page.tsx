import { prisma } from '@/scripts';
import { UpdateDriverForm } from '@/app/components/driver-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { getProfileUser } from '@/app/utils/data';
import { UpdateTruckForm } from '@/app/components/truck-form';

export const metadata: Metadata = {
    title: 'Edit truck',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const truck = await prisma.trucks.findUnique({
        where: {
            truckid: parseInt(id)
        }
    })

    const userInfo = await auth()
  
    const profile = await getProfileUser(userInfo?.user.email || "")
  
    const fleet = profile?.id || 1000
   

    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center bg-white'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Vendor Merchant',
            href: '/account/vendor-merchants',
          },
          {
            label: 'Edit truck',
            href: `/account/vendor-merchants/fleet/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateTruckForm truck={truck} fleet={fleet} />
</main>)
}