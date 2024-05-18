"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { sendMessage } from "../utils/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();

setLoading(true)



    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("subject", subject);
      formData.append("message", message);
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
        setMsg(resultResponse.message);
        setLoading(false);
      } else {
        setLoading(false);
        router.push(`/contact-confirmation?msg${resultResponse.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  };

  return (
    <>
      <div className="w-full md:w-4/5 flex min-h-full bg-white rounded-lg p-6 flex-col justify-center shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 my-3">
            <div className="rounded">
              <div className="mt-2 border-2 border-gray-200">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={(event) => setName(event.target.value)}
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
                  onChange={(event) => setPhone(event.target.value)}
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
                  onChange={(event) => setEmail(event.target.value)}
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
                  onChange={(event) => setSubject(event.target.value)}
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
                onChange={(event) => setMessage(event.target.value)}
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
