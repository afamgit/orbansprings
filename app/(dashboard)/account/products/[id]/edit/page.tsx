import { prisma} from '@/scripts'
import { UpdateProductForm } from '@/app/components/product-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Update Product',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const product = await prisma.products.findUnique({
        where: {
            id: parseInt(id)
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
            label: 'Edit Product',
            href: `/account/products/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateProductForm product={product} />
</main>
    )

}