'use client'

import React, {useState, useEffect} from 'react'
import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { AiFillCloseSquare } from "react-icons/ai"
import { BsList,  } from "react-icons/bs"

export function AdminSideBar ({role}: {role:string}) {


    const pathname = usePathname()

    const [showMenu, setShowMenu] = useState(false)


     return (
    <div className="bg-neutral-800 text-white">    
          {role === 'admin' && <Link className='p-3' href='/account/admin/home'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('dashboard') && 'bg-slate-100 text-black'}`}>
                    <FaSquareFull className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>}
            {(role === 'admin' || role === 'iot') && <Link href='/account/admin/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname.endsWith('meters') || pathname.endsWith('numbers') && 'bg-slate-100 text-black'}`}>
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

            <div className="relative sm:hidden">
          <button className="text-4xl" onClick={() => setShowMenu(true)}><BsList /></button>
          {showMenu && (
            <div className="absolute bg-white p-3 w-[200px] top-0 right-[100px] left-[-150px]">
              <div className="flex justify-end content-end">
                <button
                  className="text-5xl rounded"
                  onClick={() => setShowMenu(false)}
                >
                  <AiFillCloseSquare />
                </button>
              </div>

              <ul className="list-none gap-4">
                <li className="p-2"><Link onClick={() => setShowMenu(false)} href='/'>Home</Link></li>
                <li className="p-2"><Link onClick={() => setShowMenu(false)} href='/services'>Services</Link></li>
                <li className="p-2"><Link onClick={() => setShowMenu(false)} href='/about'>About</Link></li>
                <li className="p-2"><Link onClick={() => setShowMenu(false)} href='/faq'>FAQ</Link></li>
                <li className="p-2"><Link onClick={() => setShowMenu(false)} href='/contact'>Contact</Link></li>
                <li className="p-2"><Link onClick={() => setShowMenu(false)} href='/press'>Press</Link></li>
                <li className="py-2 px-4 rounded bg-blue-800 text-white">
                  Download App
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>

  );
};
