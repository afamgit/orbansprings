import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredBlog } from '../utils/data';
import { UpdateBlog, DeleteBlog } from '@/app/ui/buttons'
import moment from 'moment';

export default async function Blog({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allBlog = await fetchFilteredBlog(query, currentPage);

    const total = await prisma.articles.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Articles ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/blog/create'>Add article</Link>
         </div> 

         
        <div className='w-full bg-white'>
         <table cellPadding={10} className="w-full table-auto p-3 md:p-5">
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
      <th className='text-start'>#</th>
      <th className='text-start hidden md:block'>Photo</th>
      <th className='text-start'>Title</th>
      <th className='text-start'>Date</th>
      <th className='flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allBlog.length > 0 && allBlog.map((item,i) => {
        const id = item.artid.toString()
        return (
            <tr key={i} className='border-b-slate-100 border-b-2'>
            <td>{++i}</td>
            <td className='hidden md:block'>
            <div className='w-16 h-16'>
            <Image
                src={`${item.artphoto}`}
                height={48}
                width={48}
                alt={item.title}
                className='rounded-lg'
                />
                </div></td>
            <td>{item.title}</td>
            <td>{moment(item.createdAt).format('Do MMM YYYY')}</td>
            <td className='flex justify-end'><UpdateBlog article={item} /> <DeleteBlog id={id} /></td>
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