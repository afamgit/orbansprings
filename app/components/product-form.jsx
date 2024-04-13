'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createProduct, updateProduct, deletePage } from '../utils/actions'
 
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

export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="fullname">Full name</label>
      <input type="text" id="fullname" name="fullname" required />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" name="phone" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}

export function AddProductForm() {
    const [state, formAction] = useFormState(createProduct, initialState)
   
    return (
      <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add product
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
            <option value='Water package'>Water package</option>
            <option value='Tank cleaning'>Tank cleaning</option>
            <option value='Plumbing'>Plumbing</option>
            <option value='Grid water'>Grid water</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="productname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="productname" 
            name="productname" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
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
        <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">SKU</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="sku" 
            name="sku" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="price" 
            name="price" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">Size</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="size" 
            name="size" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="responsetime" className="block text-sm font-medium leading-6 text-gray-900">Response time</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="responsetime" 
            name="responsetime" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
              <div className="flex gap-4 my-3">
                <div className="flex items-center">
                  <input
                    id="available"
                    name="status"
                    type="radio"
                    value="1"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="available"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Available
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="unavailable"
                    name="status"
                    type="radio"
                    value="0"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="unavailable"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Unavailable
                  </label>
                </div>
              </div>
            </div>

        <div>
        <label htmlFor="paymentaccount" className="block text-sm font-medium leading-6 text-gray-900">Payment account</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="paymentaccount" 
            name="paymentaccount" 
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
  
  export function UpdateProductForm({product}) {

   const updateProductWithId = updateProduct.bind(null, product.id)
   const [state, formAction] = useFormState(updateProductWithId, initialState)

   return (
    <>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update product
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
            defaultValue={product.category}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Water package'>Water package</option>
            <option value='Tank cleaning'>Tank cleaning</option>
            <option value='Plumbing'>Plumbing</option>
            <option value='Grid water'>Grid water</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="productname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="productname" 
            name="productname" 
            defaultValue={product.name}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div className="mt-2">
          <textarea 
            type="text" 
            rows={4}
            id="desc" 
            name="desc" 
            defaultValue={product.description}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">SKU</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="sku" 
            name="sku" 
            defaultValue={product.sku}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="price" 
            name="price" 
            defaultValue={product.price}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">Size</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="size" 
            name="size" 
            defaultValue={product.size}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="responsetime" className="block text-sm font-medium leading-6 text-gray-900">Response time</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="responsetime" 
            name="responsetime" 
            defaultValue={product.response_time}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
              <div className="flex gap-4 my-3">
                <div className="flex items-center">
                  <input
                    id="available"
                    name="status"
                    type="radio"
                    defaultChecked={product.status == 1}
                    value="1"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="available"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Available
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="unavailable"
                    name="status"
                    type="radio"
                    defaultChecked={product.status == 0}
                    value="0"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="unavailable"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Unavailable
                  </label>
                </div>
              </div>
            </div>

        <div>
        <label htmlFor="paymentaccount" className="block text-sm font-medium leading-6 text-gray-900">Payment account</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="paymentaccount" 
            name="paymentaccount" 
            defaultValue={product.payment_account}
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>


                  <input type="hidden" id="picture" name="picture" defaultValue={product.picture} />
              
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
