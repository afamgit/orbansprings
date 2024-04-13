'use client'

import Link from "next/link"
import Image from "next/image";
import { FaSquareFull } from "react-icons/fa"
import { CiGrid42 } from "react-icons/ci";
import { BiTachometer, BiMessageDetail } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { RiPagesLine, RiQuestionAnswerFill, RiTeamLine } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { TbBriefcase2, TbCurrencyDollar } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { CommissionIcon, CommissionIconWhite, ComplaintsIcon, ComplaintsIconWhite, DashboardIcon, DashboardIconWhite, MeterIcon, MeterIconWhite, Users, UsersWhite } from "./svgicons";

export function AdminSideBar () {

    const pathname = usePathname()


     return (
    <div className="text-white mt-3">    
          <Link className='px-3 py-4' href='/account/dashboard'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('dashboard') || pathname?.endsWith('account')) && 'bg-slate-100 text-sky-400 py-3'}`}>
                    {(pathname?.endsWith('dashboard') || pathname?.endsWith('account')) ? <DashboardIcon /> : <DashboardIconWhite />} <span className="ml-2">Dashboard</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('meters') || pathname?.endsWith('numbers')) && 'bg-slate-100 text-sky-400 py-3'}`}>
                {(pathname?.endsWith('meters') || pathname?.endsWith('numbers')) ? <MeterIcon /> : <MeterIconWhite />} <span className="ml-2">Meters</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/orders'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('water') || pathname?.endsWith('tank') || pathname?.endsWith('plumbing')) && 'bg-slate-100 text-sky-400 py-3'}`}>
                {(pathname?.endsWith('water') || pathname?.endsWith('tank') || pathname?.endsWith('plumbing')) ? <MeterIcon /> : <MeterIconWhite />} <span className="ml-2">Orders</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('commissions') && 'bg-slate-100 text-sky-400 py-3'}`}>
                {pathname?.endsWith('commissions') ? <CommissionIcon /> : <CommissionIconWhite />} <span className="ml-2">Commissions</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/users'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('users') || pathname?.endsWith('drivers') || pathname?.endsWith('vendors') ||pathname?.endsWith('merchants')) && 'bg-slate-100 text-sky-400 py-3'}`}>
                {pathname?.endsWith('users') || pathname?.endsWith('drivers') || pathname?.endsWith('vendors') ||pathname?.endsWith('merchants') ? <Users /> : <UsersWhite />} <span className="ml-2">Users</span>
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/products'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('products')) && 'bg-slate-100 text-sky-400 py-3'}`}>
                {(pathname?.endsWith('products')) ? <MeterIcon /> : <MeterIconWhite />} <span className="ml-2">Products</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/areagroups'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('areagroups')) && 'bg-slate-100 text-sky-400 py-3'}`}>
                {(pathname?.endsWith('areagroups')) ? <MeterIcon /> : <MeterIconWhite />} <span className="ml-2">Area Groups</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/complaints'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('complaints') && 'bg-slate-100 text-sky-400 py-3'}`}>
                {pathname?.endsWith('complaints') ? <ComplaintsIcon /> : <ComplaintsIconWhite />} <span className="ml-2">Complaints</span> 
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/content-pages'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('pages') && 'bg-slate-100 text-sky-400 py-3'}`}>
                    <RiPagesLine className='h-8 w-8 mr-2' /> Pages
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/teams'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('teams') && 'bg-slate-100 text-sky-400 py-3'}`}>
                    <RiTeamLine className='h-8 w-8 mr-2' /> Team Members
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/testimonials'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('testimonials') && 'bg-slate-100 text-sky-400 py-3'}`}>
                    <BiMessageDetail className='h-8 w-8 mr-2' /> Testimonials
                </div>
            </Link>
            <Link className='px-3 py-4' href='/account/faqs'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('faqs') && 'bg-slate-100 text-sky-400 py-3'}`}>
                    <RiQuestionAnswerFill className='h-8 w-8 mr-2' /> FAQs
                </div>
            </Link>


      </div>

  );
};
