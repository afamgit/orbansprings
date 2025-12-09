'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createAreaGroup, updateAreaGroup } from '../utils/actions'
import { useActionState } from 'react'
 
const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      Add
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      Update
    </button>
  )
}
 
function DeleteButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

 
export function AddAreaGroupForm() {
    const [state, formAction] = useActionState(createAreaGroup, initialState)
   
    return (
      <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add area group
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action={formAction}>

        <div>
        <label htmlFor="areagroup" className="block text-sm font-medium leading-6 text-gray-900">Group name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="areagroup" 
            name="areagroup" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="areas" className="block text-sm font-medium leading-6 text-gray-900">Areas</label>
          <div className="mt-2">
          <textarea 
            type="text" 
            rows={4}
            id="areas" 
            name="areas" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

    
        <SubmitButton />
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>

    </div>
  </div>


</>
)
  }
  
  export function UpdateAreaGroupForm({areagroup}) {

   const updateAreaGroupWithId = updateAreaGroup.bind(null, areagroup.agid)
   const [state, formAction] = useFormState(updateAreaGroupWithId, initialState)

   return (
    <>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update area group
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action={formAction}>
              <div>
        <label htmlFor="areagroup" className="block text-sm font-medium leading-6 text-gray-900">Group name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="areagroup" 
            name="areagroup" 
            defaultValue={areagroup.agname}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="areas" className="block text-sm font-medium leading-6 text-gray-900">Areas</label>
          <div className="mt-2">
          <textarea 
            type="text" 
            rows={4}
            id="areas" 
            name="areas" 
            defaultValue={areagroup.agareas}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>
              
                  <EditButton />
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
