'use client'

import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation";

export function WaterMerchantSideBar () {

    const pathname = usePathname()


     return (
    <div className="bg-neutral-800 text-white mt-3">    
          <Link className='p-3' href='/account/dashboard'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('dashboard') || pathname?.endsWith('account')) && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>
            <Link href='/account/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('meters') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Meters
                </div>
            </Link>
            <Link className='p-3' href='/account/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('commissions') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Commissions
                </div>
            </Link>

      </div>

  );
};
