'use client'

import React, {useState, useEffect} from 'react'
import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation"

export function AdminSideBar ({role}: {role:string}) {

    const pathname = usePathname()

     return (
    <div className="bg-neutral-800 text-white">    
          {role === 'admin' && <Link className='p-3' href='/account/admin/home'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('dashboard') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>}
            {(role === 'admin' || role === 'iot') && <Link href='/account/admin/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('meters') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Meters
                </div>
            </Link>}
            {role === 'admin' && <Link className='p-3' href='/account/admin/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('commissions') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Commissions
                </div>
            </Link>}
            {role === 'admin' && <Link className='p-3' href='/account/admin/users'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('users') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Users
                </div>
            </Link>}
            {role === 'admin' && <Link className='p-3' href='/account/admin/complaints'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('complaints') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Complaints
                </div>
            </Link>}
            {role === 'admin' && <Link className='p-3' href='/account/admin/content-pages'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('pages') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Pages
                </div>
            </Link>}
            {role === 'admin' && <Link className='p-3' href='/account/admin/teams'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('teams') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Team Members
                </div>
            </Link>}
            {role === 'admin' && <Link className='p-3' href='/account/admin/testimonials'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('testimonials') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Testimonials
                </div>
            </Link>}

         
      </div>

  );
};
