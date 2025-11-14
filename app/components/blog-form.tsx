'use client'
 
import { PutBlobResult } from '@vercel/blob';
import React, { useState, useRef, useActionState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateArticle, createArticle } from '../utils/actions'
 
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const initialState = {
  message: '',
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

 

export function AddBlogForm() {

  const [content, setContent] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const createArticleWithContent = createArticle.bind(null, content)

    const [state, formAction] = useActionState(createArticleWithContent, initialState)


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
        Add Article
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
            id="category" 
            name="category" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Company'>Company</option>
            <option value='General'>General</option>
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

        <div>
          <h2>Author</h2>
          <div className="mt-2">
          <input 
            type="text" 
            id="author" 
            name="author" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">Source</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="source" 
            name="source" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="source_url" className="block text-sm font-medium leading-6 text-gray-900">Source Url</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="source_url" 
            name="source_url" 
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


        <div>
        <label htmlFor="caption" className="block text-sm font-medium leading-6 text-gray-900">Caption</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="caption" 
            name="caption" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="mkeys" className="block text-sm font-medium leading-6 text-gray-900">Meta keys</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="mkeys" 
            name="mkeys" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="mdesc" className="block text-sm font-medium leading-6 text-gray-900">Meta description</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="mdesc" 
            name="mdesc" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="date_published" className="block text-sm font-medium leading-6 text-gray-900">Date published</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="date_published" 
            name="date_published" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>


        <div>
              <div className="flex gap-4 my-3">
                <div className="flex items-center">
                  <input
                    id="draft"
                    name="status"
                    type="radio"
                    value="Draft"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="no"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Draft
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="published"
                    name="status"
                    type="radio"
                    value="Published"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="no"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Published
                  </label>
                </div>
              </div>
            </div>

            {/* <input type="hidden" id="uploadedpic" name="uploadedpic" value={blob?.url}/> */}

    
        <SubmitButton />
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>

      
      </div>
                <div className='w-1/5'>
                  
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
              height={550}
              width={400}
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


</>
)
  }
  
  export function UpdateBlogForm({blog}: {blog: any}) {

    const [content, setContent] = useState(blog?.fullcontent);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
  

   const updateArticleWithId = updateArticle.bind(null, blog?.artid, content)
   const [state, formAction] = useActionState(updateArticleWithId, initialState)



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
                  Update article
                </h2>
      
                <p>{state?.message}</p>


              <div className="w-full md:flex mt-6 mx-auto">
                <div className='w-4/5 px-4'>

    <form action={formAction}>

    <div>
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <select 
            id="category" 
            name="category" 
            defaultValue={blog?.artcategory}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='Company'>Company</option>
            <option value='General'>General</option>
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
            defaultValue={blog?.title}
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


        <div>
        <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">Author</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="author" 
            name="author" 
            defaultValue={blog?.author}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">Source</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="source" 
            name="source" 
            defaultValue={blog?.artsource}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="source_url" className="block text-sm font-medium leading-6 text-gray-900">Source Url</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="source_url" 
            name="source_url" 
            defaultValue={blog?.artsource_url}
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
            defaultValue={blog?.artphotourl}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>


        <div>
        <label htmlFor="caption" className="block text-sm font-medium leading-6 text-gray-900">Caption</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="caption" 
            name="caption" 
            defaultValue={blog?.artphotocaption}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="mkeys" className="block text-sm font-medium leading-6 text-gray-900">Meta keys</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="mkeys" 
            name="mkeys" 
            defaultValue={blog?.mkeys}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="mdesc" className="block text-sm font-medium leading-6 text-gray-900">Meta description</label>
          <div className="mt-2">
          <textarea 
            rows={2}
            id="mdesc" 
            name="mdesc" 
            defaultValue={blog?.mdesc}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="date_published" className="block text-sm font-medium leading-6 text-gray-900">Date published</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="date_published" 
            name="date_published" 
            defaultValue={blog?.published_date}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>



        <div>
              <div className="flex gap-4 my-3">
                <div className="flex items-center">
                  <input
                    id="draft"
                    name="status"
                    type="radio"
                    value="Draft"
                    defaultChecked={blog?.artstatus === "Draft"}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="no"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Draft
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="published"
                    name="status"
                    type="radio"
                    value="Published"
                    defaultChecked={blog?.artstatus === "Published"}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="no"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Published
                  </label>
                </div>
              </div>
            </div>



        <input type="hidden" id="hits" name="hits" defaultValue={blog?.views}/>
        <input type="hidden" id="uploadedpic" name="uploadedpic" defaultValue={blob?.url}/>

    
        <EditButton />
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>
                <div className='w-1/5'>
                  
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
              height={550}
              width={400}
              src={`${blob?.url}`}
              alt={blog?.title}
              className='rounded-lg h-[100px] mb-4'
            />}

        <input name="file" ref={inputFileRef} type="file" />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>

      <Image
              height={220}
              width={200}
              src={`${blog?.artphoto}`}
              alt={blog?.title}
              className='rounded-lg h-[200px] mt-4'
            />
      </div>

  




    </div> </div>
          
       
    </>

    )
  }
