import Image from 'next/image' 
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
import { fetchUsers } from '@/app/utils/data'
import Teams from '@/app/ui/teams'
import Users from '@/app/ui/users'
import { UserNumbersCard, UserNumbersCardPlain, UserNumbersCardSingle } from '@/app/ui/cards'
import UsersByNumbers from '@/app/components/users-by-numbers'

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
      
    const total = await fetchUsers(query)

    const totalUsers = await prisma.users.count({
      where: {NOT:{role: 'admin'}}
    })
    const totalCustomers = await prisma.users.count({
      where: {role: 'customer'}
    })    
    
    const totalDrivers = await prisma.users.count({
      where: {role: 'driver'}
    })    
    
    const totalVendors = await prisma.users.count({
      where: {OR:[{role: 'plumber'}, {role: 'tank cleaner'}]}
    })    

    const totalMerchants = await prisma.users.count({
      where: {OR:[{role: 'fleetownerdriver'}, {role: 'fleetownerplumber'}]}
    })

    const totalBasic = await prisma.users.count({
      where: {subscription_plan: 'Basic', role: 'customer'}
    })    

    return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Users',
                href: '/account/users',
                active: true,
              },
            ]}
            />
            </div>

            


            <UsersByNumbers />

            <div className='w-full my-3 py-3'>
              <h2 className='text-3xl'>Overall Customers List</h2>
            <div className='my-2 p-2'>
              <UserNumbersCardPlain num={totalBasic} name='Basic Customers' />
            </div>
            </div>

          <div className='w-full flex justofy-start items-center m-2 p-3'>
            <Link className='text-4xl text-gray-900 font-medium' href='/account/users'>Customers</Link>
            <Link className='text-4xl text-gray-400 font-medium px-4' href='/account/users/drivers'>Drivers</Link>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users/merchants'>Merchants</Link>
            </div>

         <Users query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}