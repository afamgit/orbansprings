import { Metadata } from "next";
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

      <div className="w-full flex justify-start items-start"><WaterMerchantQrCode id={profile?.id.toString() || ''} name={profile?.username.toString() || ''} type="" /></div>


    </div>
  );
}
