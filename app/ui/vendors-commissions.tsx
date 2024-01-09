import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredDrivers, fetchFilteredUsers, fetchFilteredVendors, fetchFilteredVendorsCommissions } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';
import { formatAmount } from '../utils/utils';

export default async function VendorsCommissions({
  query,
  currentPage,
  fType,
  fSubType
}: {
  query: string;
  currentPage: number;
  fType: string;
  fSubType: string;
}) { 

    const getVendors = await fetchFilteredVendorsCommissions(query, currentPage, fType, fSubType);

    const allVendors = JSON.parse(JSON.stringify(getVendors))


    const ordersDelivered = async (userid: number) => {
      const total = await prisma.transactions.aggregate({
        where: {driverid: userid},
        _sum: {amount: true}
      })
    
      return total. _sum.amount || '-'
    }
    
    const totalCommissions = async (userid: number) => {
      const total = await prisma.transactions.aggregate({
        where: {driverid: userid},
        _sum: {commission: true}
      })
    
      return total. _sum.commission || '-'
    }

    const getVendorDetails = async (userid: number) => {
      const vendor = await prisma.users.findUnique({
      where: {id: userid},
      select: {id:true, name:true, area:true, areagroup: true, role:true}
  })
  const vendorBox = <div className='flex flex-col'>
    <div className='flex'>
      <h4 className='mr-2 text-2xl'>{vendor?.name} - </h4>
      <h5 className='text-2xl'>{vendor?.area}</h5>
    </div>
    <div className='text-gray-600 text-xl capitalize'>{vendor?.role}</div>
  </div>
  return vendorBox

}
const getVendorOutstanding = async (userid: number) => {
  const driver = await prisma.users.findUnique({
  where: {id: userid},
  select: {id:true, commissions_outstanding:true}
})
const outstaningBox = <div className='flex flex-col'>
<div className='text-xl'>{driver?.commissions_outstanding}</div>
</div>
return outstaningBox

}


      const paidCommission = async (userid: number) => {
        const total = await prisma.driver_payments.aggregate({
          where: {dpaydriver: userid},
          _sum: {dpayoutstanding: true}
        })
      
        return total. _sum.dpayoutstanding || '-'
      }

      const outstandingCommission = async (userid: number) => {

        const commissionTotal = await prisma.transactions.aggregate({
          where: {driverid: userid},
          _sum: {commission: true}
        })
        const paidTotal = await prisma.driver_payments.aggregate({
          where: {dpaydriver: userid},
          _sum: {dpayoutstanding: true}
        })


        // const outstanding = (parseFloat(commissionTotal. _sum.commission) - parseFloat(paidTotal. _sum.dpayoutstanding))
      
        return '-'
      }

      return (
        <main className='w-full md:w-[1100px] mx-auto flex flex-col justify-start items-start'>

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Vendor's Name</th>
      <th className='text-start'>Orders Delivered</th>
      <th className='text-start'>Total Commission (NGN)</th>
      <th className='text-start'>Paid Commission (NGN)</th>
      <th className='text-start'>Outstanding</th>
    </tr>
  </thead>
  <tbody>
    {allVendors.length > 0 && allVendors.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{getVendorDetails(parseInt(item.driverid))}</td>
            <td>1</td>
            <td className='text-end'>{formatAmount(item.commission)}</td>
            <td className='text-green-600 text-end'>{item.paymentstatus === 'Paid' ? formatAmount(item.commission) : '-'}</td>
            <td className='text-red-500 text-end'>{item.paymentstatus === 'Unpaid' ? formatAmount(item.commission) : '-'}</td>
          </tr>
        )
    }
    )
    }

  </tbody>
</table>
</div>
 

        </main>
      )
}