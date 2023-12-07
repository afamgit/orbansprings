import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma} from '@/scripts'
import { UpdatePage, DeletePage } from '@/app/ui/buttons'
import Link from 'next/link'

export default async function Page() {

      return (
        <main className='w-full flex flex-col justify-start items-center flex-wrap'>
         
         
         <div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Dashboard</h1>         
         </div> 

        </main>
      )
}