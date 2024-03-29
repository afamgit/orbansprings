import Link from 'next/link'
import { prisma } from '@/scripts'
import Meters from '@/app/ui/meters'
import { fetchMeters } from '@/app/utils/data'
import Pagination from '@/app/ui/pagination';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import CircularProgressBar from '../../../ui/charts/circular-progress-bar';
import { UserType } from '@/app/components/user-type';
import { Status } from '@/app/components/status';

export const metadata: Metadata = {
  title: 'Meters',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    usertype?: string;
    status?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const usertype = searchParams?.usertype || '';
  const status = searchParams?.status || '';

  const installedMeters = await prisma.meters.count({
    where: {m_assigned: 'Yes'}
  })

  const activeMeters = await prisma.meters.count({
    where: {m_status: 'Active'}
  })

  const inactiveMeters = await prisma.meters.count({
    where: {m_status: 'Inactive'}
  })

    const total = await fetchMeters(query, usertype, status)

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
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

            <div className='w-full md:max-w-[900px] mx-auto grid grid-cols-3 gap-6 p-6'>
            <div className='flex flex-col justify-center items-center p-4 border-1 border-gray-200'>
              <h3 className='text-3xl font-bold text-gray-600 my-4 py-3'>Installed Meters</h3>
              <CircularProgressBar num_meters={installedMeters} type='installed' />
            </div>
            <div className='flex flex-col justify-center items-center p-4 border-3 border-red-600'>
              <h3 className='text-3xl font-bold text-gray-600 my-4 py-3'>Active Meters</h3>
              <CircularProgressBar num_meters={activeMeters} type='active' />
            </div>
            <div className='flex flex-col justify-center items-center p-4 border-1 border-gray-200'>
              <h3 className='text-3xl font-bold text-gray-600 my-4 py-3'>Inactive Meters</h3>
              <CircularProgressBar num_meters={inactiveMeters} type='inactive' />
            </div>
            </div>

            <div className="w-full md:flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Overall Meters List</h2>

          <div className="flex justify-center items-center mx-2 px-3">
            <div className="mr-1">
              <Status />
            </div>
            <div>
              <UserType />
            </div>
          </div>
        </div>

    <Meters query={query} currentPage={currentPage} usertype={usertype} status={status} />

    <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>


        </main>
      )
}