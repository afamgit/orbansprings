import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma} from '@/scripts'
import { UpdatePage, DeletePage } from '@/app/ui/buttons'
import Link from 'next/link'
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
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
const total = await fetchPages(query)
const allPages = await prisma.contentpages.findMany()

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
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