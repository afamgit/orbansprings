'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { newsletterSignup, deleteTodo } from '../utils/actions'


const initialState = {
  message: null,
}
 
function SignUpButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" className='bg-blue-800 px-3 py-1 ml-1 h-[40px]' aria-disabled={pending}>
      Sign Up
    </button>
  )
}


export function NewsletterSignup () {

  const [state, formAction] = useFormState(newsletterSignup, initialState)

  return (
    <form action={formAction}>
        <h3 className='my-2 py-2 text-xl md:text-3xl'>Newsletter Sign Up</h3>
        <div className='flex justify-start items-center'>
            <div className='h-[40px]'>
            <input type="text" id="newsletteremail" name="newsletteremail"  placeholder='Email' required className='px-2 py-1 w-200 bg-black border border-slate-300 h-[40px]' />
            </div>
            <SignUpButton />
        </div>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
};
