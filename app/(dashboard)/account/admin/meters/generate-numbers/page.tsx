import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {AddMeterGenerateForm} from '@/app/components/meter-form'
import moment from 'moment'

export default async function Page() {

    const allMeterNumbers = await prisma.meter_numbers.findMany()


      return (
        <main className='w-full flex flex-col justify-start items-center'>
         <div className='w-full flex justify-between items-center'>
             <h1 className='font-bold text-2xl'>Generate Meter Numbers</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/admin/meters'>Meters</Link>
        </div>

         <AddMeterGenerateForm />

         <div className='w-full w-[1000px] mx-auto bg-white'>
         <table className="w-full table-auto p-3 md:p-5">
  <thead>
    <tr>
      <th>ID</th>
      <th>Status</th>
      <th>Assigned</th>
    </tr>
  </thead>
  <tbody>
    {allMeterNumbers.length > 0 && allMeterNumbers.map((item,i) => {
        return (
            <tr key={i}>
            <td>{item.meter_uuid}</td>
            <td>{item.meter_uuid_used}</td>
            <td>{item.meter_assigned}</td>
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