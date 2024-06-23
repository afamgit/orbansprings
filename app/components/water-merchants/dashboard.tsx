import Link from "next/link";
import { Metadata } from "next";
import Products from "@/app/ui/products";
import LatestCustomers from "@/app/ui/latest-customers";
import DashboardCards from "@/app/ui/dashboard-cards";
import AreaWaterChart from "../../ui/charts/area-water-chart";
import BarDeliveryDisplay from "../../ui/charts/bar-delivery-time-chart";
import { auth } from "@/auth";
import { getProfileUser } from "@/app/utils/data";
import WaterMerchantQrCode from "../water-merchant-qr-code";

export const metadata: Metadata = {
  title: "Water Merchant Dashboard",
};


export default async function WaterMerchantDashboard() {

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")
  
  return (
    <div className="w-full flex flex-col justify-start items-center flex-wrap">
      <div className="w-full flex justify-between iteams-center my-2 py-2">
        <h1 className="font-bold text-2xl">Water Merchant Dashboard</h1>
      </div>

      <div className="w-full flex justify-start items-start"><WaterMerchantQrCode id={profile?.id.toString() || ''} name={profile?.name.toString() || ''} type="" /></div>


    </div>
  );
}
