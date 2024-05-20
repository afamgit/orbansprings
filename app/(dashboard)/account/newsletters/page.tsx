import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchNewsletters } from '@/app/utils/data'
import Newsletters from '@/app/ui/newsletters'

export const metadata: Metadata = {
  title: 'Newsletters',
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
  
    const total = await fetchNewsletters(query)

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Newsletters',
                href: '/account/newsletters',
                active: true,
              },
            ]}
            />
            </div>


         <Newsletters query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}