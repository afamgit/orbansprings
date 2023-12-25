import Link from "next/link";
import { Metadata } from "next";
import Products from "@/app/ui/products";
import LatestCustomers from "@/app/ui/latest-customers";
import DashboardCards from "@/app/ui/dashboard-cards";
import AreaWaterChart from "../ui/charts/area-water-chart";
import BarDeliveryDisplay from "../ui/charts/bar-delivery-time-chart";

export const metadata: Metadata = {
  title: "Meter Owner Dashboard",
};


export default async function MeterOwnerDashboard() {


  return (
    <main className="w-full flex flex-col justify-start items-center flex-wrap">
      <div className="w-full flex justify-between iteams-center my-2 py-2">
        <h1 className="font-bold text-2xl">Meter Owner Dashboard</h1>
      </div>

      <div className="w-full md:flex grid grid-cols-2 gap-4 my-3 py-3">
        <div className="w-full md:w-1/2 flex flex-col justify-end items-end bg-gray-300 rounded-lg py-4">
        
        Meter per area | Water Analysis | Recent Vendors
          
          <AreaWaterChart /> | Order count per area
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-end items-end bg-gray-300 rounded-lg py-4">
       {/* Overall Sales details */}
        </div>
      </div>

    </main>
  );
}
