import { prisma } from '@/scripts'
import Link from 'next/link';
import Image from 'next/image';
import { fetchFilteredAllProducts } from '../utils/data';
import { DeleteProduct, UpdateProduct, UpdateProductPrices } from '@/app/ui/buttons'

export default async function AllProducts({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) { 

    const allProducts = await fetchFilteredAllProducts(query, currentPage);

    const total = await prisma.products.count()


      return (
        <main className='w-full flex flex-col justify-start items-start'>

<div className='w-full flex justify-between iteams-center my-2 py-2'>
             <h1 className='font-bold text-2xl'>Products ({total})</h1>         
              <Link className='rounded-full px-3 py-2 bg-gray-800 text-white' href='/account/products/create'>Create product</Link>
         </div> 

         <div className='w-full bg-white'>
         <table className="w-full table-auto p-3 md:p-5" cellPadding={10}>
  <thead>
  <tr className='bg-gray-300 px-2 py-1'>
    <th className='text-start'>#</th>
    <th className='text-start'>Image</th>
    <th className='text-start'>Product</th>
      <th className='text-start'>Prices</th>
      <th className='text-start flex justify-end'>Action</th>
    </tr>
  </thead>
  <tbody>
    {allProducts.length > 0 && allProducts.map((item,i) => {
        const id = item.id.toString()
        const photoImg = item?.picture.includes('https') ? `${item?.picture}` : item?.picture.includes('images') ? `https://support.orbansprings.com/${item?.picture}` : `/${item?.picture}`

        return (
            <tr key={i} className='border-b-2 border-b-slate-100 justify-center align-center'>
            <td>{++i}</td>
            <td>
            <div className='w-32 h-32'>
                  <Image
                src={`${photoImg}`}
                height={96}
                width={96}
                alt={item.name}
                />
                </div>
            </td>
                        <td>{item.name}</td>
            <td><UpdateProductPrices id={id} /></td>
            <td className='flex justify-end'><UpdateProduct product={item} /> <DeleteProduct id={id} /></td>
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