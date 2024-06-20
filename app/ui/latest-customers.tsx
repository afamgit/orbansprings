import { prisma } from '@/scripts'
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

export default async function LatestCustomers() { 

    const customers = await prisma.users.findMany({
      orderBy: {createdAt: 'desc'},
      skip:0,
      take:10,
      select: {name:true, id: true, photo: true, isactive: true, area: true}
    })



      return (
        <main className='w-full mx-auto flex flex-col justify-start items-start'>

         
        <div className='w-full mx-auto bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <tbody>
    {customers.length > 0 && customers.map((item,i) => {
          const profileImg = item?.photo?.includes('https') ? `${item?.photo}` : `https://support.orbansprings.com/${item?.photo}`

        return (
            <tr key={i} className='border-b-slate-100 border-b-2 p-2'>
            <td><div className='rounded-full'>
                 <Image
                src={`${profileImg}`}
                height={32}
                width={32}
                alt={item.name}
                className='rounded-full h-[40px] w-[40px]'
                />
                </div></td>
            <td>{item.name}
            <p className='text-sm text-gray-500'>{item.area}</p></td>
            <td className='capitalize'>{item.isactive ? <span className='text-green-500'>Active</span> : <span className='text-red-400'>Inctive</span>}</td>
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