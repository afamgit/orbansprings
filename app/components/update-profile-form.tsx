'use client'
 
import { PutBlobResult } from '@vercel/blob';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateProfile, createArticle } from '../utils/actions'
 
const initialState = {
  message: null,
}
 
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 my-3 rounded'>
      {pending ? 'Saving...' : 'Save Information'}
    </button>
  )
}
  
  export function UpdateProfileForm({profile, areagroup}: {profile: any, areagroup: any}) {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
  
 const updateProfileWithId = updateProfile.bind(null, profile?.id)
   const [state, formAction] = useFormState(updateProfileWithId, initialState)
 
const profileImg = profile?.photo?.includes('profile') ? `https://orbansprings.com/${profile.photo}` : `${profile?.photo}`

   return (
    <>

                <div className="w-full md:w-[950px] flex-col justify-start px-4">
               
            
      
                {state?.message && <div className='my-3 py-3'>
                  <span className='bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl'>{state?.message}</span>
                  </div>}


              <div className="w-full mt-6 mx-auto">

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
              alt={profile?.name}
              className='rounded-full h-[100px] w-[100px] mb-4'
            />}

        <input name="file" ref={inputFileRef} type="file" />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>


<Image
              height={300}
              width={300}
              src={`${profileImg}`}
              alt={profile?.title}
              className='rounded-full h-[200px] w-[200px] mt-6'
            />





    <form action={formAction}>

    <div className='mt-2'>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-1">
          <input 
            type="text" 
            id="name" 
            name="name" 
            defaultValue={profile?.name}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div className='mt-2'>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-1">
          <input 
            type="email" 
            id="email" 
            name="email" 
            defaultValue={profile?.email}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div className='mt-2'>
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
          <div className="mt-1">
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            defaultValue={profile?.phone}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>



    <div className='mt-2'>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
          <div className="mt-1">
          <input 
            type="text" 
            id="address" 
            name="address" 
            defaultValue={profile?.address}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

    <div className='mt-2'>
        <label htmlFor="areagroup" className="block text-sm font-medium leading-6 text-gray-900">Area Group</label>
          <div className="mt-1">
          <select 
            id="areagroup" 
            name="areagroup" 
            defaultValue={profile?.areagroup}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            {areagroup.length > 0 && areagroup.map((item: any,i: number) => {
            return (
            <option key={i} value={item.agname}>{item.agname}</option>
            )}
          )}
            </select>
          </div>
        </div>

        <div className='mt-2'>
        <label htmlFor="enable2fa" className="block text-sm font-medium leading-6 text-gray-900">Enable 2FA (2 Factor Authentifiction)</label>
        <p className='text-gray-600 text-sm py-1'>With 2 factor authentication enabled, a code would be generated and sent to your email address anytime you try to login</p>
          <div className="mt-1">
          <select 
            id="enable2fa" 
            name="enable2fa" 
            defaultValue={profile?.enable2fa}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
           
            </select>
          </div>
        </div>



        <input type="hidden" id="uploadedpic" name="uploadedpic" defaultValue={blob?.url}/>
        <input type="hidden" id="photourl" name="photourl" defaultValue={blob?.url || profile?.photo}/>

    
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
