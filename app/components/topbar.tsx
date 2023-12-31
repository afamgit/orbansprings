'use client'

import React, { Fragment } from "react"
import Link from "next/link"
import Image from "next/image";
import {FaBell} from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'
import SignOut from "../ui/signout";


export function TopBar () {


     return (
    <div className="w-full flex justify-center items-center">    
    <div className="w-3/4">
        Search bar
    </div>
    <div className="w-1/4 flex">
        <FaBell />  <div className="flex rounded bg-sky-100 p-2">              <Menu as="div" className="relative inline-block text-left">
            <div>
        <Menu.Button className={'inline-flex w-full items-center text-gray-600 p-1 md:p-2'}>
          User
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="flex flex-col">
            
            <Menu.Item>
                <Link
                  href="/governance-structure"
                  className='my-1 pl-5 text-gray-600'
                >
                  User
                </Link>
            </Menu.Item>
            <Menu.Item>
Sign out            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      </Menu>
</div>
    </div>

            </div>
  );
};
