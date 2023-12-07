import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import {AddTestimonialForm} from '@/app/components/testimonial-form'
import moment from 'moment'
import { UpdateTestimonial, DeleteTestimonial } from '@/app/ui/buttons'
import Link from 'next/link'

export default async function Page() {

const allTestimonials = await prisma.testimonials.findMany()

      return (
        <main className='w-full flex flex-col justify-start items-center flex-wrap'>
          <div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Testimonials</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/admin/testimonials/create'>Add testimonial</Link>
         </div> 

         <div className='w-full w-[1000px] mx-auto bg-white'>
         <table className="w-full table-auto p-3 md:p-5">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Message</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {allTestimonials.length > 0 && allTestimonials.map((item,i) => {
        const id = item.tid.toString()
        return (
            <tr key={i}>
            <td>{item.tcustomer}</td>
            <td>{item.trole}</td>
            <td>{item.tmessage}</td>
            <td><UpdateTestimonial testimonial={item} /> <DeleteTestimonial id={id} /></td>
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