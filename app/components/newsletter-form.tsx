'use client'
 
import { PutBlobResult } from '@vercel/blob';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateArticle, createArticle, createNewsletter, updateNewsletter } from '../utils/actions'
 
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 my-3 rounded'>
      {pending ? 'Submitting...' : 'Add'}
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 my-3 rounded'>
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}

 

export function AddNewsletterForm({username}: {username: string}) {

  const [content, setContent] = useState('');

  const createNewsletterWithContent = createNewsletter.bind(null, content)

    const [state, formAction] = useFormState(createNewsletterWithContent, initialState)


  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };


  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];


  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };
   
    return (
      <>

<div className="w-full md:w-[950px] flex-col justify-start px-4">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add Newsletter
      </h2>

      <p>{state?.message}</p>
    </div>

    <div className="w-full md:flex mt-6 mx-auto">
                <div className='px-4'>

    <form action={formAction}>
        <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
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
        <label htmlFor="story" className="block text-sm font-medium leading-6 text-gray-900">Newsletter body</label>

          <div className="h-full md:w-[100%]">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] mt-2 bg-white"
          />
        </div>
        </div>

            <input type="hidden" id="postedby" name="postedby" value={username}/>

    
        <SubmitButton />
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>

      
      </div>
    </div>
  </div>


</>
)
  }
  
  export function UpdateNewsletterForm({newsletter}: {newsletter: any}) {

    const [content, setContent] = useState(newsletter?.nlb_story);  

   const updateNewsletterWithId = updateNewsletter.bind(null, newsletter?.nlb_id, content)
   const [state, formAction] = useFormState(updateNewsletterWithId, initialState)



   const quillModules = {
     toolbar: [
       [{ header: [1, 2, 3, false] }],
       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
       [{ list: 'ordered' }, { list: 'bullet' }],
       ['link', 'image'],
       [{ align: [] }],
       [{ color: [] }],
       ['code-block'],
       ['clean'],
     ],
   };
 
 
   const quillFormats = [
     'header',
     'bold',
     'italic',
     'underline',
     'strike',
     'blockquote',
     'list',
     'bullet',
     'link',
     'image',
     'align',
     'color',
     'code-block',
   ];
 
 
   const handleEditorChange = (newContent: string) => {
     setContent(newContent);
   };
 

   return (
    <>

                <div className="w-full md:w-[950px] flex-col justify-start px-4">
               
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update newsletter
                </h2>
      
                <p>{state?.message}</p>


              <div className="w-full md:flex mt-6 mx-auto">
                <div className='w-4/5 px-4'>

    <form action={formAction}>

        <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="title" 
            name="title" 
            defaultValue={newsletter?.nlb_title}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="story" className="block text-sm font-medium leading-6 text-gray-900">Story</label>

          <div className="h-full md:w-[100%]">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] mt-2 bg-white"
          />
        </div>

        </div>


        <input type="hidden" id="finished" name="finished" defaultValue={newsletter?.nlb_finished}/>
        <input type="hidden" id="postedby" name="postedby" defaultValue={newsletter?.nlb_postedby}/>

    
        <EditButton />
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>

    </div> </div>
          
       
    </>

    )
  }
