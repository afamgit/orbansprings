import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma} from '@/scripts'
import { UpdatePage, DeletePage } from '@/app/ui/buttons'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import { fetchAllProducts, fetchPages } from '@/app/utils/data'
import ContentPages from '@/app/ui/contentpages'
import Pagination from '@/app/ui/pagination'
import AllSubscriptionPlans from '@/app/ui/subscriptions'

export const metadata: Metadata = {
  title: 'Subscription Plans',
};

export default async function Page() {
  
      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Subscription Plans',
                href: '/account/subscriptions',
                active: true,
              },
            ]}
            />
            </div>

            <AllSubscriptionPlans />
         
        </main>
      )
}