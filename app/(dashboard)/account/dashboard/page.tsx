import Link from "next/link";
import { Metadata } from "next";
import {
  fetchAreaInfo,
  fetchAverageDeliveryTime,
} from "@/app/utils/data";
import { prisma } from "@/scripts";
import Products from "@/app/ui/products";
import LatestCustomers from "@/app/ui/latest-customers";
import DashboardCards from "@/app/ui/dashboard-cards";
import AreaWaterChart from "../../../ui/charts/area-water-chart";
import BarDeliveryDisplay from "../../../ui/charts/bar-delivery-time-chart";
import { FaSquareFull } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Dashboard",
};


export default async function Page() {
  // const areaInfo = await fetchAreaInfo();

  const averageDeliveryTime = await fetchAverageDeliveryTime();

  // console.log(areaInfo)

  // console.log(averageDeliveryTime)

  return (
    <main className="w-full flex flex-col justify-start items-center flex-wrap">
      <div className="w-full flex justify-between iteams-center my-2 py-2">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>

      <DashboardCards />

      <div className="w-full md:flex grid grid-cols-2 gap-4 my-3 py-3">
        <div className="w-full md:w-1/2 flex flex-col justify-end items-end bg-gray-300 rounded-lg py-4">
        
          
          <AreaWaterChart />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-end items-end bg-gray-300 rounded-lg py-4">
       
          <BarDeliveryDisplay />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row mx-2">
        <div className="w-full md:w-2/3 p-2 rounded-lg">
          <h2 className="text-3xl font-bold my-3 py-3">
            Overall Product Details
          </h2>
          <Products />
        </div>
        <div className="w-full md:w-1/3 p-2 rounded-lg">
          <h2 className="text-3xl font-bold my-3 py-3">Recent Customers</h2>
          <LatestCustomers />
        </div>
      </div>
    </main>
  );
}
