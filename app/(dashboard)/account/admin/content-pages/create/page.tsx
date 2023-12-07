import {AddPageForm} from '@/app/components/page-form'

export default async function Page() {

      return (
        <main className='w-full md:w-[1200px] mx-auto flex flex-col justify-start items-center flex-wrap'>
         <AddPageForm />
        </main>
      )
}