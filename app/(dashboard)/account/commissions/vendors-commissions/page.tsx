
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchVendors, fetchVendorsCommissions } from '@/app/utils/data'
import Vendors from '@/app/ui/vendors'
import { ExpectedCommission } from '@/app/ui/cards'
import { prisma } from '@/scripts'
import VendorsCommissions from '@/app/ui/vendors-commissions'
import { FilterDate } from '@/app/components/filter-date'
import { getMonthsFromMap, incrementNumber, getMonthsFromWeekMap } from '@/app/utils/utils'


export const metadata: Metadata = {
  title: 'Commissions | Vendors',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    fyear: string;
    ftype?: string;
    fsubtype?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const fyear = searchParams?.fyear || '';
  const ftype = searchParams?.ftype || '';
  const fsubtype = searchParams?.fsubtype || '';

  let month, year, nextyear


  if(ftype === 'monthly') {

    month = getMonthsFromMap(fsubtype)
    const nextMonthNumber = month === "12" ? "12" : incrementNumber(month)

    year = JSON.stringify(`${fyear}-${month}-01`)
    nextyear = JSON.stringify(`${fyear}-${nextMonthNumber}-01`)

  } else if(ftype === 'weekly') {

    const week = getMonthsFromWeekMap(fsubtype)

    year = JSON.stringify(`${fyear}-${week[0]}`)
    nextyear = JSON.stringify(`${fyear}-${week[1]}`)

  } else {
    let thisyearNext = "2025"
    year = (fyear !== '' && fyear !== null && fyear !== 'undefined') ? JSON.stringify(`${fyear}-01-01`) : JSON.stringify("2021-01-01")
    const followingYear = (fyear !== '' && fyear !== null && fyear !== 'undefined') ? incrementNumber(fyear)  : thisyearNext
    nextyear = JSON.stringify(`${followingYear}-01-01`)
  }



  const totalCommissions = await prisma?.transactions.aggregate({
    where: {AND:{AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tank Cleaning'}]}, {createdAt: {gte: new Date(year), lt: new Date(nextyear)}}]}, NOT:{driverid: '0'}},
    _sum: {commission: true}
  })

  const totalPaid = await prisma?.transactions.aggregate({
    where: {AND:{AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tank Cleaning'}]}, {paymentstatus: 'Paid'}, {createdAt: {gte: new Date(year), lt: new Date(nextyear)}}]}, NOT:{driverid: '0'}},
    _sum: {commission: true}
  })

  const totalUnPaid = await prisma?.transactions.aggregate({
    where: {AND:{AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tank Cleaning'}]}, {paymentstatus: 'Unpaid'}, {createdAt: {gte: new Date(year), lt: new Date(nextyear)}}]}, NOT:{driverid: '0'}},
    _sum: {commission: true}
  })

      
    const total = await fetchVendorsCommissions(query, fyear, ftype, fsubtype)  

    // const totalCommissions = await prisma?.transactions.aggregate({
    //   where: {OR:[{req_type: 'Plumbing'}, {req_type: 'Tank Cleaning'}]},
    //   _sum: {commission: true}
    // })

    // const totalPaid = await prisma?.transactions.aggregate({
    //   where: {AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tanking cleaning'}]},{paymentstatus: 'Paid'}]},
    //   _sum: {commission: true}
    // })


    // const totalUnPaid = await prisma?.transactions.aggregate({
    //   where: {AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tanking cleaning'}]},{paymentstatus: 'Unpaid'}]},
    //   _sum: {commission: true}
    // })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              { label: 'Commissions', href: '/account/commissions' },             
              { label: 'Vendors', href: '/account/commissions/vendors-commissions', active: true },                            
            ]}
            />
            </div>

            <div className='w-full md:flex justify-between items-center my-3'>
              <div className='p-2'>
              <Link className='text-3xl text-gray-400 font-medium pr-2' href='/account/commissions'>Drivers</Link>
            <Link className='text-3xl text-gray-900 font-medium px-2' href='/account/commissions/vendors-commissions'>Vendors</Link>
            <Link className='text-3xl text-gray-400 font-medium px-2' href='/account/commissions/merchants-fleet-commissions'>Merchants (Fleet)</Link>
            <Link className='text-3xl text-gray-400 font-medium px-2' href='/account/commissions/merchants-water-commissions'>Merchants (Water)</Link>
              </div>
              <div className='flex justify-end items-end'>
              <FilterDate />
              </div>
            </div>

            <div className='w-full grid grid-cols-3 gap-5'>
            <ExpectedCommission title='total expected commission' amount={totalCommissions?._sum.commission || 0} />
            <ExpectedCommission title='total received' amount={totalPaid?._sum.commission || 0} />
            <ExpectedCommission title='total outstanding commission' amount={totalUnPaid?._sum.commission || 0} />
            </div>


            <div className="w-full justify-start items-center my-3 py-3">
            <h2 className='text-3xl'>Overall Vendor's Commission</h2>
          </div>

         <VendorsCommissions query={query} currentPage={currentPage} fyear={fyear} ftype={ftype} fsubtype={fsubtype} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}