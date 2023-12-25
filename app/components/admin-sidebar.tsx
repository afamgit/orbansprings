'use client'

import Link from "next/link"
import { FaSquareFull } from "react-icons/fa"
import { CiGrid42 } from "react-icons/ci";
import { BiTachometer, BiMessageDetail } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { RiPagesLine, RiQuestionAnswerFill, RiTeamLine } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { TbBriefcase2, TbCurrencyDollar } from "react-icons/tb";
import { usePathname } from "next/navigation";

export function AdminSideBar () {

    const pathname = usePathname()


     return (
    <div className="text-white mt-3">    
          <Link className='p-3' href='/account/dashboard'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('dashboard') || pathname?.endsWith('account')) && 'bg-slate-100 text-sky-400'}`}>
                    <CiGrid42 className='h-8 w-8 mr-2' /> Dashboard
                </div>
            </Link>
            <Link href='/account/meters'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('meters') || pathname?.endsWith('numbers')) && 'bg-slate-100 text-sky-400'}`}>
                    <BiTachometer className='h-8 w-8 mr-2' /> Meters
                </div>
            </Link>
            <Link className='p-3' href='/account/commissions'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${(pathname?.endsWith('commissions') || pathname?.endsWith('vendors')) && 'bg-slate-100 text-sky-400'}`}>
                    <MdBusinessCenter className='h-8 w-8 mr-2' /> Commissions
                </div>
            </Link>
            <Link className='p-3' href='/account/users'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('users') && 'bg-slate-100 text-sky-400'}`}>
                    <FaUsers className='h-8 w-8 mr-2' /> Users
                </div>
            </Link>
            <Link className='p-3' href='/account/complaints'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('complaints') && 'bg-slate-100 text-sky-400'}`}>
                    <BiMessageDetail className='h-8 w-8 mr-2' /> Complaints
                </div>
            </Link>
            <Link className='p-3' href='/account/content-pages'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('pages') && 'bg-slate-100 text-sky-400'}`}>
                    <RiPagesLine className='h-8 w-8 mr-2' /> Pages
                </div>
            </Link>
            <Link className='p-3' href='/account/teams'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('teams') && 'bg-slate-100 text-sky-400'}`}>
                    <RiTeamLine className='h-8 w-8 mr-2' /> Team Members
                </div>
            </Link>
            <Link className='p-3' href='/account/testimonials'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('testimonials') && 'bg-slate-100 text-sky-400'}`}>
                    <BiMessageDetail className='h-8 w-8 mr-2' /> Testimonials
                </div>
            </Link>
            <Link className='p-3' href='/account/faqs'>
                <div className={`w-full flex justify-start items-center md:px-8 text-xl py-1 ${pathname?.endsWith('faqs') && 'bg-slate-100 text-sky-400'}`}>
                    <RiQuestionAnswerFill className='h-8 w-8 mr-2' /> FAQs
                </div>
            </Link>


      </div>

  );
};
