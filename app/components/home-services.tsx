import Link from "next/link"
import Image from 'next/image'
import { siteUrl } from "../utils/utils";

const services = [
  {
    name: 'Orban Springs Mobile App',
    img: `${siteUrl}/orban_springs_mobile_app.jpeg`,
    desc: 'Easily connect with providers and vendors, find water artisans and plumbers on the Orban Springs app.',
  },
  {
    name: 'Water Distribution',
    img: `${siteUrl}/truck_icon.jpeg`,
    desc: 'We provide channels for efficient delivery of essential water supply services to communities, individuals and corporate entities through a network of partners and vendors.',
  },
  {
    name: 'Water Analysis',
    img: `${siteUrl}/water_analysis_icon.jpeg`,
    desc: 'Gain accurate insights into your water quality with real-time water analysis',
  },
  {
    name: 'Vendor Platform',
    img: `${siteUrl}/vendor_platform_icon.jpeg`,
    desc: 'Leverage technology to efficiently manage your water distribution business. Our vendor platform offers real-time analysis, interactive dashboards, fleet management tools and accurate insights into all aspects of your business',
  },
  {
    name: 'IoT Smart Meter',
    img: `${siteUrl}/iot_smart_meter.jpeg`,
    desc: 'Remotely monitor, control and optimize your water systems. Our IoT smart meters provide real-time updates and tools for efficient water management, water accounting, billing and flow monitoring.',
  },
]

export async function HomeServices() {

  return (
    <div className="text-dark">
      <h1 className='text-3xl md:text-4xl text-gray-800 font-medium text-center my-2 py-2'>What We Offer</h1>
      <h3 className='text-center text-2xl text-gray-800 mb-3'>We deliver technology-backed solutions for efficient water accessibility, water distribution and water management</h3>

      <div className='w-full md:max-w-[1300px] mx-auto flex justify-center items-center flex-wrap bg-gray-100'>
        {services.map((item, i) => {
          return <div className='px-1 py-3 flex flex-col justify-center items-center w-[350px] h-[400px] mx-7 my-3 rounded' key={i}>
            <div className="w-64 h-64">
              <Image
                src={item.img}
                height={300}
                width={300}
                alt={item.name}
                className='rounded p-2'
              /></div>
            <div className='flex flex-col justify-start items-center my-2 h-[300px]'>
              <h3 className='font-bold text-gray-800 text-2xl my-2 py-2'>{item.name}</h3>
              <p className='text-xl text-gray-800 text-center'>{item.desc}</p>
            </div>
          </div>
        })}
      </div>

    </div>
  );
};
