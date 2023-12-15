'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createFaq, updateFaq, deletePage } from '../utils/actions'
 
const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded my-3'>
      Add
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded my-3'>
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

 
export function AddFaqForm() {
    const [state, formAction] = useFormState(createFaq, initialState)
   
    return (
      <>

<div className="flex w-screen flex-1 flex-col justify-center px-3 py-6">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add question
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action={formAction}>
        <div>
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <select 
            type="text" 
            id="category" 
            name="category" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='General'>General</option>
            <option value='About'>Billing</option>
            <option value='Partner'>Support</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">Question</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="question" 
            name="question" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="answer" className="block text-sm font-medium leading-6 text-gray-900">Answer</label>
          <div className="mt-2">
          <textarea 
            type="text" 
            rows={3}
            id="answer" 
            name="answer" 
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
  
  export function UpdateFaqForm({faq}) {

   const updatePageWithId = updateFaq.bind(null, faq.faqid)
   const [state, formAction] = useFormState(updatePageWithId, initialState)

   return (
    <>

                <div className="flex w-screen flex-1 flex-col justify-center px-3 py-6">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update question
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action={formAction}>
                  <div>
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                    <div className="mt-2">
                    <select 
            type="text" 
            id="category" 
            name="category" 
            defaultValue={faq.faqcat}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='General'>General</option>
            <option value='About'>Billing</option>
            <option value='Partner'>Support</option>
            </select>
                    </div>
                  </div>

                  <div>
                  <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">Question</label>
                    <div className="mt-2">
                    <input 
                      type="text" 
                      id="question" 
                      name="question" 
                      defaultValue={faq.faqquestion} 
                      required
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    </div>
                  </div>

                  <div>
                  <label htmlFor="answer" className="block text-sm font-medium leading-6 text-gray-900">Answer</label>
                    <div className="mt-2">
                    <textarea 
                      type="text" 
                      rows={3}
                      id="answer"
                      name="answer" 
                      defaultValue={faq.faqanswer} 
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
