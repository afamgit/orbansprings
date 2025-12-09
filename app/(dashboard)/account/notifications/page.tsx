import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import Pagination from '@/app/ui/pagination'
import { fetchNotifications } from '@/app/utils/data'
import Notifications from '@/app/ui/notifications'

export const metadata: Metadata = {
  title: 'Notifications',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) {
  const {query:queryParams,page} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
      
    const total = await fetchNotifications(query)

    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
           <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Notifications',
                href: '/account/notifications',
                active: true,
              },
            ]}
            />
            </div>


         <Notifications query={query} currentPage={currentPage} />


<div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>

        </main>
      )
}