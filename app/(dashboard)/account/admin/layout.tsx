import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import {AdminSideBar} from '@/app/components/admin-sidebar'
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { signOut, auth } from '@/auth'
import { ErrorBoundary } from "react-error-boundary";
import UserBox from '@/app/components/user-box';
import SignOut from '../../../ui/signout';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Orban Springs',
  description: 'Orban Springs website',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userInfo = await (auth())

  return (

    <div className='w-full min-h-screen flex justify-start bg-slate-100 items-start'>
      <div className='flex justify-start items-start'>
      <div className='h-screen sticky top-0 hidden md:h-full flex flex-shrink-0 md:block md:w-[250px] bg-neutral-800 text-white'>
      <div className="w-full flex flex-col justify-start items-start p-2 md:p-5">
      <div
          className="flex justify-center items-center my-2 py-2 text-2xl"
        ><div className='flex w-12 h-12 mr-2'>
            <Image className='rounded' src='/logo_full.jpeg' height={50} width={50} alt="logo" /> 
        </div>
          Orban Springs
      </div>
      </div>
      <div>
        <p>{userInfo?.user.name}</p>
      <SignOut />
              </div>

        <AdminSideBar />
      </div>
      <div className='p-2 md:p-8'>{children}</div>
      </div>
    </div>


  )
}
