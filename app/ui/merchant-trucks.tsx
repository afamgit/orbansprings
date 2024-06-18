import { prisma } from '@/scripts'
import { fetchFilteredMerchantTrucks } from '../utils/data';
import { UpdateTruck } from '@/app/ui/buttons'
import moment from 'moment';
import { statusBg } from '../utils/snippets';

export default async function MerchantTrucks({
  id,
    query,
    currentPage,
    status,
  }: {
    id: number,
    query: string;
    currentPage: number;
    status: string;
  }) { 

    const getTrucks = await fetchFilteredMerchantTrucks(id, query, currentPage, status);

    const allTrucks = JSON.parse(JSON.stringify(getTrucks))


      return (
        <main className='w-full md:w-[1100px] mx-auto flex flex-col justify-start items-start my-5'>

         
         <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Truck Brand</th>
      <th className='text-start'>Plate No.</th>
      <th className='text-start'>Meter Info</th>
      <th className='text-start'>Driver</th>
      <th className='text-start'>Status</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allTrucks.length > 0 && allTrucks.map((item:any,i:number) => {
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='font-bold uppercase'>{item.truck_make}</td>
            <td>{item.truck_plateno}</td>
           <td>{item.truck_meterid}</td>
            <td>{item.truck_driver}</td>
            <td><p className={`${item.truck_status === 'Active' ? 'bg-lime-200' : 'bg-red-200'} text-center px-2 py-1 rounded`}>{item.truck_status}</p></td>
            <td className='flex justify-end'><UpdateTruck truck={item.truckid} /></td>
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