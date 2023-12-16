import { prisma } from '@/scripts'
import Link from 'next/link'
import { UpdateMeter } from '@/app/ui/buttons'
import { fetchFilteredMeters } from '../utils/data';

export default async function Meters({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allMeters = await fetchFilteredMeters(query, currentPage);

    const total = await prisma.meters.count()

    const groupMeters = await prisma.meters.groupBy({
    by: ['m_status'],
    _count: {meterid: true} 
    })
        
    const volumeSoldTanker = async (mid: string) => {
    
        const totalVolume = await prisma.meter_tanker_entries.aggregate({
          where: {mt_unique_id: mid},
          _sum: {mt_volume_delivered: true}
        })
      
        // console.log(totalVolume)
        return totalVolume. _sum.mt_volume_delivered || '-'
    }
    const volumeSoldSupply = async (mid: string) => {
    
        const totalVolume = await prisma.meter_supply_entries.aggregate({
          where: {ms_unique_id: mid},
          _sum: {ms_volume_supplied: true}
        })
      
        // console.log(totalVolume)
        return totalVolume. _sum.ms_volume_supplied || '-'  
    }
    
    
    const volumePurchased = async (mid: string, mtype: string) => {
      const totalDelivered = await prisma.meter_domestic_entries.aggregate({
        where: {md_unique_id: mid},
        _sum: {md_volume_received: true}
      })
    
      // console.log(totalDelivered)
      return totalDelivered. _sum.md_volume_received || '-'
    }
          return (
            <main className='w-full flex flex-col justify-start items-center'>
    
                <div className='w-full flex justify-between items-center my-3 py-3'>
              <h2 className='font-bold text-2xl'>Meters {total}</h2>
             <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/meters/meter-numbers'>Meter numbers</Link>
             </div>
    
              {/* <MetersChart /> */}
    
    
             <div className='w-full bg-white'>
             <table className="w-full table-auto" cellPadding={10}>
      <thead>
        <tr className='bg-gray-300 px-2 py-1'>
          <th className='text-start'>#</th>
          <th className='text-start'>Meter Info</th>
          <th className='text-start'>User type</th>
          <th className='text-start'>Total vol sold(gl)</th>
          <th className='text-start'>Volume Purchased(gl)</th>
          <th className='text-start'>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allMeters.length > 0 && allMeters.map((item,i) => {
            const id = item.meterid.toString()
    
            return (
                <tr className='px-2 py-1 border-b-slate-100 border-b-2 ' key={i}>
                <td className='px-2 py-1'>{++i}</td>
                <td className='px-2 py-1'>{item.m_unique_id}<p className='text-gray-500 text-sm my-1'>{item.m_assigned_to} {item.m_area}</p></td>
                <td className='px-2 py-1'>{item.m_for}</td>
                <td className='px-2 py-1 text-center'>{item.m_for === 'Tanker' ? volumeSoldTanker(item.m_unique_id) : volumeSoldSupply(item.m_unique_id)}</td>
                <td className='px-2 py-1 text-center'>{volumePurchased(item.m_unique_id,item.m_for)}</td>
                <td className='px-2 py-1 text-center'><span className={`px-2 py-1 rounded w-full ${item.m_status === 'Active' ? 'bg-gray-400' : 'bg-gray-200'}`}>{item.m_status}</span></td>
                <td className='px-2 py-1'><UpdateMeter meter={item} /> </td>
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