import { prisma } from '@/scripts'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import { fetchMeterReadings } from '@/app/utils/data'
import MeterReadings from '@/app/ui/meter-readings'
import Pagination from '@/app/ui/pagination'
import { FilterMeterReadings } from '@/app/components/filter-meter-readings'

export const metadata: Metadata = {
  title: 'Meter Readings',
};

export default async function Page({searchParams}: {searchParams: any}) {
  const { meterId, date, month, year, page } = await searchParams;
  const currentPage =  Number(page) || 1;
  
  const meters = await prisma.meters.findMany();
  
  const total = await fetchMeterReadings(meterId, date, month, year)

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Meter Readings',
                href: '/account/meter-readings',
                active: true,
              },
            ]}
            />
            </div>

            <div className='w-full flex justify-end items-center my-3'>
              <FilterMeterReadings meters={meters} />
            </div>

            <MeterReadings meterId={meterId} date={date} month={month} year={year} currentPage={currentPage} />

            <Pagination totalPages={total} />
         
        </main>
      )
}
