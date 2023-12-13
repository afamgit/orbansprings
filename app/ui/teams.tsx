import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredTeams } from '../utils/data';
import { UpdateTeam, DeleteTeam } from '@/app/ui/buttons'

export default async function Teams({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allTeams = await fetchFilteredTeams(query, currentPage);

    const total = await prisma.team_members.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Team members ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/teams/create'>Add team member</Link>
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start hidden md:block'>Photo</th>
      <th className='text-start'>Name</th>
      <th className='text-start'>Position</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allTeams.length > 0 && allTeams.map((item,i) => {
        const id = item.tmemberid.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='hidden md:block'>
            <div className='w-32 h-32'>
                  <Image
                src={`/${item.tmemberphoto}`}
                height={96}
                width={96}
                alt={item.tmember}
                className='rounded-lg'
                />
                </div></td>
            <td>{item.tmember}</td>
            <td>{item.tmemberposition}</td>
            <td className='flex justify-end'><UpdateTeam team={item} /> <DeleteTeam id={id} /></td>
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