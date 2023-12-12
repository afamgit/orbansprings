import {AddTestimonialForm} from '@/app/components/testimonial-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create testimonial',
};

export default async function Page() {

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Testimonials',
                href: '/account/testimonials',
              },
              {
                label: 'Create testimonial',
                href: '/account/testimonials/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddTestimonialForm />
        </main>
      )
}