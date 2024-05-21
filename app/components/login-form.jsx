'use client';
import React, {useState, useEffect} from 'react'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, checkUser } from '@/app/utils/actions';
import { getProfileFromUser } from '../utils/data';



export default function LoginForm() {

    const router = useRouter()

    const [showCode, setShowCode] = useState('hidden')
    const [showCredentials, setShowCredentials] = useState('block')
    const [uname, setUname] = useState(null)

  const [errorMessage, dispatch] = useFormState(authenticate, '');
 
  useEffect(() => {
    if(errorMessage === 'require 2fa code') {
      setShowCode('block')
      setShowCredentials('hidden')
      send2faEmail()
    }
  },[errorMessage])


  const send2faEmail = async () => {

    const userProfile = getProfileFromUser(uname);

    const formData = new FormData();

    formData.append("username", userProfile?.username);
    formData.append("email", userProfile?.email);
    formData.append("name", userProfile?.name);
    formData.append("subject", "OrbanSprings login verification code");
    formData.append("fromname", "Orban Springs");
    formData.append("fromemail", "info@orbansprings.com");
    formData.append("yourchoice", '');
    formData.append("action", "send");

    const result = await fetch(
      'https://support.orbansprings.com/api/login_2fa_code.php',
      {
        method: "POST",
        body: formData,
      }
    );

    const resultResponse = await result.json();

    console.log(resultResponse)

  }

  return (
    <form action={dispatch} className="space-y-3 text-gray-800">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 py-8">
        <h1 className={`mb-3 text-2xl`}>
          Please log in to continue.
        </h1>

        
          {errorMessage && errorMessage !== 'require 2fa code' && (
            <div
            className="flex h-12 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
          )}
        

        <div className="w-full">
        <div className={`${showCode}`}>
            <label
              className="mb-3 mt-5 block text-xl font-medium text-gray-900"
              htmlFor="usercode"
            >
              Enter the Code
            </label>
            <p>A verification code has been sent to your email. Please enter the code for you to proceed</p>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="usercode"
                type="text"
                name="usercode"
                required= {showCode === 'block'}
              />
            </div>
          </div>
          <div className={`${showCredentials}`}>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                onChange={(e) => setUname(e.target.value)}
                placeholder="Enter your username"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className={`${showCredentials} mt-4`}>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}

              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>


        </div>
        <LoginButton />
        
      </div>
    </form>
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className="flex justify-center items-center mt-4 w-full bg-sky-200 px-3 py-2 rounded-full" disabled={pending}>
    <span>{pending ? 'Logging in...' : 'Login'}</span> <ArrowRightIcon className="ml-2 h-5 w-5 text-slate-700" />
  </button>
  );
}