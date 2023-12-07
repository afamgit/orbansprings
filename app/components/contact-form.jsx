'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { sendMessage } from '../utils/actions'
 
const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-800 text-white rounded my-3 '>
      Send Message
    </button>
  )
}
 

export function ContactForm() {
    const [state, formAction] = useFormState(sendMessage, initialState)
   
    return (
      <>

      <div className="w-full md:w-4/5 flex min-h-full bg-white rounded-lg p-6 flex-col justify-center shadow-md">
    

    <form action={formAction}>
        <div className='grid grid-cols-2 gap-4 my-3'>
            <div className='rounded'>
            <div className="mt-2 border-2 border-gray-200">
            <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder='Name'
                required
                className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" 
            />
            </div>
            </div>

            <div className='rounded'>
            <div className="mt-2 border-2 border-gray-200">
            <input 
                type="text" 
                id="phone" 
                name="phone" 
                placeholder='Phone'
                required
                className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" 
            />
            </div>
            </div>
        </div>

        <div className='grid grid-cols-2 gap-4 my-3'>
            <div className='rounded'>
            <div className="mt-2 border-2 border-gray-200">
            <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='Email'
                required
                className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" 
            />
            </div>
            </div>

            <div className='rounded'>
            <div className="mt-2 border-2 border-gray-200">
            <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder='Subject'
                required
                className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" 
            />
            </div>
            </div>
        </div>

        <div>
        <div className="mt-2 border-2 border-gray-200">
          <textarea 
            type="text" 
            rows={10}
            id="message" 
            name="message" 
            placeholder='Message'
            required
            className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

    
        <SubmitButton />
            <p aria-live="polite" className="sr-only">
            {state?.message}
            </p>
      </form>

  </div>

</>
)
  }
  
