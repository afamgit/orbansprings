import { prisma } from '@/scripts'
import Link from 'next/link'
import { DeleteMeterReading } from '@/app/ui/buttons'
import { fetchFilteredMeterReadings, fetchLastReadingOfPreviousDay } from '../utils/data';

export default async function MeterReadings({
    meterId,
    date,
    month,
    year,
    currentPage,
    userId
  }: {
    meterId: string;
    date: string;
    month: string;
    year: string;
    currentPage: number;
    userId?: string;
  }) { 

    const allMeterReadings = await fetchFilteredMeterReadings(meterId, date, month, year, currentPage, userId);

    const whereClause: any = { AND: [] };

    if (meterId) {
      whereClause.AND.push({ meterId: parseInt(meterId, 10) });
    }

    if (date) {
      whereClause.AND.push({ reading_date: new Date(`${date}T00:00:00.000Z`) });
    } else if (year && month) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      whereClause.AND.push({ reading_date: { gte: startDate, lte: endDate } });
    } else if (year) {
      const startDate = new Date(parseInt(year), 0, 1);
      const endDate = new Date(parseInt(year), 11, 31);
      whereClause.AND.push({ reading_date: { gte: startDate, lte: endDate } });
    }

    if (userId) {
      whereClause.AND.push({
        meter: {
          m_assigned_to: userId,
        },
      });
    }

    const total = await prisma.meterReadings.count({
      where: whereClause.AND.length ? whereClause : undefined,
    });

    const basePath = userId ? '/account/water-merchants' : '/account';


          return (
            <main className='w-full flex flex-col justify-start items-center'>
    
                <div className='w-full flex justify-between items-center my-3 py-3'>
              <h2 className='font-bold text-2xl'>Meter Readings {total}</h2>
             <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href={`${basePath}/meter-readings/create`}>Add new reading</Link>
             </div>
    
    
             <div className='w-full bg-white overflow-x-auto'> {/* Added overflow-x-auto for wide table */}
             <table className="w-full table-auto" cellPadding={10}>
      <thead>
        <tr className='bg-sky-200 px-2 py-1'>
          <th className='text-start'>#</th>
          <th className='text-start'>Meter ID</th>
          <th className='text-start'>First</th>
          <th className='text-start'>Afternoon</th>
          <th className='text-start'>Last</th>
          <th className='text-start'>Total Diff</th>
          <th className='text-start'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allMeterReadings.length > 0 && await Promise.all(allMeterReadings.map(async (item,i) => {
            const id = item.id.toString()
            const previousDayLastReading = await fetchLastReadingOfPreviousDay(item.meterId, item.reading_date);

            const formatReading = (reading: string | number | null | undefined) => {
              return reading !== null && reading !== undefined ? String(reading).padStart(7, '0') : 'N/A';
            };

            const firstReading = item.first_reading ? parseFloat(String(item.first_reading)) : 0;
            const afternoonReading = item.afternoon_reading ? parseFloat(String(item.afternoon_reading)) : 0;
            const lastReading = item.last_reading ? parseFloat(String(item.last_reading)) : 0;
            const prevDayLastReading = previousDayLastReading ? parseFloat(previousDayLastReading) : 0;

            const firstToPrevDayDiff = firstReading && prevDayLastReading ? firstReading - prevDayLastReading : 0;
            const firstToAfternoonDiff = afternoonReading && firstReading ? afternoonReading - firstReading : 0;
            const afternoonToLastDiff = lastReading && afternoonReading ? lastReading - afternoonReading : 0;
            const totalDiff = (lastReading || 0) - (prevDayLastReading ? prevDayLastReading : firstReading || 0);
            const monetaryValue = totalDiff * (item.meter.m_water_unit_price || 0.50);
    
            return (
                <tr className='px-2 py-1 border-b-slate-100 border-b-2 ' key={item.id}>
                <td className='px-2 py-1'>{++i}</td>
                <td className='px-2 py-1'>{item.meter.m_unique_id}
                  <p>{new Date(item.reading_date).toDateString()}</p>
                </td>
                <td className='px-2 py-1'>
                  <p className='font-bold'>{formatReading(item.first_reading)}</p>
                  <p>{firstToPrevDayDiff}</p>
                  {item.first_reading_user?.name && <div className="text-xs text-gray-500">by {item.first_reading_user.name}</div>}
                  {item.first_reading_at && <div className="text-xs text-gray-500">{new Date(item.first_reading_at).toLocaleTimeString()}</div>}
                </td>
                <td className='px-2 py-1'>
                  <p className='font-bold'>{formatReading(item.afternoon_reading)}</p>
                  <p>{firstToAfternoonDiff}</p>
                  {item.afternoon_reading_user?.name && <div className="text-xs text-gray-500">by {item.afternoon_reading_user.name}</div>}
                  {item.afternoon_reading_at && <div className="text-xs text-gray-500">{new Date(item.afternoon_reading_at).toLocaleTimeString()}</div>}
                </td>
                <td className='px-2 py-1'>
                  <p className='font-bold'>{formatReading(item.last_reading)}</p>
                  <p>{afternoonToLastDiff}</p>
                  {item.last_reading_user?.name && <div className="text-xs text-gray-500">by {item.last_reading_user.name}</div>}
                  {item.last_reading_at && <div className="text-xs text-gray-500">{new Date(item.last_reading_at).toLocaleTimeString()}</div>}
                </td>
                <td className='px-2 py-1'>
                  {totalDiff > 0 ? <div>{totalDiff} - ({item.meter.m_water_unit_price})
                  <p>N{monetaryValue.toLocaleString()}</p>
                  </div> : 'N/A'}
                </td>
                <td className='px-2 py-1'>
                  <Link href={`${basePath}/meter-readings/${id}/edit`} className="text-blue-500 mr-4">Edit</Link>
                  {!userId && <DeleteMeterReading id={id} />}
                </td>
              </tr>
            )
        }
        ))
        }
    
      </tbody>
    </table>
    
    
             </div>
            </main>
          )
    }