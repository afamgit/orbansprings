import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import {AdminSideBar} from '@/app/components/admin-sidebar'
import UserBox from '@/app/components/user-box'
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { signOut, auth } from '@/auth'
import { ErrorBoundary } from "react-error-boundary";

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

  return (

      <div className='w-full min-h-screen flex justify-start bg-slate-100 items-start'>
        <div className='flex justify-start items-start'>
          <div className='h-screen sticky top-0 hidden md:h-full flex flex-shrink-0 md:block md:w-[250px] bg-neutral-800 text-white'>
            <UserBox />
          </div> 
          <div className='p-2 md:p-8'>{children}</div>
        </div>
    </div>
   

  )
}
