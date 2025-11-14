import { prisma } from '@/scripts';
import { UpdateDriverForm } from '@/app/components/driver-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { getProfileUser } from '@/app/utils/data';

export const metadata: Metadata = {
    title: 'Edit driver',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const driver = await prisma.users.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    const userInfo = await auth()
  
    const profile = await getProfileUser(userInfo?.user.email || "")
  
    const fleet = profile?.id || 1000
   

    const areagroups = await prisma.area_groups.findMany()


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
            label: 'Edit driver',
            href: `/account/vendor-merchants/drivers/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateDriverForm driver={driver} areagroup={areagroups} fleet={fleet} />
</main>)
}