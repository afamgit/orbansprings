'use client'

import Link from "next/link"
import { FaClock, FaDashcube, FaReadme, FaUser } from "react-icons/fa"
import { usePathname } from "next/navigation";

export function WaterMerchantSideBar () {

    const pathname = usePathname()


     return (
    <div className="bg-neutral-800 text-white mt-3">    
          <Link className='p-3' href='/account/water-merchants'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('dashboard') || pathname?.endsWith('account')) && 'bg-slate-100 text-black'}`}>
                    <FaDashcube className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>
            <Link href='/account/water-merchants/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('meters') && 'bg-slate-100 text-black'}`}>
                    <FaClock className='h-8 w-8 mr-2' /> Meters
                </div>
            </Link>
            <Link className='px-1' href='/account/water-merchants/meter-readings'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl ${pathname?.endsWith('meter-readings') && 'bg-slate-100 text-sky-400 py-1'}`}>
                    <FaReadme className='h-8 w-8 mr-2' /> Meter Readings
                </div>
            </Link>
            {/* <Link className='p-3' href='/account/water-merchants/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('commissions') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Commissions
                </div>
            </Link> */}
            <Link className='px-1' href='/account/update-profile'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl ${(pathname?.endsWith('profile') || pathname?.endsWith('password')) && 'bg-slate-100 text-sky-400 py-1'}`}>
                    <FaUser className='h-8 w-8 mr-2' /> Profile
                </div>
            </Link>

      </div>

  );
};
