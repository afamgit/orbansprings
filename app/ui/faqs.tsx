import { prisma } from '@/scripts'
import Link from 'next/link';
import { fetchFilteredFaqs } from '../utils/data';
import { DeleteFaq, UpdateFaq } from '@/app/ui/buttons'

export default async function Faqs({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allFaqs = await fetchFilteredFaqs(query, currentPage);

    const total = await prisma.faqs.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>FAQs ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/faqs/create'>Create faq</Link>
         </div> 

         <div className='w-full bg-white'>
         <table className="w-full table-auto p-3 md:p-5" cellPadding={10}>
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
    <th className='text-start'>#</th>
      <th className='text-start'>Page</th>
      <th className='text-start flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allFaqs.length > 0 && allFaqs.map((item,i) => {
        const id = item.faqid.toString()
        return (
            <tr key={i} className='border-b-2 border-b-slate-100'>
            <td>{++i}</td>
            <td>{item.faqquestion}</td>
            <td className='flex justify-end'><UpdateFaq faq={item} /> <DeleteFaq id={id} /></td>
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