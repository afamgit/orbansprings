'use client'

import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation";

export function IotSideBar () {

    const pathname = usePathname()


     return (
    <div className="bg-neutral-800 text-white py-3">    
            <Link href='/account/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('meters') || pathname?.endsWith('numbers')) && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Meters
                </div>
            </Link>

      </div>

  );
};
