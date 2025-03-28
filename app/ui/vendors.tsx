import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredDrivers, fetchFilteredUsers, fetchFilteredVendors } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';

export default async function Vendors({
    query,
    currentPage,
    type
  }: {
    query: string;
    currentPage: number;
    type: string
  }) { 

    const getVendors = await fetchFilteredVendors(query, currentPage, type);

    const allVendors = JSON.parse(JSON.stringify(getVendors))

    const total = await prisma.users.count({
        where: {AND:[{OR:[{role: 'plumber'}, {role:'tank cleaner'}]},{role: {contains:type}}]}
    })

    const ordersDelivered = async (userid: string) => {
      const total = await prisma.transactions.aggregate({
        where: {driverid: userid.toString()},
        _sum: {amount: true}
      })
    
      return total. _sum.amount || '-'
    }
    
    const totalCommissions = async (userid: string) => {
      const total = await prisma.transactions.aggregate({
        where: {driverid: userid.toString()},
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
      <Link className='text-2xl' href={`/account/users/${vendor?.id}/vendor-detail?showDialog=y`}>{vendor?.name}</Link>
    </div>
    <div className='text-gray-400 text-xl'>{vendor?.area}</div>
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

      const outstandingCommission = async (userid: string) => {

        const commissionTotal = await prisma.transactions.aggregate({
          where: {driverid: userid.toString()},
          _sum: {commission: true}
        })
        const paidTotal = await prisma.driver_payments.aggregate({
          where: {dpaydriver: parseInt(userid)},
          _sum: {dpayoutstanding: true}
        })


        // const outstanding = (parseFloat(commissionTotal. _sum.commission) - parseFloat(paidTotal. _sum.dpayoutstanding))
      
        return '-'
      }

      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Vendors ({total})</h1>         
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Vendor's Name</th>
      <th className='text-start'>Vendor Type</th>
      <th className='text-start'>Total Orders Completed</th>
      <th className='text-start'>Orders Cancelled</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allVendors.length > 0 && allVendors.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{getVendorDetails(parseInt(item.id))}</td>
            <td className='capitalize'>{item.role}</td>
            <td>{totalCommissions(item.id)}</td>
            <td>{paidCommission(parseInt(item.id))}</td>
            <td className='flex justify-end'><DeleteUser id={id} /></td>
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