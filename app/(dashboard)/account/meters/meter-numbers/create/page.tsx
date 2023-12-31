import { prisma } from '@/scripts'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {AddMeterGenerateForm} from '@/app/components/meter-form'
import moment from 'moment'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create meter number',
};

export default async function Page() {

    const allMeterNumbers = await prisma.meter_numbers.findMany()


      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Meter numbers',
                href: '/account/meters/meter-numbers',
              },
              {
                label: 'Generate meter numbers',
                href: '/account/meters/meters-numbers/create',
                active: true,
              },
            ]}
            />
            </div>

<div className='flex flex-col justify-center items-center'>
         <AddMeterGenerateForm />
         </div>

        </main>
      )
}