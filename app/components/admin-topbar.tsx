'use client'

import React, {useState, useEffect} from 'react'
import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { AiFillCloseSquare } from "react-icons/ai"
import { BsList,  } from "react-icons/bs"

export function AdminTopBar ({role}: {role:string}) {


    const pathname = usePathname()

    const [showMenu, setShowMenu] = useState(false)


     return (
    <div className="bg-neutral-800">    

            <div className="relative md:hidden">
            {!showMenu && <button className="text-4xl" onClick={() => setShowMenu(true)}><BsList /></button>}
          {showMenu && (
            <div className="absolute p-3 w-[300px] top-0 right-[40px] left-[-220px]">
              <div className="flex justify-end content-end bg-black pr-10">
                <button
                  className="text-5xl rounded"
                  onClick={() => setShowMenu(false)}
                >
                  <AiFillCloseSquare />
                </button>
              </div>

              {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/home'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Dashboard
                </div>
            </Link>}
            {(role === 'admin' || role === 'iot') && <Link onClick={() => setShowMenu(false)} href='/account/admin/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Meters
                </div>
            </Link>}
            {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Commissions
                </div>
            </Link>}
            {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/users'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Users
                </div>
            </Link>}
            {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/complaints'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Complaints
                </div>
            </Link>}
            {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/content-pages'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Pages
                </div>
            </Link>}
            {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/teams'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Team Members
                </div>
            </Link>}
            {role === 'admin' && <Link onClick={() => setShowMenu(false)} className='p-3' href='/account/admin/testimonials'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 bg-slate-100 text-black`}>
                    <FaSquareFull className='h-6 w-6 mr-2' /> Testimonials
                </div>
            </Link>}

            </div>
          )}
        </div>

      </div>

  );
};
