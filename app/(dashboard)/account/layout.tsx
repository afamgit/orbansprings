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
  const userInfo = await auth();

  const usremail = userInfo?.user.email || "";

  const profile = await prisma?.users.findFirst({
    where: { email: usremail },
    select: {
      id: true,
      username: true,
      role: true,
      photo: true,
    },
  });

  return (
    <div className="w-full min-h-screen">
      <div className="md:hidden bg-black text-white py-2 flex flex-col justify-between items-center">
        <div className="w-full">
          {profile?.role === "admin" ? <AdminTopBar /> : <IotTopBar />}
        </div>
      </div>
      <div className="flex justify-start items-start">
        <div className="h-screen sticky top-0 hidden md:h-full flex flex-shrink-0 md:block w-full md:w-1/5 bg-sky-400 text-white">
          <div className="w-full flex flex-col justify-start bg-black bg-opacity-10 items-start p-2 md:p-5">
            <div className="flex justify-center items-center my-2 py-2 text-xl">
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
          <div className="min-h-screen bg-black bg-opacity-10 py-3">
            <div className="w-full my-2 py-2">
              {profile?.role === "admin" ? <AdminSideBar /> : <IotSideBar />}
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
                  className="rounded-full"
                  src={`/${profile?.photo}`}
                  height={50}
                  width={50}
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
