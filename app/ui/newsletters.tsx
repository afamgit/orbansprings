import { prisma } from '@/scripts'
import Link from 'next/link';
import { fetchFilteredNewsletters } from '../utils/data';
import { UpdateNewsletter, DeleteNewsletter } from '@/app/ui/buttons'
import moment from 'moment';

export default async function Newsletters({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allNewsletters = await fetchFilteredNewsletters(query, currentPage);

    const total = await prisma.newsletter_body.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Newsletters ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/newsletters/create'>Add newsletter</Link>
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start'>Subject</th>
      <th className='text-start'>Date</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allNewsletters.length > 0 && allNewsletters.map((item,i) => {
        const id = item.nlb_id.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td>{item.nlb_title}</td>
            <td>{moment(item.createdAt).format('Do MMM YYYY')}</td>
            <td className='flex justify-end'><UpdateNewsletter newsletter={item} /> <DeleteNewsletter id={id} /></td>
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