import { prisma } from '@/scripts'
import Link from 'next/link';
import { fetchFilteredAreaGroups } from '../utils/data';
import { DeleteAreaGroup, UpdateAreaGroup } from '@/app/ui/buttons'

export default async function AreaGroups({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const areagroups = await fetchFilteredAreaGroups(query, currentPage);

    const total = await prisma.area_groups.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Area Groups ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/areagroups/create'>Create Area Group</Link>
         </div> 

         <div className='w-full bg-white'>
         <table className="w-full table-auto p-3 md:p-5" cellPadding={10}>
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
    <th className='text-start'>#</th>
      <th className='text-start'>Area group</th>
      <th className='text-start flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {areagroups.length > 0 && areagroups.map((item,i) => {
        const id = item.agid.toString()
        return (
            <tr key={i} className='border-b-2 border-b-slate-100'>
            <td>{++i}</td>
            <td>{item.agname}</td>
            <td className='flex justify-end'><UpdateAreaGroup areagroup={item} /> <DeleteAreaGroup id={id} /></td>
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