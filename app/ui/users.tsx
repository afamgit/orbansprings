import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredUsers } from '../utils/data';
import { UpdateUser, DeleteUser } from '@/app/ui/buttons'
import moment from 'moment';

export default async function Users({
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

    const getUsers = await fetchFilteredUsers(query, currentPage, subType, location);

    const allUsers = JSON.parse(JSON.stringify(getUsers))

    const volumeBought = async (userid: number) => {
        const totalBought = await prisma.transactions.aggregate({
          where: {customerid: userid},
          _sum: {qty: true}
        })
      
        return totalBought. _sum.qty || '-'
      }


      return (
        <main className='w-full flex flex-col justify-start items-start'>
         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
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
    {allUsers.length > 0 && allUsers.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='font-bold'><Link href={`/account/users/${item.id}/customer-detail?showDialog=y`}>{item.name}</Link></td>
            <td>{item.area}</td>
            <td>{volumeBought(parseInt(item.id))}</td>
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