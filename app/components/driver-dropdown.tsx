'use client'

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";

export function DriverDropdown ({id, drvStatus}: {id: string, drvStatus: boolean}) {

  const [statusMenu, setStatusMenu] = useState('Disable Driver')

  useEffect(() => {
    if(drvStatus) {
      setStatusMenu('Disable Driver')
    } else {
      setStatusMenu('Enable Driver')
    }
  },[id, drvStatus])

    const handleReset = async() => {

     try {

      const response = await fetch('/api/user/reset-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id})
      })

      const res = await response.json()

      alert(res.message)


     } catch(error) {
     console.log(error)
     }

    }

    const handleAvailability = async() => {

      try {

        const response = await fetch('/api/user/change-availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, drvStatus: drvStatus})
        })
  
        const res = await response.json()
  
        alert(res.message)
  
  
       } catch(error) {
       console.log(error)
       }
  
  }

  return (
    <div className="w-full flex justify-start items-center h-[40px] p-1">    
                      <Menu as="div" className="relative inline-block text-left">
            <div>
        <Menu.Button>
          <FaEllipsisVertical size={24} className="px-1 text-black font-bold" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="flex flex-col">
            <Menu.Item>
                <Link
                  href="#"
                  onClick={() => {
                    if(confirm(`Confirm you want to reset this driver's password`) === true) {
                      handleReset()}
                  }}
                  className='my-1 p-2 text-gray-600 border-b-2 border-b-gray-100 hover:bg-gray-700 hover:text-white'
                >
                  Reset Password
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link
                  href="#"
                  onClick={() => {
                    if(confirm(`Confirm you want to ${statusMenu}`) === true) {
                      handleAvailability()}
                  }}
                  className={`${drvStatus ? 'my-1 p-2 text-red-600 hover:bg-red-100 hover:text-red-600' : 'my-1 p-2 text-gray-600 hover:bg-gray-700 hover:text-white'}`}
                >
                    {statusMenu}
                  </Link>
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      </Menu>

    </div>
  );
};
