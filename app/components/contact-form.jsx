"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { sendMessage } from "../utils/actions";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

const messageSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
  textchar: z.string(),
})


const initialState = {
  message: '',
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
  const router = useRouter();

  const [state, formAction] = useActionState(sendMessage, initialState);

  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomChars, setRandomChars] = useState("");

  useEffect(() => {
    setRandomChars(uuidv4().substring(0, 5));
  }, []);

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const parsedData = messageSchema.safeParse(data);

      if (parsedData.data.textchar !== randomChars) {
        setLoading(false);
        setErrorMsg(
          "The characters you entered do not match the random characters"
        );
        return;
      }

      if (!parsedData.success) {
        setLoading(false);
        console.log(parsedData.error);
        setErrorMsg("Contact form validation failed");
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData.data),
      });

      const res = await response.json();

      if (res.status === 400) {
        setLoading(false);
        setMsg(res.message);
      } else {
        const formData = new FormData();

        formData.append("name", parsedData?.data.name);
        formData.append("email", parsedData?.data.email);
        formData.append("phone", parsedData?.data.phone);
        formData.append("subject", parsedData?.data.subject);
        formData.append("message", parsedData?.data.message);
        formData.append("fromname", "Orban Springs");
        formData.append("fromemail", "info@orbansprings.com");
        formData.append("yourchoice", "");
        formData.append("action", "send");

        const result = await fetch(
          "https://support.orbansprings.com/api/client_contact_form.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const resultResponse = await result.json();

        if (resultResponse?.status === 400) {
          setLoading(false);
          setMsg(resultResponse?.msg);
        } else {
          setLoading(false);
          router.push(`/contact-confirmation?msg=${resultResponse?.msg}`);
        }
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  }

  return (
    <>
      <div className="w-full md:w-4/5 flex min-h-full bg-white rounded-lg p-6 flex-col justify-center shadow-md">
        {msg !== "" && (
          <div className="my-3">
            <span className="bg-sky-200 text-gray-900 rounded-lg p-2">
              {msg}
            </span>
          </div>
        )}

{errorMsg !== "" && (
          <div className="my-3">
            <span className="bg-red-500 text-gray-100 rounded-lg p-2">
              {errorMsg}
            </span>
          </div>
        )}

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

          <div className={"my-6"}>
            <div
              style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
              className='relative flex justify-center items-center my-3 h-18 w-[100px] bg-[url("https://orbansprings.com/1662869457.png-2.jpeg")] bg-center'
            >
              <p className="flex justify-center items-center text-center bg-gray-900 opacity-70 text-white px-3 py-2 font-bold text-2xl tracking-widest">
                {randomChars?.toUpperCase()}
              </p>
            </div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="textchar"
            >
              Enter the characters shown above
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="textchar"
                type="text"
                name="textchar"
                required
                onChange={updateData}
                minLength={5}
                maxLength={5}
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
