import { prisma} from '@/scripts'
import { UpdatePageForm } from '@/app/components/page-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update page',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const page = await prisma.contentpages.findUnique({
        where: {
            cpageid: parseInt(id)
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Pages',
            href: '/account/content-pages',
          },
          {
            label: 'Edit Page',
            href: `/account/content-pages/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdatePageForm page={page} />
</main>
    )

}