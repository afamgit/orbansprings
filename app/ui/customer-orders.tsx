import { fetchFilteredCustomerOrders } from '../utils/data';
import moment from 'moment';

export default async function CustomerOrders({
    query,
    currentPage,
    product,
    id
  }: {
    query: string;
    currentPage: number;
    product: string;
    id: string;
  }) { 

    const getCustomerOrders = await fetchFilteredCustomerOrders(query, currentPage, product, id);

    const allCustomerOrders = JSON.parse(JSON.stringify(getCustomerOrders))


      return (
        <main className='w-full flex flex-col justify-start items-start'>
         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">

  <tbody>
    {allCustomerOrders.length > 0 && allCustomerOrders.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{item.orderref}<br /><span className='text-gray-400'>Order Number</span></td>
            <td>{item.drivername}<br /><span className='text-gray-400'>Treated by</span></td>
            <td>{moment(item.createdAt).format('DD/MM/YYYY | hh:mma')}<br /><span className='text-gray-400'>Order date</span></td>
            <td>{item.status === 'Cancelled' ? <span className='text-red-600'>{item.status}</span> : moment(item.driverdeliverystatustime).format('hh:mma')}<br /><span className='text-gray-400'>Completion time</span></td>
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