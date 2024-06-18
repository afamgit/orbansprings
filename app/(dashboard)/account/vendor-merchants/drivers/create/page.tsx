import {AddDriverForm} from '@/app/components/driver-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';
import { prisma } from '@/scripts';
import { auth } from '@/auth';
import { getProfileUser } from '@/app/utils/data';

export const metadata: Metadata = {
  title: 'Create driver',
};

export default async function Page() {

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const fleet = profile?.id || 1000


  const areagroups = await prisma.area_groups.findMany()

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Vendor Merchants',
                href: '/account/vendor-merchants/drivers',
              },
              {
                label: 'Create driver',
                href: '/account/vendor-merchants/drivers/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddDriverForm areagroup={areagroups} fleet={fleet} />
        </main>
      )
}