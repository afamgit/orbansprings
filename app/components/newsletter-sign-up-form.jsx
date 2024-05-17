'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { newsletterSignup } from '../utils/actions'
import { useState, useEffect } from 'react'


const initialState = {
  message: null,
}
 
function SignUpButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" className='bg-blue-800 px-3 py-1 ml-1 h-[40px]' aria-disabled={pending}>
      {pending ? 'Signing up...' : 'Sign Up'}
    </button>
  )
}


export function NewsletterSignup () {

  const [state, formAction] = useFormState(newsletterSignup, initialState)

  const [showMsg, setShowMsg] = useState(false)

  useEffect(() => {
    if(state?.message) {
      setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
      }, 5000)
    }
  },[state?.message])

  return (

    <>
    {showMsg && state?.message && <div className='my-1 py-1'>
                  <span className='bg-sky-200 text-gray-900 rounded-lg px-2 py-1 text-sm'>{state?.message}</span>
                  </div>}

    <form action={formAction}>
        <h3 className='my-2 py-2 text-xl md:text-3xl'>Newsletter Sign Up</h3>
        <div className='flex justify-start items-center'>
            <div className='h-[40px]'>
            <input type="text" id="nemail" name="nemail"  placeholder='Email' required className='px-2 py-1 w-200 bg-black border border-slate-300 h-[40px]' />
            </div>
            <SignUpButton />
        </div>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
    </>
  );
};
