import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AdminSideBar } from "@/app/components/admin-sidebar";
import { AdminTopBar } from "@/app/components/admin-topbar";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { auth } from "@/auth";
import { ErrorBoundary } from "react-error-boundary";
import UserBox from "@/app/components/user-box";
import SignOut from "../../ui/signout";
import { IotTopBar } from "@/app/components/iot-topbar";
import { IotSideBar } from "@/app/components/iot-sidebar";
import Link from "next/link";
import { TopBar } from "@/app/components/topbar";
import { SearchBar } from "@/app/components/search-bar";
import { FaBell } from "react-icons/fa";
import { Bell } from "@/app/components/svgicons";
import { prisma } from "@/scripts";
import { VendorMerchantSideBar } from "@/app/components/vendor-merchants/sidebar";
import { VendorMerchantTopBar } from "@/app/components/vendor-merchants/topbar";
import { WaterMerchantSideBar } from "@/app/components/water-merchants/sidebar";
import { WaterMerchantTopBar } from "@/app/components/water-merchants/topbar";
import { getProfileUser } from "@/app/utils/data";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orban Springs",
  description: "Orban Springs website",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userInfo = await auth()

  const usrEmail = userInfo?.user.email || ''

  const profile = await getProfileUser(usrEmail)
  
  const profileImg = profile?.photo?.includes('profile') ? `https://orbansprings.com/${profile.photo}` : profile?.photo?.includes('noimage') ? `https://support.orbansprings.com/${profile.photo}` : `/${profile?.photo}`


  return (
    <div className="w-full min-h-screen bg-white">
      <div className="md:hidden bg-black text-white py-2 flex flex-col justify-between items-center">
        <div className="w-full">
          {profile?.role === "admin" ? <AdminTopBar /> : profile?.role === "fleetownerdriver" ? <VendorMerchantTopBar /> : profile?.role === "fleetownermeter" ? <WaterMerchantTopBar /> : redirect('/login')}
        </div>
      </div>
      <div className="flex justify-start items-start">
        <div className={`h-screen sticky top-0 bottom-0 hidden md:h-screen flex flex-shrink-0 md:block w-full md:w-1/5 ${profile?.role === "admin" ? 'bg-sky-400' : 'bg-neutral-800'} text-white`}>
          <div className="w-full flex flex-col justify-start items-start p-2 md:px-5 md:py-1">
            <div className="flex justify-center items-center my-1 py-1 text-xl">
              <Image
                src="/logo_full.png"
                height={48}
                width={48}
                alt="logo"
                className="rounded"
              />
              <p className="ml-2 pl-2">Orban Springs</p>
            </div>
          </div>
          <div className="pt-1">
            <div className="w-full h-full overflow-y-auto md: h-[750px]">
            {profile?.role === "admin" ? <AdminSideBar /> : profile?.role === "fleetownerdriver" ? <VendorMerchantSideBar /> : profile?.role === "fleetownermeter" ? <WaterMerchantSideBar /> : redirect('/login') }
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5">
          <div className="w-full p-2 md:p-6 sticky top-0 bg-white flex justify-between items-center">
            <div className="w-1/2">
              <SearchBar />
            </div>
            <div className="flex justify-between items-center w-[220px]">
              <Link href="/account/notifications">
                <Bell />
              </Link>
              <div className="flex justify-start items-center bg-sky-100 w-[180px] rounded px-3 py-2 ">
                {profile?.username} 
                <Image
                  className="rounded-full ml-2"
                  src={`${profileImg}`}
                  height={30}
                  width={30}
                  alt="logo"
                />
                <SignOut />
              </div>
            </div>
          </div>
          <div className="p-2 md:p-8 w-full md:w-[1150px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
