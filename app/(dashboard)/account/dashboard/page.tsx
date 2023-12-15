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
import BarChartDisplay from "../../../ui/charts/bar-chart";
import { FaSquareFull } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Dashboard",
};

const dataBar = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

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
        <div className="w-full flex justify-between items-center px-3">
          <div>
            <h1 className="text-2xl font-semibold capitalize ">
              Average Delivery Time
            </h1>
          </div>
          <div>
            <div className="w-full flex justify-start items-center text-xl">
              <FaSquareFull className="h-3 w-3 mr-1 text-zinc-400" /> Customers
              2 hrs
            </div>
            <div className="w-full flex justify-start items-center text-xl">
              <FaSquareFull className="h-3 w-3 mr-1 text-zinc-700" /> Drivers 1
              hr
            </div>
          </div>
        </div>
          <div className="w-4/5 flex justify-center items-center my-3 py-31">
            {averageDeliveryTime[1].map((item: any, i: number) => {
              return (
                <span key={i} className="px-2 text-sm">
                  {item.abb}: {item.name}
                </span>
              );
            })}
          </div>
          <BarChartDisplay data={averageDeliveryTime[0]} />
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
