'use client'

import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation";

export function VendorMerchantSideBar () {

    const pathname = usePathname()


     return (
    <div className="bg-neutral-800 text-white mt-3">    
          <Link className='p-3' href='/account/dashboard'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('dashboard') || pathname?.endsWith('account')) && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>
            <Link href='/account/drivers'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('drivers') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Drivers
                </div>
            </Link>
            <Link className='p-3' href='/account/orders'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('orders') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Orders
                </div>
            </Link>
            <Link className='p-3' href='/account/fleet'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('fleet') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Fleet
                </div>
            </Link>
            <Link className='p-3' href='/account/profile'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('profile') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Profile
                </div>
            </Link>

      </div>

  );
};
