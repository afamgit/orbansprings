import Link from "next/link";
import { prisma } from "@/scripts";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { SubscriptionType } from "@/app/components/subscrription-type";
import { Location } from "@/app/components/location";
import Orders from "@/app/ui/orders";
import { Product } from "@/app/components/product";
import { fetchOrders, fetchRequests } from "@/app/utils/data";
import { StatusRequests } from "@/app/components/status-requests";
import VendorRequests from "@/app/ui/vendor-merchants-requests";

export const metadata: Metadata = {
  title: "Vendor Merchants | Requests | Drivers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: any;
}) 
 {
  const {query:queryParams,page, status: statusParams, location:locationParams, product:productParams} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  const status = statusParams || "Pending";
  const location = locationParams || "";
  const product = productParams || "";

  const allProducts = await prisma.products.findMany({
    where: {category: 'Water packages'},
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const total = await fetchRequests(query, product, status, location);

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            { label: "Requests", href: "/account/requests", active: true },
          ]}
        />
      </div>

      <div className="w-full md:flex justify-between items-center my-3">

        <div className="flex justify-end items-end">
        <div>
                <Product allproducts={allProducts} />
              </div>
        <div className="mx-1 bg-white border-2 border-bg-sky-300">
              <StatusRequests />
            </div>
            <div>
              <Location />
            </div>
        </div>
      </div>


      <VendorRequests
        query={query}
        currentPage={currentPage}
        product={product}
        status={status}
        location={location}
      />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={total} />
      </div>
    </main>
  );
}
