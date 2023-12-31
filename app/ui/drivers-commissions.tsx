import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredDrivers, fetchFilteredUsers } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';

export default async function DriversComissions({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const getDrivers = await fetchFilteredDrivers(query, currentPage);

    const allDrivers = JSON.parse(JSON.stringify(getDrivers))

    const total = await prisma.users.count({
        where: {role: 'driver'}
    })

    const getDriverDetails = async (userid: number) => {
      const driver = await prisma.users.findUnique({
      where: {id: userid},
      select: {id:true, name:true, area:true, areagroup: true, drv_vehicle_license_plate_no:true}
  })
  const driverBox = <div className='flex flex-col'>
    <div className='flex'>
      <h4 className='mr-2 text-2xl'>{driver?.name} - </h4>
      <h5 className='text-2xl'>{driver?.area}</h5>
    </div>
    <div className='text-gray-600 text-xl'>{driver?.drv_vehicle_license_plate_no}</div>
  </div>
  return driverBox

}

const getDriverOutstanding = async (userid: number) => {
  const driver = await prisma.users.findUnique({
  where: {id: userid},
  select: {id:true, commissions_outstanding:true}
})
const driverBox = <div className='flex flex-col'>
<div className='text-xl'>{driver?.commissions_outstanding}</div>
</div>
return driverBox

}

const volumeSold = async (userid: number) => {
  let drvid = userid.toString()
  const total = await prisma.meter_tanker_entries.aggregate({
    where: {mt_tankerid: drvid},
    _sum: {mt_volume_delivered: true}
  })

  return total. _sum.mt_volume_delivered || '-'
}
    const totalCommission = async (userid: number) => {
        const total = await prisma.transactions.aggregate({
          where: {driverid: userid},
          _sum: {commission: true}
        })
      
        return total. _sum.commission || null
      }
   
      const paidCommission = async (userid: number) => {
        const total = await prisma.driver_payments.aggregate({
          where: {dpaydriver: userid},
          _sum: {dpayoutstanding: true}
        })
      
        return total. _sum.dpayoutstanding || '-'
      }


      return (
        <main className='w-full md:w-[1100px] mx-auto flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Drivers ({total})</h1>         
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Driver's Name</th>
      <th className='text-start'>Volume Sold(gl)</th>
      <th className='text-start'>Total Commission (NGN)</th>
      <th className='text-start'>Paid Commission (NGN)</th>
      <th className='text-start'>Outstanding</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allDrivers.length > 0 && allDrivers.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{getDriverDetails(parseInt(item.id))}</td>
            <td>{volumeSold(parseInt(item.id))}</td>
            <td>{totalCommission(parseInt(item.id))}</td>
            <td className='text-green-600'>{paidCommission(parseInt(item.id))}</td>
            <td className='text-red-500'>{getDriverOutstanding(parseInt(item.id))}</td>
            <td className='flex justify-end'><UpdateUser user={item} /> <DeleteUser id={id} /></td>
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