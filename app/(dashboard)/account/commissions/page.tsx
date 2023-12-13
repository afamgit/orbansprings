import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchCommissions } from '@/app/utils/data'
import Commissions from '@/app/ui/commissions';

export const metadata: Metadata = {
  title: 'Commissions',
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
      
    const total = await fetchCommissions(query)


    return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Commissions',
                href: '/account/commissions',
                active: true,
              },
            ]}
            />
            </div>



         <Commissions query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}