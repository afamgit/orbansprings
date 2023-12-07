import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma} from '@/scripts'
import { UpdatePage, DeletePage } from '@/app/ui/buttons'
import Link from 'next/link'

export default async function Page() {

const allPages = await prisma.contentpages.findMany()

      return (
        <main className='w-full flex flex-col justify-start items-center flex-wrap'>
         
         
         <div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Pages</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/admin/content-pages/create'>Create page</Link>
         </div> 

         <div className='w-full w-[1000px] mx-auto bg-white'>
         <table className="w-full table-auto p-3 md:p-5">
  <thead>
    <tr>
      <th>Page</th>
      <th>Category</th>
      <th>Url</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {allPages.length > 0 && allPages.map((item,i) => {
        const id = item.cpageid.toString()
        return (
            <tr key={i}>
            <td>{item.cpagename}</td>
            <td>{item.cpagemenu}</td>
            <td>{item.cpagelinkname}</td>
            <td><UpdatePage page={item} /> <DeletePage id={id} /></td>
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