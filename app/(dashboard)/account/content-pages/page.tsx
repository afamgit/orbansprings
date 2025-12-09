import { prisma} from '@/scripts'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import { fetchPages } from '@/app/utils/data'
import ContentPages from '@/app/ui/contentpages'
import Pagination from '@/app/ui/pagination'

export const metadata: Metadata = {
  title: 'Pages',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) {
  const {query:queryParams,page} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  
const total = await fetchPages(query)
const allPages = await prisma.contentpages.findMany()

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Pages',
                href: '/account/content-pages',
                active: true,
              },
            ]}
            />
            </div>

            <ContentPages query={query} currentPage={currentPage} />

            <Pagination totalPages={total} />
         
        </main>
      )
}