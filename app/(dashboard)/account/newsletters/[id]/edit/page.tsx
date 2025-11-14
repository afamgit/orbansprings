import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';
import { prisma } from '@/scripts';
import { UpdateNewsletterForm } from '@/app/components/newsletter-form';

export const metadata: Metadata = {
  title: 'Edit newsletter',
};

export default async function Newsletter({params}: {params: any}) {
  const {id} = await params;

  const newsletterItem = await prisma?.newsletter_body.findUnique({
      where: {
          nlb_id: parseInt(id)
      }
  })

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Newsletters',
                href: '/account/newsletters',
              },
              {
                label: 'Edit newsletter',
                href: '/account/newsletters/create',
                active: true,
              },
            ]}
            />
            </div>

            <div className='w-full md:w-[1000px] flex justify-start items-start'>

         <UpdateNewsletterForm newsletter={newsletterItem} />
         </div>
        </main>
      )
}