import { prisma} from '@/scripts'
import { ProductPricesGenerateForm, UpdateProductPriceForm } from '@/app/components/product-prices-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Product Prices',
  };

export default async function Page({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const product = await prisma.products.findUnique({
        where: {
            id: id
        }
    })

    const productPrices = await prisma.product_prices_areas.findMany({
        where: {
            ppa_pid: id
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Products',
            href: '/account/products',
          },
          {
            label: 'Product prices',
            href: `/account/products/${id}/prices`,
            active: true,
          },
        ]}
        />
        </div>

<div className='w-full md:w-[1000px] mx-auto flex justify-between items-center rounded-lg'>
   <Link className='mr-2 bg-gray-500 text-white px-3 py-1' href='/account/products'>Back</Link> <h3 className='text-xl'>{product?.name}</h3>

    {productPrices.filter((item,i) => item.pp_subscription === 'Basic').length === 0 && <ProductPricesGenerateForm productid={product?.id} subscriptiontype='Basic' />}

    {productPrices.filter((item,i) => item.pp_subscription === 'Premium').length === 0 && <ProductPricesGenerateForm productid={product?.id} subscriptiontype='Premium' />}
</div>

{productPrices.length > 0 && <div className='mt-6'>
    <table className='w-[360px] md:w-[1000px] mx-auto bg-white'>
        <thead>
            <th className='text-center'>#</th>
            <th className='text-start'>Area</th>
            <th className='text-start'>Subscription</th>
            <th className='text-start'>Action</th>

        </thead>
        <tbody>
            {productPrices.length > 0 && productPrices.map((item,i) => {
                return (
                    <tr key={i} className='border-b-slate-100 border-b-2'>
                    <td className='w-[25px] text-center'>{++i}</td>
                    <td>{item.pparea}</td>
                    <td>{item.pp_subscription}</td>
                    <td><UpdateProductPriceForm productid={item.ppa_pid} ppriceid={item.ppid} amount={item.pp_rate} /></td>
                </tr>
    
                )
            })}

        </tbody>
    </table>

</div>}
</main>
    )

}