import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredComplaints } from '../utils/data';
import moment from 'moment';

export default async function Complaints({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const getComplaints = await fetchFilteredComplaints(query, currentPage);

    const allComplaints = JSON.parse(JSON.stringify(getComplaints))

    const total = await prisma.contact_messages.count()   


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Complaints ({total})</h1>         
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Name</th>
      <th className='text-start'>Location</th>
      <th className='text-start'>Subscription Plan</th>
      <th className='text-start'>Date Joined</th>
    </tr>
  </thead>
  <tbody>
    {allComplaints.length > 0 && allComplaints.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.name}</td>
            <td>{item.area}</td>
            <td>{item.subscription_plan}</td>
            <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
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

