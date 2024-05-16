'use client'
 
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { changePassword } from '../utils/actions'
import Link from 'next/link';
 
const initialState = {
  message: null,
}
 
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 my-3 rounded'>
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}
  
  export function ChangePasswordForm({profile}: {profile: any}) {



   const updateProfileWithId = changePassword.bind(null, profile?.id)
   const [state, formAction] = useFormState(updateProfileWithId, initialState)
 

   return (
    <>

                <div className="w-full md:w-[950px] flex-col justify-start px-4">
               
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Change password
                </h2>
      
                {state?.message && <div className='my-3 py-3'>
                  <span className='bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl'>{state?.message}</span>
                  </div>}


              <div className="w-full mt-6 mx-auto">

    <form action={formAction}>


        <div>
        <label htmlFor="oldpass" className="block text-sm font-medium leading-6 text-gray-900">Old password</label>
          <div className="mt-2">
          <input 
            type="password" 
            id="oldpass" 
            name="oldpass" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="newpass" className="block text-sm font-medium leading-6 text-gray-900">New password</label>
          <div className="mt-2">
          <input 
            type="password" 
            id="newpass" 
            name="newpass" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="newpass_confirm" className="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
          <div className="mt-2">
          <input 
            type="password" 
            id="newpass_confirm" 
            name="newpass_confirm" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <input type="hidden" id="email" name="email" defaultValue={profile?.email}/>

    
       <div className='flex px-3'>
       <EditButton /> <Link className='p-2 bg-gray-700 text-white ml-3 my-3 rounded' href='/account/update-profile'>Back to Profile</Link>
        </div> 
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>


    </div> </div>
          
       
    </>

    )
  }
