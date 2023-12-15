import { prisma } from '@/scripts';
import { UpdateMeterForm } from '@/app/components/meter-form';
import { fetchCustomers } from '@/app/utils/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';
import moment from 'moment';

export const metadata: Metadata = {
    title: 'Message',
  };

export default async function Message({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const message = await prisma.contact_messages.findUnique({
        where: {
            cid: id
        }
    })

    return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Complaints',
                href: '/account/complaints',
              },
              {
                label: 'View Message',
                href: `/account/complaints/${id}/view`,
                active: true,
              },
            ]}
            />
            </div>
    
    <div className='w-full flex flex-col justify-start items-start p-6'>
        <div className='my-1 py-2 w-full flex justify-start items-end'>
            <p className='text-slate-600 px-2'>Date:</p>
            <div className='text-xl'>{moment(message?.createdAt).format('Do, MMM YYYY | h:mma')}</div>
        </div>
        <div className='my-1 py-2 w-full flex justify-start items-end'>
        <p className='text-slate-600 px-2'>Name:</p>
            <div className='text-xl'>{message?.cname}</div>
        </div>
        <div className='my-1 py-2 w-full flex justify-start items-end'>
        <p className='text-slate-600 px-2'>Email address:</p>
            <div className='text-xl'>{message?.cemail}</div>
        </div>
        <div className='my-1 py-2 w-full flex justify-start items-end'>
        <p className='text-slate-600 px-2'>Phone Number:</p>
            <div className='text-xl'>{message?.cphone}</div>
        </div>
        <div className='my-1 py-2 w-full flex justify-start items-end'>
        <p className='text-slate-600 px-2'>Subject:</p>
            <div className='text-xl'>{message?.csubject}</div>
        </div>
        <div className='my-1 py-2'>
        <p className='text-slate-600 px-2'>Message:</p>
            <div className='text-xl px-2' dangerouslySetInnerHTML={{__html: message?.cmessage || ''}} />
            </div>

            <Link className='my-3 py-3 px-4 rounded-lg bg-zinc-800 text-white' href='/account/complaints'>Back to complaints</Link>
    </div>
    </main>
    )

}