import { prisma } from '@/scripts'
import { fetchFilteredVendorsCommissions } from '../utils/data';
import { formatAmount } from '../utils/utils';

export default async function VendorsCommissions({
  query,
  currentPage,
  fyear,
  ftype,
  fsubtype
}: {
  query: string;
  currentPage: number;
  fyear: string;
  ftype: string;
  fsubtype: string;
}) { 

    const getVendors = await fetchFilteredVendorsCommissions(query, currentPage, fyear, ftype, fsubtype);

    const allVendors = JSON.parse(JSON.stringify(getVendors))

    const getVendorDetails = async (userid: number) => {
      const vendor = await prisma.users.findUnique({
      where: {id: userid},
      select: {id:true, name:true, area:true, areagroup: true, role:true}
  })
  const vendorBox = <div className='flex flex-col'>
    <div className='flex'>
      <h4 className='mr-2 text-2xl'>{vendor?.name} - </h4>
      <h5 className='text-2xl'>{vendor?.area}</h5>
    </div>
    <div className='text-gray-600 text-xl capitalize'>{vendor?.role}</div>
  </div>
  return vendorBox

}


      return (
        <main className='w-full md:w-[1100px] mx-auto flex flex-col justify-start items-start'>

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-sky-200 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Vendor's Name</th>
      <th className='text-start'>Orders Delivered</th>
      <th className='text-start'>Total Commission (NGN)</th>
      <th className='text-start'>Paid Commission (NGN)</th>
      <th className='text-start'>Outstanding</th>
    </tr>
  </thead>
  <tbody>
    {allVendors.length > 0 && allVendors.map((item:any,i:number) => {
        const id = item.id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{getVendorDetails(parseInt(item.driverid))}</td>
            <td>1</td>
            <td className='text-end'>{formatAmount(item.commission)}</td>
            <td className='text-green-600 text-end'>{item.paymentstatus === 'Paid' ? formatAmount(item.commission) : '-'}</td>
            <td className='text-red-500 text-end'>{item.paymentstatus === 'Unpaid' ? formatAmount(item.commission) : '-'}</td>
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