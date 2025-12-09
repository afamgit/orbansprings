import { prisma} from '@/scripts'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next'
import { fetchAllProducts } from '@/app/utils/data'
import Pagination from '@/app/ui/pagination'
import AllProducts from '@/app/ui/allproducts'

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) {
  const {query:queryParams,page} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  
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