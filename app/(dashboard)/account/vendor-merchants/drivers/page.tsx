import { prisma } from "@/scripts";
import Link from "next/link";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { FaPlus } from "react-icons/fa";
import { fetchMerchantDrivers, getProfileUser } from "@/app/utils/data";
import {
  UserNumbersCardSingle,
} from "@/app/ui/cards";
import { Availability } from "@/app/components/availability";
import { auth } from "@/auth";
import MerchantDrivers from "@/app/ui/merchant-drivers";

export const metadata: Metadata = {
  title: "Drivers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) 
 {
  const {query:queryParams,page, availability: availabilityParams} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  const availability = availabilityParams || "";

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const id = profile?.id || 1000

  const total = await fetchMerchantDrivers(id, query, availability);

  const totalDrivers = await prisma.users.count({
    where: {role: 'driver', fleetid:id}
  })

  const totalTrucks = await prisma.trucks.count({
    where: {truck_fleetowner:id}
  })

  return (
    <main className="w-full md:w-[1150px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            { label: "Vendor Merchants", href: "/account/vendor-merchants" },
            {
              label: "Drivers",
              href: "/account/vendor-merchants/drivers",
              active: true,
            },
          ]}
        />
      </div>


      <div className="w-full rounded-lg border-2 border-gray-200 p-3">
        <div className="flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Drivers</h2>

          <div className="flex w-[150px] justify-center items-center bg-sky-300 p-2 rounded">
            <FaPlus size={20} className="mr-1"/>
              <Link href='/account/vendor-merchants/drivers/create'>Add New Driver</Link>
          </div>
        </div>

        <div className="w-full md:flex justify-between items-center my-3 py-3">
        <UserNumbersCardSingle
              num={totalDrivers}
              name='total driver'
            />

<UserNumbersCardSingle
              num={totalTrucks}
              name='total truck'
            />
        </div>



        <div className="w-full md:flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Overall Drivers List</h2>

          <div className="flex justify-end items-center">
              <Availability />
          </div>
        </div>

        <MerchantDrivers
          id={id}
          query={query}
          currentPage={currentPage}
          availability={availability}
        />

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={total} />
        </div>
      </div>
    </main>
  );
}
