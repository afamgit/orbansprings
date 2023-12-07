import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import {AddTeamForm} from '@/app/components/team-form'
import moment from 'moment'
import { UpdateTeam, DeleteTeam } from '@/app/ui/buttons'
import Link from 'next/link'

export default async function Page() {

const allTeams = await prisma.team_members.findMany()

      return (
        <main className='w-full flex flex-col justify-start items-center flex-wrap'>
         <div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Team members</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/admin/teams/create'>Add team member</Link>
         </div> 

         <div className='w-full w-[1000px] mx-auto bg-white'>
         <table className="w-full table-auto p-3 md:p-5">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Profile</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {allTeams.length > 0 && allTeams.map((item,i) => {
        const id = item.tmemberid.toString()
        return (
            <tr key={i}>
            <td>{item.tmember}</td>
            <td>{item.tmemberposition}</td>
            <td>{item.tmemberprofile}</td>
            <td><UpdateTeam team={item} /> <DeleteTeam id={id} /></td>
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