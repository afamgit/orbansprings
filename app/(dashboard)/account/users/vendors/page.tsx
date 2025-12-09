import { prisma } from '@/scripts'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchUserVendors } from '@/app/utils/data'
import Vendors from '@/app/ui/vendors'
import UsersByNumbers from '@/app/components/users-by-numbers'
import { VendorType } from '@/app/components/vendor-type'

export const metadata: Metadata = {
  title: 'Vendors',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) 
 {
  const {query:queryParams,page, type: typeParams} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  const type = typeParams || "";

      
    const total = await fetchUserVendors(query,type)

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

            <div className='w-full flex justofy-start items-center m-2 p-3'>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users'>Customers</Link>
            <Link className='text-4xl text-gray-400 font-medium px-4' href='/account/users/drivers'>Drivers</Link>
            <Link className='text-4xl text-gray-900 font-medium px-4' href='/account/users/vendors'>Vendors</Link>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/users/merchants'>Merchants</Link>
            </div>

            <div className="w-full rounded-lg border-2 border-gray-200 p-3">
        <div className="w-full md:flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Overall Vendors List</h2>

          <div className="flex justify-center items-center mx-2 px-3">
            <div className="mr-1">
              <VendorType />
            </div>
          </div>
        </div>
        </div>


         <Vendors query={query} currentPage={currentPage} type={type} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}

