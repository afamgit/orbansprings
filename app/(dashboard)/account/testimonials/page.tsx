import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import {AddTestimonialForm} from '@/app/components/testimonial-form'
import moment from 'moment'
import { UpdateTestimonial, DeleteTestimonial } from '@/app/ui/buttons'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Testimonials from '@/app/ui/testimonials'
import Pagination from '@/app/ui/pagination'
import { fetchTestimonials } from '@/app/utils/data'

export const metadata: Metadata = {
  title: 'Testimonials',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
const total = await fetchTestimonials(query)

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Testimonials',
                href: '/account/testimonials',
                active: true,
              },
            ]}
            />
            </div>

          
         <Testimonials query={query} currentPage={currentPage} />

         <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>
      </main>
      )
}