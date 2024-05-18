"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { sendMessage } from "../utils/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import z from 'zod';

const messageSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters'),
  email: z.string().email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
})

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="p-2 bg-blue-800 text-white rounded my-3 "
    >
      {pending ? "Sending message..." : "Send Message"}
    </button>
  );
}

export function ContactForm() {

  const router = useRouter()

  const [state, formAction] = useFormState(sendMessage, initialState);

  const [data, setData] = useState({});
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const updateData = (e) => {
    setData({
        ...data, [e.target.name]: e.target.value
    })
}

  async function handleSubmit(event) {
    event.preventDefault();

setLoading(true)

    try {
      const parsedData = messageSchema.safeParse(data)

      if (!parsedData.success) {
          console.log(parsedData.error);
          setErrorMsg('Contact form validation failed')
          return
  }

      const response = await fetch(
        '/api/contact',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData.data)
    })

      const res = await response.json();

      if(res.status === 400) {
        setMsg(res.message) 
    } else {
      const formData = new FormData();

formData.append("name", parsedData.name);
formData.append("email", parsedData.email);
formData.append("phone", parsedData.phone);
formData.append("subject", parsedData.subject);
formData.append("message", parsedData.message);
formData.append("fromname", "Orban Springs");
formData.append("fromemail", "info@orbansprings.com");
formData.append("yourchoice", '');
formData.append("action", "send");

      const result = await fetch(
        "https://justwebservices.com/api/client_contact_form.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const resultResponse = await result.json();

      if (resultResponse?.status === 400) {
        setMsg(resultResponse?.msg);
        setLoading(false);
      } else {
        setLoading(false);
        router.push(`/contact-confirmation?msg=${resultResponse?.msg}`);
      }
    }
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  };

  return (
    <>
      <div className="w-full md:w-4/5 flex min-h-full bg-white rounded-lg p-6 flex-col justify-center shadow-md">

      {msg !== '' && <div className='my-3 py-3'>
                  <span className='bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl'>{msg}</span>
                  </div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 my-3">
            <div className="rounded">
              <div className="mt-2 border-2 border-gray-200">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={updateData}
                  required
                  className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="rounded">
              <div className="mt-2 border-2 border-gray-200">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={updateData}
                  required
                  className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 my-3">
            <div className="rounded">
              <div className="mt-2 border-2 border-gray-200">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={updateData}
                  required
                  className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="rounded">
              <div className="mt-2 border-2 border-gray-200">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  onChange={updateData}
                  required
                  className="block h-[40px] w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mt-2 border-2 border-gray-200">
              <textarea
                type="text"
                rows={10}
                id="message"
                name="message"
                placeholder="Message"
                onChange={updateData}
                required
                className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button
            className="p-2 bg-blue-800 text-white rounded my-3"
            type="submit"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          <p aria-live="polite" className="sr-only">
            {state?.message}
          </p>
        </form>
      </div>
    </>
  );
}
