import { prisma } from '@/scripts'
import Link from 'next/link';
import { UpdateSubscription, DeleteSubscription } from '@/app/ui/buttons'
import { formatAmount } from '../utils/utils';

export default async function AllSubscriptionPlans() { 

    const allSubscriptions = await prisma.subscription_plans.findMany({
      orderBy: {createdAt: 'desc'},
    })

      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Subscription plans ({allSubscriptions.length})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/subscriptions/create'>Create subscription plan</Link>
         </div> 

        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Category</th>
      <th className='text-start'>Name</th>
      <th className='text-start'>Amount</th>
      <th className='text-start'>Months</th>
      <th className='text-start'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allSubscriptions.length > 0 && allSubscriptions.map((item,i) => {
const id = item.subplanid.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.subplan_cat}</td>
            <td>{item.subplan}</td>
            <td>{formatAmount(item.subplan_amount)}</td>
            <td>{item.subplan_months}</td>
            <td className='flex justify-end'><UpdateSubscription plan={item} /> <DeleteSubscription id={id} /></td>
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