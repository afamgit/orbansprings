import { prisma } from '@/scripts'
import { fetchFilteredCommissions, fetchFilteredOrders, fetchFilteredOrdersPlumbing } from '../utils/data';
import moment from 'moment';
import { formatCurrency } from '../utils/utils';

export default async function OrdersPlumbing({
    query,
    currentPage,
    product,
    subscription,
    location,
    }: {
    query: string;
    currentPage: number;
    product: string
    subscription: string;
    location: string;
  }) { 

    const getOrders = await fetchFilteredOrdersPlumbing(query, currentPage, product, subscription, location);

    const allOrders = JSON.parse(JSON.stringify(getOrders))

    const total = await prisma.transactions.count()

   
      const statusBg = (status: string) => {
        const bg = status === 'New' ? 'bg-gray-300' : status === 'Completed' ? 'bg-green-400' : status === 'Pending' ? 'bg-red-300' : status === 'Accepted' ? 'bg-green-200' : status === 'Cancelled' ? 'bg-red-300' : 'bg-red-600'

        return  `px-3 py-1 text-gray-900 rounded text-center ${bg}`
      }


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
<h2 className="text-3xl">Orders List</h2>
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>User ID</th>
      <th className='text-start'>Location</th>
      <th className='text-start'>Order Info</th>
      <th className='text-start'>Price</th>
      <th className='text-start'>Status</th>
    </tr>
  </thead>
  <tbody>
    {allOrders.length > 0 && allOrders.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.orderref}<br /><span className='text-gray-400'>{item.customername}</span></td>
            <td>{item.customerarea}</td>
            <td>{item.productname}<br /><span className='text-gray-400'>{moment(item.createdAt).format('DD/MM/YYYY H:mma')}</span></td>
            <td className='text-center'>{formatCurrency(item.amount)}</td>
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

