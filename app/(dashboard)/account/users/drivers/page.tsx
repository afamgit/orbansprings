import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import {AddTeamForm} from '@/app/components/team-form'
import moment from 'moment'
import { UpdateTeam, DeleteTeam } from '@/app/ui/buttons'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchUserDrivers, fetchUsers } from '@/app/utils/data'
import Teams from '@/app/ui/teams'
import Users from '@/app/ui/users'
import { UserNumbersCard, UserNumbersCardPlain } from '@/app/ui/cards'
import Drivers from '@/app/ui/drivers'

export const metadata: Metadata = {
  title: 'Users',
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

  const groupUsers = await prisma.users.groupBy({
    by: ['role'],
    _count: {id: true} 
    })
      
    const total = await fetchUserDrivers(query)

    const totalBasic = await prisma.users.count({
      where: {subscription_plan: 'Basic', role: 'driver'}
    })

    return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              { label: 'Users', href: '/account/users' },             
               {
                label: 'Drivers',
                href: '/account/users/drivers',
                active: true,
              },
            ]}
            />
            </div>

            <div className='flex justify-between mx-1 px-1 items-center my-5'>
              {groupUsers.filter(item => (item.role !== 'admin' && item.role !== 'iot')).map((item,i) => {

              return (
              <UserNumbersCard num={item._count} name={item.role} key={i} />
              )
            })}
            </div>

            <div className='w-full my-3 py-3'>
              <h2 className='text-3xl'>Overall Drivers List</h2>
            </div>

          <div className='w-full flex justofy-start items-center m-2 p-3'>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users'>Customers</Link>
            <Link className='text-4xl text-gray-900 font-medium px-4' href='/account/users/drivers'>Drivers</Link>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users/merchants'>Merchants</Link>
            </div>

         <Drivers query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}