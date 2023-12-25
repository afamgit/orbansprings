import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import {AdminSideBar} from '@/app/components/admin-sidebar'
import { AdminTopBar } from '@/app/components/admin-topbar'
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { signOut, auth, getUserFromEmail } from '@/auth'
import { ErrorBoundary } from "react-error-boundary";
import UserBox from '@/app/components/user-box';
import SignOut from '../../ui/signout';
import { IotTopBar } from '@/app/components/iot-topbar'
import { IotSideBar } from '@/app/components/iot-sidebar'
import Link from 'next/link'
 

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

  const userInfo = await auth()

  const usremail = userInfo?.user.email || ''

  const profile = await getUserFromEmail(usremail)


  return (

    <div className='w-full min-h-screen bg-slate-100'>
      <div className='md:hidden bg-black text-white py-2 flex flex-col justify-between items-center'>
        <div className='w-full flex justify-between items-center'>
          <div className='pl-5'>{userInfo?.user.name}</div>
        <div className='py-1'><SignOut /></div>
        </div>
      <div className='w-full'>{profile?.role === 'admin' ? <AdminTopBar /> : <IotTopBar />}</div>
      </div>
      <div className='flex justify-start items-start'>
      <div className='h-screen sticky top-0 hidden md:h-full flex flex-shrink-0 md:block md:w-[250px] bg-sky-400 text-white'>
      <div className="w-full flex flex-col justify-start bg-black bg-opacity-10 items-start p-2 md:p-5">
      <div
          className="flex justify-center items-center my-2 py-2 text-xl"
        >
                          <Image src='/logo_full.jpeg' height={48} width={48} alt="logo" className='rounded' />
          <p className='ml-2 pl-2'>Orban Springs</p>
      </div>
      </div>
      <div className='min-h-screen bg-black bg-opacity-10 py-3'>
        <p className='p-3'>{userInfo?.user.name}</p>

      <div className='my-2 py-2'><SignOut /></div>

      <div className='w-full my-2 py-2'>{profile?.role === 'admin' ? <AdminSideBar /> : <IotSideBar />}</div>

              </div>

      </div>
      <div className='p-2 md:p-8 w-screen'>{children}</div>
      </div>
    </div>


  )
}
