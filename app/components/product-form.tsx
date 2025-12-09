'use client'
 
import { PutBlobResult } from '@vercel/blob';
import { useFormStatus } from 'react-dom'
import { useState, useRef, useActionState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createProduct, updateProduct } from '../utils/actions'
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
 
function DeleteButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

 
export function AddProductForm() {
  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const [state, formAction] = useActionState(createProduct, initialState)
   
    return (
      <>

      <div className="flex min-h-full md:w-[1000px] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add product
      </h2>
    </div>

    <div className="w-full md:flex mt-6 mx-auto">
    <div className='w-3/5 px-4'>
        <form action={formAction}>
        <div>
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <select 
            id="category" 
            name="category" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Water packages'>Water packages</option>
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
        <input type="hidden" id="photourl" name="photourl" value={blob?.url}/>

    
        <div className='flex my-2 py-2'>
        <Link className='mr-2 px-3 py-1 rounded bg-gray-200 text-gray-800' href='/account/products'>Cancel</Link>
                  <SubmitButton /> 
                  </div>
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>
      <div className='w-2/5'>
      <div>
        <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];
 
          const formData = new FormData();

          formData.append("file", file)
          formData.append("action", 'upload')
 
          const response = await fetch(
            'https://support.orbansprings.com/api/upload_file.php',
            {
              method: 'POST',
              body: formData,
            },
          );
 
          // const newBlob = (await response.json()) as PutBlobResult;
          const newBlob = await response.json();
          setBlob(newBlob);
        }}
      >
        {blob && <Image
              height={200}
              width={200}
              src={`${blob?.url}`}
              alt={''}
              className='rounded-lg h-[100px] mb-4'
            /> }

        <input name="file" ref={inputFileRef} type="file" required />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>
      </div>
      </div>


    </div>
  </div>


</>
)
  }
  
  export function UpdateProductForm({product}: {product:any}) {
    const router = useRouter();

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);


   const updateProductWithId = updateProduct.bind(null, product.id)
   const [state, formAction] = useActionState(updateProductWithId, initialState)

   const photoImg = product?.picture.includes('https') ? `${product?.picture}` : product?.picture.includes('images') ? `https://support.orbansprings.com/${product?.picture}` : `/${product?.picture}`

   return (
    <>

                <div className="flex min-h-full md:w-[1000px] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update product
                </h2>
              </div>
      
              <div className="w-full md:flex mt-6 mx-auto">
                <div className='w-3/5 px-4'>
              <form action={formAction}>
              <div>
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <select 
            id="category" 
            name="category" 
            defaultValue={product.category}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Water packages'>Water packages</option>
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
        <input type="hidden" id="photourl" name="photourl" defaultValue={product?.picture}/>
        <input type="hidden" id="uploadedpic" name="uploadedpic" defaultValue={blob?.url}/>


              
        <div className='flex my-2 py-2'>
        <Link className='mr-2 px-3 py-1 rounded bg-gray-200 text-gray-800' href='/account/products'>Cancel</Link>
        <EditButton /> 
                  </div>
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
                </form>
                </div>
                <div className='w-2/5'>
                <div>
        <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];
 
          const formData = new FormData();

          formData.append("file", file)
          formData.append("action", 'upload')
 
          const response = await fetch(
            'https://support.orbansprings.com/api/upload_file.php',
            {
              method: 'POST',
              body: formData,
            },
          );
 
          // const newBlob = (await response.json()) as PutBlobResult;
          const newBlob = await response.json();

          setBlob(newBlob);
        }}
      >
        {blob && <Image
              height={200}
              width={200}
              src={`${blob?.url}`}
              alt={product?.name}
              className='rounded-lg h-[100px] mb-4'
            />}

        <input name="file" ref={inputFileRef} type="file" />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>

      <Image
              height={220}
              width={200}
              src={`${photoImg}`}
              alt={product?.name}
              className='rounded-lg h-[200px] mt-4'
            />

        </div>

                </div>
      
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
