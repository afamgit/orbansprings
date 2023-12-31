import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredNotifications } from '../utils/data';
import moment from 'moment';

export default async function Notifications({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const getNotifications = await fetchFilteredNotifications(query, currentPage);

    const allNotifications = JSON.parse(JSON.stringify(getNotifications))


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<p className='text-3xl my-3'>Recent</p>
         
        <div className='w-full md:w-[1100px]  bg-white'>
    {allNotifications.length > 0 && allNotifications.slice(0,5).map((item:any,i:number) => {
        const id = item.umsgid.toString()
        return (
          <Link key={i} href={`/account/notifications/${item.umsgid}/view`}> 
          <div className='w-full flex justify-between items-center border-b-slate-100 border-b-2 px-3 py-1 md:px-5 md:py-3'>
              
          <div className='w-3/4'><p className='text-2xl'>{item.umsg_title}</p><p className='text-xl'>{item.umsg_body}</p></div>
            <div>{moment(item.umsg_time).format('MMM DD')}</div>
            
          </div></Link>
        )
    }
    )
    }

</div>
 

<p className='text-3xl my-3 text-gray-500'>Older</p>
         
<div className='w-full md:w-[1100px]  bg-white'>
    {allNotifications.length > 0 && allNotifications.slice(5).map((item:any,i:number) => {
        const id = item.umsgid.toString()
        return (
          <Link key={i} href={`/account/notifications/${item.umsgid}/view`}> 
          <div className='w-full flex justify-between items-center border-b-slate-100 border-b-2 px-3 py-1 md:px-5 md:py-3'>
              
            <div className='w-3/4'><p className='text-2xl'>{item.umsg_title}</p><p className='text-xl'>{item.umsg_body}</p></div>
            <div>{moment(item.umsg_time).format('MMM DD')}</div>
            
          </div></Link>
        )
    }
    )
    }

</div>

        </main>
      )
}

