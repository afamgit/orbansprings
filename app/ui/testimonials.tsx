import { prisma } from '@/scripts'
import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredTestimonials } from '../utils/data';
import { UpdateTestimonial, DeleteTestimonial } from '@/app/ui/buttons'

export default async function Testimonials({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allTestimonials = await fetchFilteredTestimonials(query, currentPage);

    const total = await prisma.testimonials.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Testimonials ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/testimonials/create'>Add testimonial</Link>
         </div> 

         
         <div className='w-full bg-white'>
         <table className="w-full table-auto p-3 md:p-5" cellPadding={10}>
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
    <th className='text-start'>#</th>
    <th className='text-start hidden md:block'>Photo</th>
      <th className='text-start'>Name</th>
      <th className='text-start'>Role</th>
      <th className='text-start flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allTestimonials.length > 0 && allTestimonials.map((item,i) => {
        const id = item.tid.toString()
        return (
          <tr key={i} className='border-b-2 border-b-slate-100'>
          <td>{++i}</td>
            <td className='hidden md:block'>
            <div className='w-32 h-32'>
                  <Image
                src={`/${item.tphoto}`}
                height={96}
                width={96}
                alt={item.tcustomer}
                />
                </div></td>        
                <td>{item.tcustomer}</td>
            <td>{item.trole}</td>
            <td className='flex justify-end'><UpdateTestimonial testimonial={item} /> <DeleteTestimonial id={id} /></td>
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