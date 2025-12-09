import { prisma } from '@/scripts'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchComplaints } from '@/app/utils/data'
import Complaints from '@/app/ui/complaints'

export const metadata: Metadata = {
  title: 'Complaints',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) {
  const {query:queryParams,page} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
      
    const total = await fetchComplaints(query)

    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Complaints',
                href: '/account/complaints',
                active: true,
              },
            ]}
            />
            </div>


         <Complaints query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}