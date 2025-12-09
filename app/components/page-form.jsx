'use client'

import { useFormStatus } from 'react-dom'
import { createPage, updatePage } from '../utils/actions'
import React, { useState, useRef, useActionState } from 'react';
import Image from 'next/image';
import { getPhotoUrl } from '../utils/utils';
import Link from 'next/link';

const initialState = {
  message: '',
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending} className='p-2 bg-blue-300 rounded'>
      {pending ? 'Adding ...' : 'Add'}
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending} className='p-2 bg-blue-300 rounded'>
      {pending ? 'Updating ...' : 'Update'}
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

export function AddPageForm() {
    const [state, formAction] = useActionState(createPage, initialState)
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
      const [loading, setLoading] = useState(false);

    return (
      <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add content page
      </h2>
    </div>

    <div className="w-full md:flex mt-6 mx-auto">
                <div className='w-4/5 px-4'>
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
            <option value='About'>About</option>
            <option value='Partner'>Partner</option>
            <option value='Top'>Top</option>
            <option value='Service'>Service</option>
            <option value='GetStarted'>Get Started</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="title" 
            name="title" 
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

        {/* <div>
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
        </div> */}

<div>
        <label htmlFor="photourl" className="block text-sm font-medium leading-6 text-gray-900">Image url</label>
          <div className="mt-2">
          <input 
            type="text" 
            value={blob?.url}
            id="photourl" 
            name="photourl" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>


    
        <div className='my-2'>
                 <SubmitButton /> <Link href='/account/content-pages' className='p-2 ml-2 bg-gray-200 rounded'>
      Cancel
    </Link>
                  </div> 
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>

      <div className='w-1/5'>
                  
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setLoading(true)
            
             
                      if (!inputFileRef.current?.files) {
                        throw new Error('No file selected');
                      }
             
                      const file = inputFileRef.current.files[0];
             
                      const formData = new FormData();
            
                      formData.append("file", file)
                      formData.append("action", 'upload')
             
                      const response = await fetch(
                        'https://support.heelsandkey.com/api/upload_file.php',
                        {
                          method: 'POST',
                          body: formData,
                        },
                      );
             
                      // const newBlob = (await response.json()) as PutBlobResult;
                      const newBlob = await response.json();
            
                      setLoading(false)
            
                      setBlob(newBlob);
                    }}
                  >
                    {blob && <Image
                          height={550}
                          width={400}
                          src={`${blob?.url}`}
                          alt={''}
                          className='rounded-lg h-[100px] mb-4'
                        /> }
            
                    <input name="file" ref={inputFileRef} type="file" required />
                    <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">{loading ? 'Uploading...' : 'Upload'}</button>
                  </form>
            
                  </div>
            
            

    </div>
  </div>


</>
)
  }
  
  export function UpdatePageForm({page}) {

   const updatePageWithId = updatePage.bind(null, page.cpageid)
   const [state, formAction] = useActionState(updatePageWithId, initialState)
   const inputFileRef = useRef(null);
   const [blob, setBlob] = useState(null);
    const [loading, setLoading] = useState(false);

   return (
    <>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update content page
                </h2>
                <p>{state?.message}</p>
              </div>
      
              <div className="w-full md:flex mt-6 mx-auto">
                <div className='w-4/5 px-4'>
              <form action={formAction}>
                  <div>
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                    <div className="mt-2">
                    <select 
            type="text" 
            id="category" 
            name="category" 
            defaultValue={page?.cpagemenu}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='General'>General</option>
            <option value='About'>About</option>
            <option value='Partner'>Partner</option>
            <option value='Top'>Top</option>
            <option value='Service'>Service</option>
            </select>
                    </div>
                  </div>

                  <div>
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <div className="mt-2">
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      defaultValue={page?.cpagename} 
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
                      defaultValue={page?.cpagecontent} 
                      required
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    </div>
                  </div>

                  {/* <div>
                  <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                    <div className="mt-2">
                    <input 
                      type="file" 
                      id="photo" 
                      name="photo" 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    </div>
                  </div> */}

<div>
        <label htmlFor="photourl" className="block text-sm font-medium leading-6 text-gray-900">Image url</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="photourl" 
            name="photourl" 
            defaultValue={page?.cpagephoto}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <input type="hidden" id="uploadedpic" name="uploadedpic" defaultValue={blob?.url}/>
              
                 <div className='my-2'>
                 <EditButton /> <Link href='/account/content-pages' className='p-2 ml-2 bg-gray-200 rounded'>
      Cancel
    </Link>
                  </div> 
                  
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
                </form>
      
              </div>
              <div className='w-1/5'>
                  
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setLoading(true)
             
                      if (!inputFileRef.current?.files) {
                        throw new Error('No file selected');
                      }
             
                      const file = inputFileRef.current.files[0];
             
                      const formData = new FormData();
            
                      formData.append("file", file)
                      formData.append("action", 'upload')
             
                      const response = await fetch(
                        'https://support.heelsandkey.com/api/upload_file.php',
                        {
                          method: 'POST',
                          body: formData,
                        },
                      );
             
                      // const newBlob = (await response.json()) as PutBlobResult;
                      const newBlob = await response.json();
            setLoading(false)
                      setBlob(newBlob);
                    }}
                  >
                    {blob && <Image
                          height={550}
                          width={400}
                          src={`${blob?.url}`}
                          alt={page?.cpagename}
                          className='rounded-lg h-[100px] mb-4'
                        />}
            
                    <input name="file" ref={inputFileRef} type="file" />
                    <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">{loading ? 'Uploading...' : 'Upload'}</button>
                  </form>

                  {page.cpagephoto !== null && page.cpagephoto !== '' && <Image
                src={getPhotoUrl(page.cpagephoto)}
                height={48}
                width={48}
                alt={page.cpagename}
                className='rounded-lg mt-8 h-[100px] w-[100px]'
                />}
            
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
