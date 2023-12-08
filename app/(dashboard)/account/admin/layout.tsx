import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import {AdminSideBar} from '@/app/components/admin-sidebar'
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { signOut, auth } from '@/auth'
import { ErrorBoundary } from "react-error-boundary";

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Orban Springs',
  description: 'Orban Springs website',
}

async function getUser(email: string) {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/userinfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email})
    })

    const profile = await response.json()

        return profile
  }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const userInfo = await auth()

    const userEmail = userInfo?.user.email || ''

    const userprofile = userEmail !== '' && await getUser(userEmail)

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
     <div className="flex flex-col items-start my-2 py-2">
      {userInfo?.user.name} <form action={async() => {
        'use server'
        await signOut()
          }}><button className="flex h-[32px] grow items-center bg-black justify-center gap-2 ml-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-1 md:px-2">
          <PowerIcon className="ml-2 h-5 w-5 text-slate-700" />
          <div className="hidden md:block text-slate-600">Sign Out</div>
        </button>
      </form>

        </div> 

      </div>
      <div>
              </div>

        <AdminSideBar />
      </div>
      <div className='p-2 md:p-8'>{children}</div>
      </div>
    </div>


  )
}
