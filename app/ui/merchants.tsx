import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredDrivers, fetchFilteredMerchants, fetchFilteredUsers } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';

export default async function Drivers({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const getMerchants = await fetchFilteredMerchants(query, currentPage);

    const allMerchants = JSON.parse(JSON.stringify(getMerchants))

    const total = await prisma.users.count({
        where: {OR: [{role: 'fleetownerdriver'}, {role: 'fleetownerplumber'}]}
    })

    const volumeBought = async (userid: number) => {
        const totalBought = await prisma.transactions.aggregate({
          where: {customerid: userid},
          _sum: {qty: true}
        })
      
        return totalBought. _sum.qty || '-'
      }
   


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Merchants ({total})</h1>         
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Name</th>
      <th className='text-start'>Location</th>
      <th className='text-start'>Total Volume Bought(gl)</th>
      <th className='text-start'>Subscription Plan</th>
      <th className='text-start'>Date Joined</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allMerchants.length > 0 && allMerchants.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.name}</td>
            <td>{item.area}</td>
            <td>{volumeBought(parseInt(item.id))}</td>
            <td>{item.subscription_plan}</td>
            <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
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