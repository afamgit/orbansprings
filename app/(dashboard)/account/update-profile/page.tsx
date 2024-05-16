import Image from 'next/image'
import {prisma} from '@/scripts'
import { BottomAppBannerHorizontal } from '@/app/components/bottom-app-banner-horizontal'
import { Metadata } from 'next';
import { getProfileUser } from '@/app/utils/data';
import { auth } from '@/auth';
import SignOut from '@/app/ui/signout';
import { UpdateProfileForm } from '@/app/components/update-profile-form';
import { DeleteAccount } from '@/app/ui/buttons';
import Link from 'next/link';
import SignOutUser from '@/app/ui/signout-user';

export const metadata: Metadata = {
  title: 'Update Profile',
};

export default async function Page() {

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const areagroups = await prisma.area_groups.findMany()

const id = profile?.id.toString() || ''

const profileImg = profile?.photo?.includes('profile') ? `https://orbansprings.com/${profile.photo}` : `${profile?.photo}`

  return (
    <div className="bg-gray-100 text-gray-900">

      <div className="max-w-[1200px] mx-auto justify-center items-start p-8">

<h3 className='my-2 py-2 text-2xl font-bold'>Profile</h3>
      <Image
              height={300}
              width={300}
              src={`${profileImg}`}
              alt={profile?.name || ''}
              className='rounded-full h-[200px] w-[200px] mt-6'
            />



        <h3 className='my-3 py-2 text-2xl font-bold'>Personal settings</h3>
        <div className='border-2 border-gray-200 p-3 rounded-lg'>

        <UpdateProfileForm profile={profile} areagroup={areagroups} />

        <div className='p-4 rounded-lg border-2 border-stale-100 my-3'>
        <h3 className='py-2 text-xl font-bold'>Change Password</h3>
        <p className='mb-3'>You can change your password</p>

        <Link className='bg-blue-300 rounded text-gray-800 px-3 py-2' href='/account/change-password'>Change Password</Link>
</div>

<div className='p-4 rounded-lg border-2 border-stale-100 my-3'>
        <h3 className='py-2 text-xl font-bold mb-3'>Log Out User</h3>

        <SignOutUser />
</div>

<div className='p-4 rounded-lg border-2 border-stale-100 my-3'>
        <h3 className='py-2 text-xl font-bold'>Delete User</h3>
        <p className='mb-3'>When you delete your account, your comments and reviews are deleted. Once deleted they cannot be restored</p>

        <DeleteAccount id={id} />
</div>
        </div>


       </div>

    </div>
  )
}
