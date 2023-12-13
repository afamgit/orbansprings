'use client'

import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation";

export function AdminSideBar () {

    const pathname = usePathname()


     return (
    <div className="bg-neutral-800 text-white mt-3">    
          <Link className='p-3' href='/account/dashboard'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('dashboard') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>
            <Link href='/account/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('meters') || pathname?.endsWith('numbers')) && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Meters
                </div>
            </Link>
            <Link className='p-3' href='/account/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('commissions') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Commissions
                </div>
            </Link>
            <Link className='p-3' href='/account/users'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('users') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Users
                </div>
            </Link>
            <Link className='p-3' href='/account/complaints'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('complaints') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Complaints
                </div>
            </Link>
            <Link className='p-3' href='/account/content-pages'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('pages') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Pages
                </div>
            </Link>
            <Link className='p-3' href='/account/teams'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('teams') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Team Members
                </div>
            </Link>
            <Link className='p-3' href='/account/testimonials'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('testimonials') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Testimonials
                </div>
            </Link>


      </div>

  );
};
