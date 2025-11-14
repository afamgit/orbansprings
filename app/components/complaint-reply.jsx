'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { replyComplaint } from '../utils/actions'
import { useActionState } from 'react'
 
const initialState = {
  message: '',
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='px-4 py-2 bg-blue-400 text-white rounded'>
      Send
    </button>
  )
}
 

export function ComplaintReplyForm({message, name, phone}) {
  const updateComplaintWithId = replyComplaint.bind(null, message.cid)

    const [state, formAction] = useActionState(updateComplaintWithId, initialState)
   
    return (
      <>

      <div className="w-full min-h-full rounded-lg p-6 flex-col justify-center">

    
    <form action={formAction}>
        <div className='my-3'>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-2xl">
            Reply
          </h3>
          <SubmitButton />

        </div>

            <input 
                type="hidden" 
                id="name" 
                name="name" 
                defaultValue={name}
            />

            <input 
                type="hidden" 
                id="phone" 
                name="phone" 
                defaultValue={phone}
            />

            <input 
                type="hidden" 
                id="subject" 
                name="subject" 
                defaultValue={message.csubject}
            />

        <div className="mt-2 border-2 border-gray-200">
          <textarea 
            type="text" 
            rows={10}
            id="message" 
            name="message" 
            placeholder='Send a response...'
            required
            className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

    
            <p aria-live="polite" className="sr-only">
            {state?.message}
            </p>
      </form>

  </div>

</>
)
  }
  
