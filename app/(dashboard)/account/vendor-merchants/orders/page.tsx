import { prisma } from "@/scripts";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { fetchVendorOrders, getProfileUser } from "@/app/utils/data";
import { auth } from "@/auth";
import VendorOrders from "@/app/ui/vendor-orders";

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


  const allProducts = await prisma.products.findMany({
    where: {category: 'Water packages'},
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

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

      <div className="flex justify-between items-center my-2 py-3">
        
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
