import { prisma } from '@/scripts'
import { fetchFilteredVendorOrders } from '../utils/data';
import moment from 'moment';
import { formatCurrency } from '../utils/utils';
import { statusBg } from '../utils/snippets';
import Link from 'next/link';
import { FaEllipsisV } from 'react-icons/fa';

export default async function VendorOrders({
    query,
    currentPage,
    fleet
    }: {
    query: string;
    currentPage: number;
    fleet: string
  }) { 

    const getOrders = await fetchFilteredVendorOrders(query, currentPage, fleet);

    const allOrders = JSON.parse(JSON.stringify(getOrders))

const currentOrders = getOrders.slice(0,7)

      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full rounded-lg border-2 border-gray-200 my-2 p-4'>
<div className="flex justify-start items-start py-3">
                <FaEllipsisV size={24} className="outline-0 mr-2" />

        <h2 className="text-3xl">Orders</h2>
        </div>
         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Customer</th>
      <th className='text-start'>Order</th>
      <th className='text-start'>Driver</th>
      <th className='text-start'>Status</th>
    </tr>
  </thead>
  <tbody>
    {currentOrders.length > 0 && currentOrders.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2 justify-start items-start'>
            <td>{++i}</td>
            <td className='text-2xl align-top'>{item.customername}<p className='text-gray-500 text-sm'>{item.customerphone}</p></td>
            <td className='text-2xl align-top'>{item.productname}<p className='text-gray-500 text-sm py-0 my-0'>{moment(item.createdAt).format('DD/MM/YYYY H:mma')}</p>
            <Link href={`/account/vendor-merchants/orders/${item.id}/order-detail?showDialog=y`}><p className='text-gray-500 font-bold text-xl text-sky-400'>#{item.orderref}</p></Link></td>
            <td className='text-2xl align-top'>{item.drivername}<p className='text-gray-500 text-sm'>{item.drivervehicleplateno}</p></td>
            <td><p className={statusBg(item.status)}>{item.status}</p></td>
          </tr>
        )
    }
    )
    }

  </tbody>
</table>
</div>
</div> 

 

<div className='w-full rounded-lg border-2 border-gray-200 my-2 p-4'>
<div className="flex justify-start items-center py-3">
                <FaEllipsisV size={24} className="outline-0 mr-2" />

        <h2 className="text-3xl">Previous Orders</h2>
        </div>

<div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Customer</th>
      <th className='text-start'>Order</th>
      <th className='text-start'>Driver</th>
      <th className='text-start'>Status</th>
    </tr>
  </thead>
  <tbody>
    {allOrders.length > 0 && allOrders.slice(7).map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='text-2xl align-top'>{item.customername}<p className='text-gray-500 text-sm'>{item.customerphone}</p></td>
            <td className='text-2xl align-top'>{item.productname}<p className='text-gray-500 text-sm py-0 my-0'>{moment(item.createdAt).format('DD/MM/YYYY H:mma')}</p>
            <Link href={`/account/vendor-merchants/orders/${item.id}/order-detail?showDialog=y`}><p className='text-gray-500 font-bold text-xl text-sky-400'>#{item.orderref}</p></Link></td>
            <td className='text-2xl align-top'>{item.drivername}<p className='text-gray-500 text-sm'>{item.drivervehicleplateno}</p></td>
            <td><p className={statusBg(item.status)}>{item.status}</p></td>
          </tr>
        )
    }
    )
    }

  </tbody>
</table>
</div>
</div> 


        </main>
      )
}

