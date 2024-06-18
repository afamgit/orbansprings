import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredDrivers, fetchFilteredDriversCommissions, fetchFilteredUsers } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';
import { formatAmount } from '../utils/utils';

export default async function DriversComissions({
    query,
    currentPage,
    fyear,
    ftype,
    fsubtype
  }: {
    query: string;
    currentPage: number;
    fyear: string;
    ftype: string;
    fsubtype: string;
  }) { 

    const getDrivers = await fetchFilteredDriversCommissions(query, currentPage, fyear, ftype, fsubtype);

    const allDrivers = JSON.parse(JSON.stringify(getDrivers))

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


const volumeSold = async (pid: number) => {
  const total = await prisma.products.findFirst({
    where: {id: pid},
    select: {id:true, size:true}
  })

  return total?.size.split(' ')[0] || '-'
}

      return (
        <main className='w-full md:w-[1100px] mx-auto flex flex-col justify-start items-start'>

         
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
    </tr>
  </thead>
  <tbody>
    {allDrivers.length > 0 && allDrivers.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{getDriverDetails(parseInt(item.driverid))}</td>
            <td>{volumeSold(parseInt(item.productid))}</td>
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