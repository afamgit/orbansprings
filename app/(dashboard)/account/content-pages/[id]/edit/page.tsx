import { prisma} from '@/scripts'
import { UpdatePageForm } from '@/app/components/page-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update page',
  };

export default async function Page({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const page = await prisma.contentpages.findUnique({
        where: {
            cpageid: id
        }
    })


    return (
    <main className='w-full flex flex-col justify-center items-center'>
    <div className='w-full flex flex-col justify-start items-start'>
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