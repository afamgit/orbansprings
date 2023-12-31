
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchVendors } from '@/app/utils/data'
import Vendors from '@/app/ui/vendors'
import { ExpectedCommission } from '@/app/ui/cards'
import { prisma } from '@/scripts'
import VendorsCommissions from '@/app/ui/vendors-commissions'


export const metadata: Metadata = {
  title: 'Commissions | Vendors',
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

      
    const total = await fetchVendors(query)  

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
              { label: 'Vendors', href: '/account/commissions/vendors', active: true },                            
            ]}
            />
            </div>

            <div className='w-full flex justofy-start items-center m-2 p-3'>
            <Link className='text-4xl text-gray-400 font-medium' href='/account/commissions'>Drivers</Link>
            <Link className='text-4xl text-gray-900 font-medium px-4' href='/account/commissions/vendors-commissions'>Vendors</Link>
            </div>

            <div className='w-full grid grid-cols-3 gap-5'>
            <ExpectedCommission title='total expected commission' amount={totalCommissions?._sum.commission || 0} />
            <ExpectedCommission title='total received' amount={totalPaid?._sum.commission || 0} />
            <ExpectedCommission title='total outstanding commission' amount={totalUnPaid?._sum.commission || 0} />
            </div>


            <div className='w-full my-3 py-3'>
              <h2 className='text-3xl'>Overall Vendor's Commission</h2>
            </div>

         <VendorsCommissions query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}