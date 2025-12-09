import { prisma } from '@/scripts'
import { fetchFilteredMerchantsWaterCommissions } from '../utils/data';

export default async function MerchantWaterCommissions({
  query,
  currentPage,
  fType,
  fSubType
}: {
  query: string;
  currentPage: number;
  fType: string;
  fSubType: string;
}) { 

    const getMerchants = await fetchFilteredMerchantsWaterCommissions(query, currentPage, fType, fSubType);

    const allMerchants = JSON.parse(JSON.stringify(getMerchants))

    const volumeBought = async (userid: string) => {
        const totalBought = await prisma.transactions.aggregate({
          where: {customerid: userid},
          _sum: {qty: true}
        })
      
        return totalBought. _sum.qty || '-'
      }
   


      return (
        <main className='w-full flex flex-col justify-start items-start'>
         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Merchant's Name</th>
      <th className='text-start'>Number of Assets</th>
      <th className='text-start'>Paid Subscription</th>
      <th className='text-start'>Outstanding Plan</th>
    </tr>
  </thead>
  <tbody>
    {allMerchants.length > 0 && allMerchants.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.name}</td>
            <td>No of fleets</td>
            <td>Paid Sub</td>
            <td>Outstanding bal</td>
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