'use client';
 
import React, {useState} from 'react'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormStatus } from 'react-dom';
import z from 'zod'


const userSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmpassword: z.string().min(6, 'Confirm password is required')
})
.refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'],
    message: 'Passwords do not match'
})



export default function SignupForm() {

    const router = useRouter()

    const [data, setData] = useState({})
    const [msg, setMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const updateData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()

        setMsg(null)
        setErrorMsg(null)


       try {
        const parsedData = userSchema.safeParse(data)


            if (!parsedData.success) {
                console.log(parsedData.error);
                setErrorMsg('Form validation failed')
                return
        }

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedData.data)
        })

        const res = await response.json()

        if(res.user === null) {
            setMsg(res.message) 
        } else {
            router.push('/login')
        } 

       } catch(error) {
       console.log(error)
       setErrorMsg(res.message)
       }
       
    }


 
  return (
    <form onSubmit={handleSignup} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Sign up
        </h1>

        {msg && (
            <>
              <p className="text-sm text-red-600">{msg}</p>
            </>
          )}

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                onChange={updateData}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                onChange={updateData}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
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
                onChange={updateData}

              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmpassword"
                type="password"
                name="confirmpassword"
                placeholder="Confirm password"
                required
                minLength={6}
                onChange={updateData}

              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <SignupButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMsg && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMsg}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
 
function SignupButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className="flex justify-center items-center mt-4 w-full bg-sky-200 px-3 py-2 rounded-full" aria-disabled={pending}>
      <span>Signup</span> <ArrowRightIcon className="ml-2 h-5 w-5 text-slate-700" />
    </button>
  );
}