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
import { auth } from "@/auth";
import MerchantTrucks from "@/app/ui/merchant-trucks";
import { Status } from "@/app/components/status";

export const metadata: Metadata = {
  title: "Fleet",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) 
 {
  const {query:queryParams,page, status: statusParams} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  const status = statusParams || "";

  const userInfo = await auth();

  const profile = await getProfileUser(userInfo?.user.email || "");

  const id = profile?.id || 1000;

  const total = await fetchMerchantDrivers(id, query, status);

  const totalDrivers = await prisma.users.count({
    where: { role: "driver", fleetid: id },
  });

  const totalTrucks = await prisma.trucks.count({
    where: { truck_fleetowner: id },
  });

  return (
    <main className="w-full md:w-[1150px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            { label: "Vendor Merchants", href: "/account/vendor-merchants" },
            {
              label: "Fleet",
              href: "/account/vendor-merchants/fleet",
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full rounded-lg border-2 border-gray-200 p-3">
        <div className="flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Fleets</h2>

          <div className="flex w-[150px] justify-center items-center bg-sky-300 p-2 rounded">
            <FaPlus size={20} className="mr-1" />
            <Link href="/account/vendor-merchants/fleet/create">
              Add New Truck
            </Link>
          </div>
        </div>

        <div className="w-full md:flex justify-between items-center my-3 py-3">
          <UserNumbersCardSingle num={totalDrivers} name="total driver" />

          <UserNumbersCardSingle num={totalTrucks} name="total truck" />
        </div>

        <div className="w-full md:flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Overall Trucks List</h2>

          <div className="flex justify-end items-center">
            <Status />
          </div>
        </div>

        <MerchantTrucks
          id={id}
          query={query}
          currentPage={currentPage}
          status={status}
        />

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={total} />
        </div>
      </div>
    </main>
  );
}
