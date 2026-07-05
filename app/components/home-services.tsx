import Image from 'next/image'

const services = [
  {
    name: 'Orban Springs Mobile App',
    img: '/orban_springs_mobile_app.png',
    desc: 'Easily connect with providers and vendors, find water artisans and plumbers on the Orban Springs app.',
  },
  {
    name: 'Water Distribution',
    img: '/truck_icon.png',
    desc: 'We provide channels for efficient delivery of essential water supply services to communities, individuals and corporate entities through a network of partners and vendors.',
  },
  {
    name: 'Water Analysis',
    img: '/water_analysis_icon.png',
    desc: 'Gain accurate insights into your water quality with real-time water analysis',
  },
  {
    name: 'Vendor Platform',
    img: '/vendor_platform_icon.png',
    desc: 'Leverage technology to efficiently manage your water distribution business. Our vendor platform offers real-time analysis, interactive dashboards, fleet management tools and accurate insights into all aspects of your business',
  },
  {
    name: 'IoT Smart Meter',
    img: '/iot_smart_meter.png',
    desc: 'Remotely monitor, control and optimize your water systems. Our IoT smart meters provide real-time updates and tools for efficient water management, water accounting, billing and flow monitoring.',
  },
]

export async function HomeServices() {
  return (
    <div className="text-dark py-12 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className='text-4xl md:text-5xl text-slate-900 font-extrabold text-center mb-4 tracking-tight'>What We Offer</h1>
        <h3 className='text-center text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed'>
          We deliver technology-backed solutions for efficient water accessibility, water distribution and water management
        </h3>

        <div className='flex justify-center items-stretch flex-wrap gap-8'>
          {services.map((item, i) => {
            return (
              <div className='bg-white px-6 py-8 flex flex-col justify-between items-center w-[340px] rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300' key={i}>
                <div className="w-48 h-48 relative flex items-center justify-center bg-sky-50/50 rounded-2xl p-4 mb-4">
                  <Image
                    src={item.img}
                    height={180}
                    width={180}
                    alt={item.name}
                    className='object-contain hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='flex flex-col justify-start items-center text-center flex-grow'>
                  <h3 className='font-bold text-slate-800 text-xl mb-3'>{item.name}</h3>
                  <p className='text-sm text-slate-600 leading-relaxed'>{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
