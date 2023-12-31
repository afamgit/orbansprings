import { prisma } from '@/scripts';
import { UpdateTestimonialForm } from '@/app/components/testimonial-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit testimonial',
  };

export default async function Testimonial({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const testimonial = await prisma.testimonials.findUnique({
        where: {
            tid: id
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Testimonials',
            href: '/account/testimonials',
          },
          {
            label: 'Edit testimonial',
            href: `/account/testimonials/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateTestimonialForm testimonial={testimonial} />
</main>
)

}