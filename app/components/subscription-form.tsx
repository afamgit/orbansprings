'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { useState, useActionState } from 'react'
import { useRouter } from 'next/navigation';
import { createSubscription, updateSubscription } from '../utils/actions'
import Link from 'next/link';
 
const initialState = {
  message: '',
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      {pending ? 'Adding...' : 'Add'}
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}

 
export function AddSubscriptionForm() {
  const router = useRouter();


    const [state, formAction] = useActionState(createSubscription, initialState)
   
    return (
      <>

      <div className="flex min-h-full md:w-[1000px] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add subscription
      </h2>
    </div>

    <div className="w-full md:w-[1000px] mt-6 mx-auto rounded-lg border-2 border-gray-200 shadow-lg p-5">
    <form action={formAction}>
        <div>
        <label htmlFor="cat" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <select 
            id="cat" 
            name="cat" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Premium'>Premium</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="spname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="spname" 
            name="spname" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <div className="mt-2">
          <input 
          type='text'
            id="amount" 
            name="amount" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="months" className="block text-sm font-medium leading-6 text-gray-900">Months</label>
        <div className="mt-2">
          <select 
            id="months" 
            name="months" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='1'>1 month</option>
            <option value='6'>6 months</option>
            <option value='12'>12 months</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="includes" className="block text-sm font-medium leading-6 text-gray-900">Features included</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="includes" 
            name="includes" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="excludes" className="block text-sm font-medium leading-6 text-gray-900">Features excluded</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="excludes" 
            name="excludes" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

    
        <div className='flex my-2 py-2'>
        <Link className='mr-2 px-3 py-1 rounded bg-gray-200 text-gray-800' href='/account/products'>Cancel</Link>
                  <SubmitButton /> 
                  </div>
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>
      </div>

</>
)
  }
  
  export function UpdateSubscriptionForm({plan}: {plan:any}) {
    const router = useRouter();

   const updateSubscriptionWithId = updateSubscription.bind(null, plan.subplanid)
   const [state, formAction] = useFormState(updateSubscriptionWithId, initialState)

   return (
    <>

                <div className="flex min-h-full md:w-[1000px] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update subscription plan
                </h2>
              </div>
      
              <div className="w-full md:w-[1000px] mt-6 mx-auto rounded-lg border-2 border-gray-200 shadow-lg p-5">
              <form action={formAction}>
        <div>
        <label htmlFor="cat" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <select 
            id="cat" 
            name="cat" 
            defaultValue={plan?.subplan_cat}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Premium'>Premium</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="spname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="spname" 
            name="spname" 
            defaultValue={plan?.subplan}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <div className="mt-2">
          <input 
          type='text'
            id="amount" 
            name="amount" 
            defaultValue={plan?.subplan_amount}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="months" className="block text-sm font-medium leading-6 text-gray-900">Months</label>
        <div className="mt-2">
          <select 
            id="months" 
            name="months" 
            defaultValue={plan?.subplan_months}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='1'>1 month</option>
            <option value='6'>6 months</option>
            <option value='12'>12 months</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="includes" className="block text-sm font-medium leading-6 text-gray-900">Features included</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="includes" 
            name="includes" 
            defaultValue={plan?.subplan_include}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="excludes" className="block text-sm font-medium leading-6 text-gray-900">Features excluded</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="excludes" 
            name="excludes" 
            defaultValue={plan?.subplan_exclude}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

    
        <div className='flex my-2 py-2'>
        <Link className='mr-2 px-3 py-1 rounded bg-gray-200 text-gray-800' href='/account/subscriptions'>Cancel</Link>
                  <EditButton /> 
                  </div>
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>
            </div>
          
       
    </>

    )
  }

// export function DeleteButtonForm(id) {
//   const [state, formAction] = useFormState(deletePage, initialState)
 
//   return (
//     <form action={formAction}>
//       <input value={id} type='hidden' id="todo" name="todo" required />
//       <DeleteButton />
//       <p aria-live="polite" className="sr-only">
//         {state?.message}
//       </p>
//     </form>
//   )
// }
