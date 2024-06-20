import { prisma } from "@/scripts";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { fetchVendorOrders, getProfileUser } from "@/app/utils/data";
import { auth } from "@/auth";
import VendorOrders from "@/app/ui/vendor-orders";
import { DriverNumbersCard } from "@/app/ui/cards";

export const metadata: Metadata = {
  title: "Vendor Merchant Orders",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const fleet = profile?.id.toString() || ''


  const allDrivers = await prisma.users.count({
    where: {fleetid: parseInt(fleet)},
  });

  const available = await prisma.users.count({
    where: {fleetid: parseInt(fleet), isavailable: true},
  });

  const unavailable = await prisma.users.count({
    where: {fleetid: parseInt(fleet), isavailable: false},
  });

  const availablePercent = available > 0 ? (available * 100) / allDrivers : 0
  const unavailablePercent = unavailable > 0 ? (unavailable * 100) / allDrivers : 0

  const total = await fetchVendorOrders(query, fleet);

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            { label: "Vendor Merchant", href: "/account/vendor-merchants" },
            { label: "Orders", href: "/account/vendor-merchants/orders", active: true },
          ]}
        />
      </div>

      <div className="flex justify-around items-center my-2 py-3">
        <DriverNumbersCard name="your drivers" num={allDrivers} percent={''} />
        <DriverNumbersCard name="available drivers" num={available} percent={availablePercent.toString()} />
        <DriverNumbersCard name="unavailable drivers" num={unavailable} percent={unavailablePercent.toString()} />
      </div>


      <VendorOrders
        query={query}
        currentPage={currentPage}
        fleet={fleet}
      />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>
    </main>
  );
}
