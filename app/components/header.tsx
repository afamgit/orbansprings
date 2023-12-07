'use client'

import React, { useState, useContext } from "react"
import Link from "next/link"
import Image from 'next/image'
import { usePathname } from "next/navigation"
import { BsList,  } from "react-icons/bs"
import { AiFillCloseSquare } from "react-icons/ai"


const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const pathname = usePathname()

  return (
    <div className="sticky top-0 bg-white text-dark border-b-2 border-gray-300 z-10">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center text-dark h-[100px] px-4">
        <div
          style={{ height: "90px", width: "140px", objectFit: "cover" }}
          className="flex justify-center content-center"
        >
          <Link href='/'><Image src='/logo_full.jpeg' height={60} width={90} alt="logo" /></Link>
        </div>
        <div className="hidden sm:block">
          <ul className="list-none flex gap-2 md:gap-4 text-lg font-bold">
          <li className={pathname === '/' ? "text-gray-900 p-1 md:p-2 border-b-2 border-gray-700" : 'text-gray-600 p-1 md:p-2'}>
              <Link href='/'>Home</Link>
              </li>
              <li className={pathname === '/services' ? "text-gray-900 p-1 md:p-2 border-b-2 border-gray-700" : 'text-gray-600 p-1 md:p-2'}>
              <Link href="/services"> Services</Link>
              </li>
            <li className={pathname === '/about' ? "text-gray-900 p-1 md:p-2 border-b-2 border-gray-700" : 'text-gray-600 p-1 md:p-2'}>
              <Link href="/about"> About</Link>
            </li>
            <li className={pathname === '/faq' ? "text-gray-900 p-1 md:p-2 border-b-2 border-gray-700" : 'text-gray-600 p-1 md:p-2'}>
            <Link href="/faq"> FAQ</Link>
              </li>
            <li className={pathname === '/contact' ? "text-gray-900 p-1 md:p-2 border-b-2 border-gray-700" : 'text-gray-600 p-1 md:p-2'}>
            <Link href="/contact"> Contact</Link>
              </li>
              <li className={pathname === '/press' ? "text-gray-900 p-1 md:p-2 border-b-2 border-gray-700" : 'text-gray-600 p-1 md:p-2'}>
              <Link href="/press"> Press</Link>
            </li>
            <li className="py-2 px-4 rounded bg-blue-800 text-white">
              Download App
            </li>
          </ul>
        </div>
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
    </div>
  );
};
export default NavBar;
