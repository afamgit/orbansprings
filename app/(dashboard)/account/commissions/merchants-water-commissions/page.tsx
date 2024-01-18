
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchMerchantsWaterCommissions, fetchVendors, fetchVendorsCommissions } from '@/app/utils/data'
import Vendors from '@/app/ui/vendors'
import { ExpectedCommission } from '@/app/ui/cards'
import { prisma } from '@/scripts'
import VendorsCommissions from '@/app/ui/vendors-commissions'
import { FilterDate } from '@/app/components/filter-date'
import MerchantWaterCommissions from '@/app/ui/merchants-water-commission'


export const metadata: Metadata = {
  title: 'Commissions | Merchants Water',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    ftype?: string;
    fsubtype?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const fType = searchParams?.ftype || '';
  const fSubType = searchParams?.fsubtype || '';

      
    const total = await fetchMerchantsWaterCommissions(query, fType, fSubType)  

    const totalCommissions = await prisma?.transactions.aggregate({
      where: {OR:[{req_type: 'Plumbing'}, {req_type: 'Tank Cleaning'}]},
      _sum: {commission: true}
    })

    const totalPaid = await prisma?.transactions.aggregate({
      where: {AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tanking cleaning'}]},{paymentstatus: 'Paid'}]},
      _sum: {commission: true}
    })


    const totalUnPaid = await prisma?.transactions.aggregate({
      where: {AND:[{OR:[{req_type: 'Plumbing'}, {req_type: 'Tanking cleaning'}]},{paymentstatus: 'Unpaid'}]},
      _sum: {commission: true}
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              { label: 'Commissions', href: '/account/commissions' },             
              { label: 'Merchants Water', href: '/account/commissions/merchants-water-commissions', active: true },                            
            ]}
            />
            </div>

            <div className='w-full md:flex justify-between items-center my-3'>
              <div className='p-2'>
              <Link className='text-3xl text-gray-400 font-medium pr-2' href='/account/commissions'>Drivers</Link>
            <Link className='text-3xl text-gray-400 font-medium px-2' href='/account/commissions/vendors-commissions'>Vendors</Link>
            <Link className='text-3xl text-gray-400 font-medium px-2' href='/account/commissions/merchants-fleet-commissions'>Merchants (Fleet)</Link>
            <Link className='text-3xl text-gray-900 font-medium px-2' href='/account/commissions/merchants-water-commissions'>Merchants (Water)</Link>
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
            <h2 className='text-3xl'>Overall Merchants Water Commission</h2>
          </div>

         <MerchantWaterCommissions query={query} currentPage={currentPage} fType={fType} fSubType={fSubType} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}