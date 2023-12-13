import { prisma } from '@/scripts'
import Link from 'next/link'
import { fetchFilteredMeterNumbers } from '../utils/data';

export default async function MeterNumbers({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allMeterNumbers = await fetchFilteredMeterNumbers(query, currentPage);

    const total = await prisma.meter_numbers.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>
         <div className='w-full flex justify-between items-center'>
             <h1 className='font-bold text-2xl'>Meter Numbers ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/meters'>Meters</Link>
        </div>

        <div className='w-full flex justify-end items-end p-3 my-3'>
        <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/meters/meter-numbers/create'>Add New</Link>

        </div>

         <div className='w-full bg-white'>
         <table className="w-full table-auto" cellPadding={10}>
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>ID</th>
      <th className='text-start'>Status</th>
      <th className='text-start'>Assigned</th>
    </tr>
  </thead>
  <tbody>
    {allMeterNumbers.length > 0 && allMeterNumbers.map((item,i) => {
        return (
          <tr className='px-2 py-1 border-b-slate-100 border-b-2 ' key={i}>
          <td className='px-3 py-1'>{item.meter_uuid}</td>
            <td className='px-3 py-1'>{item.meter_uuid_used}</td>
            <td className='px-3 py-1'>{item.meter_assigned}</td>
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