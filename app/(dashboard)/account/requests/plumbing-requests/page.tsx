import Link from "next/link";
import { prisma } from "@/scripts";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { Location } from "@/app/components/location";
import { Product } from "@/app/components/product";
import { fetchRequestsPlumbing } from "@/app/utils/data";
import { StatusRequests } from "@/app/components/status-requests";
import RequestsPlumbing from "@/app/ui/requests-plumbing";

export const metadata: Metadata = {
  title: "Requests | Plumbing",
};

export default async function Page({
  searchParams,
}: 
{ 
  searchParams?: any;
}) {
  const {query:queryParams,page, status:statusParams, location: locationParams, product: productParams} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  const status = statusParams || "Pending";
  const location = locationParams || "";
  const product = productParams || "";

  const allProducts = await prisma.products.findMany({
    where: {category: 'Plumbing'},
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const total = await fetchRequestsPlumbing(query, product, status, location);

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            { label: "Plumbing Requests", href: "/account/requests/plumbing-requests", active: true },
          ]}
        />
      </div>

      <div className="w-full md:flex justify-between items-center my-3">
        <div className="p-2">
          <Link
            className="text-3xl text-gray-400 font-medium pr-2"
            href="/account/requests"
          >
            Driver Requests
          </Link>
          <Link
            className="text-3xl text-gray-400 font-medium px-2"
            href="/account/requests/tank-requests"
          >
            Tank Cleaning
          </Link>
          <Link
            className="text-3xl text-gray-900 font-medium px-2"
            href="/account/requests/plumbing-requests"
          >
            Plumbing
          </Link>
        </div>
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


      <RequestsPlumbing
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
