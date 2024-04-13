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
import AllProducts from '@/app/ui/allproducts'

export const metadata: Metadata = {
  title: 'Products',
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
  
const total = await fetchAllProducts(query)

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Products',
                href: '/account/products',
                active: true,
              },
            ]}
            />
            </div>

            <AllProducts query={query} currentPage={currentPage} />

            <Pagination totalPages={total} />
         
        </main>
      )
}