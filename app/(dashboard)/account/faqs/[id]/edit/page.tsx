import { prisma} from '@/scripts'
import { UpdateFaqForm } from '@/app/components/faq-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update question',
  };

export default async function Page({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const faq = await prisma.faqs.findUnique({
        where: {
            faqid: id
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'FAQs',
            href: '/account/faqs',
          },
          {
            label: 'Edit Question',
            href: `/account/faqs/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateFaqForm faq={faq} />
</main>
    )

}