import Image from 'next/image'
import {prisma} from '@/scripts'
import { BottomAppBannerHorizontal } from '@/app/components/bottom-app-banner-horizontal'
import { Metadata } from 'next';
import { getProfilePassword } from '@/app/utils/data';
import { auth } from '@/auth';
import { UpdateProfileForm } from '@/app/components/update-profile-form';
import { ChangePasswordForm } from '@/app/components/change-password-form';

export const metadata: Metadata = {
  title: 'Change Password',
};

export default async function Page() {

  const userInfo = await auth()

  const profile = await getProfilePassword(userInfo?.user.email || "")

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="max-w-[1200px] mx-auto h-full md:h-[500px] md:flex md:justify-center md:items-start p-8">
        <ChangePasswordForm profile={profile} />

       </div>
    </div>
  )
}
