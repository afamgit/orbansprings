
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchDriversCommissions, fetchUserDrivers, fetchUsers } from '@/app/utils/data'
import Drivers from '@/app/ui/drivers'
import { ExpectedCommission } from '@/app/ui/cards'
import { prisma } from '@/scripts'
import DriversComissions from '@/app/ui/drivers-commissions'
import { FilterDate } from '@/app/components/filter-date'

export const metadata: Metadata = {
  title: 'Commissions',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    fType?: string;
    fSubType?: string
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const fType = searchParams?.fType || '';
  const fSubType = searchParams?.fSubType || '';

      
  const totalCommissions = await prisma?.transactions.aggregate({
    where: {req_type: 'Water packages'},
    _sum: {commission: true}
  })

  const totalPaid = await prisma?.transactions.aggregate({
    where: {AND:[{req_type: 'Water packages'},{paymentstatus: 'Paid'}]},
    _sum: {commission: true}
  })

  const totalOutstaniding = await prisma?.transactions.aggregate({
    where: {AND:[{req_type: 'Water packages'},{paymentstatus: 'Unpaid'}]},
    _sum: {commission: true}
  })

  const total = await fetchDriversCommissions(query, fType, fSubType)

    return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              { label: 'Commissions', href: '/account/commissions', active: true },             
               
            ]}
            />
            </div>

            <div className='w-full flex justofy-start items-center m-2 p-3'>
            <Link className='text-4xl text-gray-900 font-medium' href='/account/commissions'>Drivers</Link>
            <Link className='text-4xl text-gray-400 font-medium px-4' href='/account/commissions/vendors-commissions'>Vendors</Link>
            <Link className='text-4xl text-gray-400 font-medium px-4' href='/account/commissions/merchants-fleet-commissions'>Merchants (Fleet)</Link>
            <Link className='text-4xl text-gray-400 font-medium px-4' href='/account/commissions/merchants-water-commissions'>Merchants (Water)</Link>
            </div>

            <div className='w-full grid grid-cols-3 gap-3'>
            <ExpectedCommission title='total expected commission' amount={totalCommissions?._sum.commission || 0} />
            <ExpectedCommission title='total received' amount={totalPaid?._sum.commission || 0} />
            <ExpectedCommission title='total outstanding commission' amount={totalOutstaniding?._sum.commission || 0} />
            </div>


            <div className="w-full md:flex justify-between items-center my-3 py-3">
            <h2 className='text-3xl'>Overall Driver's Commission</h2>

          <div className="flex justify-center items-center mx-2 px-3">
            <div className="mr-1">
              <FilterDate />
            </div>
           
          </div>
          </div>


         <DriversComissions query={query} currentPage={currentPage} fType={fType} fSubType={fSubType}  />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}