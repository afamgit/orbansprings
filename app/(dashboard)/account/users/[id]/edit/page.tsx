import { prisma } from '@/scripts';
import { UpdateUserForm } from '@/app/components/user-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit user',
  };

export default async function User({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const user = await prisma.users.findUnique({
        where: {
            id: id
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Users',
            href: '/account/users',
          },
          {
            label: 'Edit user',
            href: `/account/users/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateUserForm user={user} />
</main>)
}