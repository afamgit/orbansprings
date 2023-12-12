import Link from 'next/link'
import { prisma } from '@/scripts'
import Meters from '@/app/ui/meters'
import { fetchMeters } from '@/app/utils/data'
import Pagination from '@/app/ui/pagination';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meters',
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
  
    const total = await fetchMeters(query)
      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Meters',
                href: '/account/meters',
                active: true,
              },
            ]}
            />
            </div>

    <Meters query={query} currentPage={currentPage} />

    <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>


        </main>
      )
}