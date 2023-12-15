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

<p className='text-3xl my-3 py-3'>Recent</p>


         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <tbody>
    {allComplaints.length > 0 && allComplaints.map((item:any,i:number) => {
        const id = item.cid.toString()
        return (
            <tr  key={i} className='border-b-slate-100 border-b-2'>
              
            <td>{++i}</td>
            <td><Link href={`/account/complaints/${item.cid}/view`}> {item.cname}</Link></td>
            <td><Link href={`/account/complaints/${item.cid}/view`}> {item.cphone}</Link></td>
            <td><Link href={`/account/complaints/${item.cid}/view`}> <span className='fond-bold'>{item.csubject}:</span>{item.cmessage}</Link></td>
            <td>{moment(item.createdAt).format('MMM DD')}</td>
            
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

