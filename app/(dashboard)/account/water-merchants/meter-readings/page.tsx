import { prisma } from '@/scripts'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import { fetchMeterReadings } from '@/app/utils/data'
import MeterReadings from '@/app/ui/meter-readings'
import Pagination from '@/app/ui/pagination'
import { FilterMeterReadings } from '@/app/components/filter-meter-readings'
import { auth } from '@/auth'
import { getProfileUser } from '@/app/utils/data'

export const metadata: Metadata = {
  title: 'Meter Readings',
};

export default async function Page({searchParams}: {searchParams: any}) {
  const { meterId, date, month, year, page } = await searchParams;
  const currentPage =  Number(page) || 1;

  const userInfo = await auth()
  const profile = await getProfileUser(userInfo?.user.email || '')
  const userId = profile?.username.toString() || ''
  
  const meters = await prisma.meters.findMany({
    where: {
        m_assigned_to: userId
    }
  });
  
  const total = await fetchMeterReadings(meterId, date, month, year, userId)

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Water Merchants',
                href: '/account/water-merchants',
              },
              {
                label: 'Meter Readings',
                href: '/account/water-merchants/meter-readings',
                active: true,
              },
            ]}
            />
            </div>

            <div className='w-full flex justify-end items-center my-3'>
              <FilterMeterReadings meters={meters} />
            </div>

            <MeterReadings meterId={meterId} date={date} month={month} year={year} currentPage={currentPage} userId={userId} />

            <Pagination totalPages={total} />
         
        </main>
      )
}
