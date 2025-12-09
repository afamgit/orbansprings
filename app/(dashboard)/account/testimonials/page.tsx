import { prisma } from '@/scripts'
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
  searchParams?: any;
}) {
  const {query:queryParams,page} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  
const total = await fetchTestimonials(query)

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
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