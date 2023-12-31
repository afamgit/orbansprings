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
import { fetchUserVendors } from '@/app/utils/data'
import Teams from '@/app/ui/teams'
import Users from '@/app/ui/users'
import { UserNumbersCard, UserNumbersCardPlain } from '@/app/ui/cards'
import Vendors from '@/app/ui/vendors'
import UsersByNumbers from '@/app/components/users-by-numbers'

export const metadata: Metadata = {
  title: 'Vendors',
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

      
    const total = await fetchUserVendors(query)

    const totalBasic = await prisma.users.count({
      where: {OR: [{role: 'fleetownerdriver'}, {role: 'fleetownerplumber'}]}
    })

    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              { label: 'Users', href: '/account/users' }, 
                {
                label: 'Vendors',
                href: '/account/vendors',
                active: true,
              },
            ]}
            />
            </div>

            <UsersByNumbers />


            <div className='w-full my-3 py-3'>
              <h2 className='text-3xl'>Overall Vendors List</h2>
            </div>

            <div className='w-full flex justofy-start items-center m-2 p-3'>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users'>Customers</Link>
            <Link className='text-4xl text-gray-400 font-medium px-4' href='/account/users/drivers'>Drivers</Link>
            <Link className='text-4xl text-gray-900 font-medium px-4' href='/account/users/vendors'>Vendors</Link>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users/merchants'>Merchants</Link>
            </div>

         <Vendors query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}

