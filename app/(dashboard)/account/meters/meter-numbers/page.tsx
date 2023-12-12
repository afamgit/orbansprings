import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {AddMeterGenerateForm} from '@/app/components/meter-form'
import moment from 'moment'
import Pagination from '../../../../ui/pagination'
import MeterNumbers from '@/app/ui/meter-numbers'
import { fetchMeterNumbers } from '@/app/utils/data'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meter numbers',
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
  
    const total = await fetchMeterNumbers(query)



      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
         <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Meter Numbers',
                href: '/account/meter-numbers',
                active: true,
              },
            ]}
            />
            </div>
            
        <MeterNumbers  query={query} currentPage={currentPage} />

    <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}