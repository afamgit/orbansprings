import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredTeams } from '../utils/data';
import { UpdateTeam, DeleteTeam } from '@/app/ui/buttons'

export default async function Products() { 

    const total = await prisma.transactions.count()

    const allProducts = await prisma.transactions.groupBy({
      by: ['productname'],
      _count: {id: true} ,
    })


    const cancelled = async (cat:string) => {

      const totalCancelled = await prisma.transactions.count({
        where: {productname: cat, status: 'cancelled'},
      })
    
      return totalCancelled || '-'
    }

    const deliveries = async (cat:string) => {

      const totalDelivered = await prisma.transactions.count({
        where: {productname: cat, status: 'completed'},
      })
    
      return totalDelivered || '-'
    }

      return (
        <main className='w-full flex flex-col justify-start items-start'>

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Categories</th>
      <th className='text-start'>Orders</th>
      <th className='text-start'>Delivery</th>
      <th className='text-start'>Cancelled</th>
    </tr>
  </thead>
  <tbody>
    {allProducts.length > 0 && allProducts.map((item,i) => {
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.productname}</td>
            <td>{item._count.id}</td>
            <td>{deliveries(item.productname)}</td>
            <td>{cancelled(item.productname)}</td>
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