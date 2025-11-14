import { prisma} from '@/scripts'
import { UpdateAreaGroupForm } from '@/app/components/areagroup-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update Area Group',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const areagroup = await prisma.area_groups.findUnique({
        where: {
            agid: parseInt(id)
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Area Groups',
            href: '/account/areagroups',
          },
          {
            label: 'Edit Area Group',
            href: `/account/areagroups/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateAreaGroupForm areagroup={areagroup} />
</main>
    )

}