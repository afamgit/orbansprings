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
   


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Merchants ({total})</h1>  
             <Link className='rounded-lg w-[200px] text-center px-3 py-2 bg-gray-800 text-white' href='/account/users/create'>Add new merchant</Link>
       
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Merchant's Name</th>
      <th className='text-start'>Number of Assets</th>
      <th className='text-start'>Paid Subscription</th>
      <th className='text-start'>Outstanding Plan</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allMerchants.length > 0 && allMerchants.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.name}<br />{item.role}</td>
            <td>No of fleets</td>
            <td>Paid Sub</td>
            <td>Outstanding bal</td>
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