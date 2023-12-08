'use client'

import React, {useState, useEffect} from 'react'
import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation"

export function AdminSideBarFormatter ({role, name, url}: {role:string, name:string, url:string}) {

    const pathname = usePathname()

     return (
    <div className="bg-neutral-800 text-white">    
          {role === 'admin' && <Link className='p-3' href={url}>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith(`${name}`) && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> {name}
                </div>
            </Link>}         
      </div>

  );
};
