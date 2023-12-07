'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createPage, updateTestimonial, deletePage, createTestimonial } from '../utils/actions'
 
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

 
export function DeleteAllButton() {
  const { pending } = useFormStatus()
 
  return (
    <button onClick={() => deleteAllTodos} aria-disabled={pending}>
      Delete
    </button>
  )
}


export function AddTestimonialForm() {
    const [state, formAction] = useFormState(createTestimonial, initialState)
   
    return (
      <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add testimonial
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action={formAction}>
        <div>
        <label htmlFor="stars" className="block text-sm font-medium leading-6 text-gray-900">Rating</label>
          <div className="mt-2">
          <select 
            type="text" 
            id="stars" 
            name="stars" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="profession" className="block text-sm font-medium leading-6 text-gray-900">Profession</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="profession" 
            name="profession" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">Testimonial</label>
          <div className="mt-2">
          <textarea 
            type="text" 
            rows={4}
            id="desc" 
            name="desc" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
          <div className="mt-2">
          <input 
            type="file" 
            id="photo" 
            name="photo" 
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <input type="hidden" id="picture" name="picture"/>
    
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
  
  export function UpdateTestimonialForm({testimonial}) {

   const updateTestimonialWithId = updateTestimonial.bind(null, testimonial.tid)
   const [state, formAction] = useFormState(updateTestimonialWithId, initialState)

   return (
    <>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update testimonial
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action={formAction}>
        <div>
        <label htmlFor="stars" className="block text-sm font-medium leading-6 text-gray-900">Rating</label>
          <div className="mt-2">
          <select 
            type="text" 
            id="stars" 
            defaultValue={testimonial.tstars}
            name="stars" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="name" 
            defaultValue={testimonial.tcustomer}
            name="name" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="profession" className="block text-sm font-medium leading-6 text-gray-900">Profession</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="profession" 
            defaultValue={testimonial.trole}
            name="profession" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">Testimonial</label>
          <div className="mt-2">
          <textarea 
            type="text" 
            rows={4}
            id="desc" 
            defaultValue={testimonial.tmessage}
            name="desc" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
          <div className="mt-2">
          <input 
            type="file" 
            id="photo" 
            name="photo" 
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <input type="hidden" id="picture" name="picture"/>
              
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
