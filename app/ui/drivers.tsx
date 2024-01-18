import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredDrivers, fetchFilteredUsers } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';

export default async function Drivers({
    query,
    currentPage,
    subType,
    location
  }: {
    query: string;
    currentPage: number;
    subType: string;
    location: string;
  }) { 

    const getDrivers = await fetchFilteredDrivers(query, currentPage, subType, location);

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
      <Link className='font-bold' href={`/account/users/${userid}/driver-detail?showDialog=y`}>
        <div className='flex'>
      <h4 className='mr-2 text-2xl'>{driver?.name} - </h4>
      <h5 className='text-2xl'>{driver?.area}</h5>
    </div></Link>
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

      return (
        <main className='w-full md:w-[1100px] mx-auto flex flex-col justify-start items-start my-5'>

         
         <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Driver's Name</th>
      <th className='text-start'>Plate no.</th>
      <th className='text-start'>Volume Sold(gl)</th>
      <th className='text-start'>Subscription Plan</th>
      <th className='text-start'>Date Joined</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allDrivers.length > 0 && allDrivers.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='font-bold'><Link href={`/account/users/${item.id}/driver-detail?showDialog=y`}>{item.name}</Link></td>
            <td>{item.drv_vehicle_license_plate_no}</td>
           <td>{volumeSold(parseInt(item.id))}</td>
            <td>{item.subscription_plan}</td>
            <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
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