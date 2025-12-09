import '@/app/globals.css'
import Image from 'next/image';
import { auth } from '@/auth'

import SignOut from '../ui/signout';

export default async function UserBox() {

  const userInfo = await auth()

  const usremail = userInfo?.user.email || ''

  const profile = await prisma?.users.findFirst({
    where: {email: usremail},
    select: {
      id: true,
      username: true,
      photo: true
    }
  })


  
return (

    <div className='w-full min-h-screen flex justify-start bg-slate-100 items-start'>
    <div className='flex justify-start items-start'>
    <div className='h-screen sticky top-0 hidden md:h-full flex flex-shrink-0 md:block md:w-[250px] bg-neutral-800 text-white'>
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-5">
    <div
        className="flex justify-center items-center my-2 py-2 text-2xl">
                  {profile?.username}
<div className='flex w-12 h-12 mr-2'>
          <Image className='rounded-full' src={`${profile?.photo}`} height={50} width={50} alt="logo" /> 
      </div>
    </div>

   <div className="flex flex-col items-start my-2 py-2">
      <SignOut />

      </div>     

    </div>
    <div>
            </div>
    </div> 
    </div>
  </div>
 

)
}
