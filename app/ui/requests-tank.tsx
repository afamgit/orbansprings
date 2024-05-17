import { prisma } from '@/scripts'
import { fetchFilteredRequests, fetchFilteredRequestsPlumbing, fetchFilteredRequestsTank } from '../utils/data';
import moment from 'moment';
import { statusBg } from '../utils/snippets';
import Link from 'next/link';

export default async function RequestsTank({
    query,
    currentPage,
    product,
    status,
    location,
    }: {
    query: string;
    currentPage: number;
    product: string
    status: string;
    location: string;
  }) { 

    const getRequests = await fetchFilteredRequestsTank(query, currentPage, product, status, location);

    const allRequests = JSON.parse(JSON.stringify(getRequests))

    const total = await prisma.requests.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
<h2 className="text-3xl">Tank cleaning Requests</h2>
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>User ID</th>
      <th className='text-start'>Location</th>
      <th className='text-start'>Order Info</th>
      <th className='text-start'>Type</th>
      <th className='text-start'>Status</th>
    </tr>
  </thead>
  <tbody>
    {allRequests.length > 0 && allRequests.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='font-bold'><Link href={`/account/requests/${item.id}/request-detail?showDialog=y`}>{item.orderref}</Link><br /><span className='text-gray-400'>{item.customername}</span></td>
            <td>{item.customerarea}</td>
            <td>{item.productname}<br /><span className='text-gray-400'>{moment(item.createdAt).format('DD/MM/YYYY H:mma')}</span></td>
            <td>{item.req_type}</td>
            <td><p className={statusBg(item.status)}>{item.status}</p></td>
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

