"use client";

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
      <div className="w-full md:w-4/5 flex min-h-full bg-white rounded-2xl p-8 flex-col justify-center shadow-xl border border-slate-100">
        {msg !== "" && (
          <div className="my-3">
            <span className="bg-sky-50 border border-sky-200 text-sky-800 rounded-lg px-3 py-2 text-sm">
              {msg}
            </span>
          </div>
        )}

        {errorMsg !== "" && (
          <div className="my-3">
            <span className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-3 py-2 text-sm">
              {errorMsg}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                onChange={updateData}
                required
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone number"
                onChange={updateData}
                required
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                onChange={updateData}
                required
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Inquiry subject"
                onChange={updateData}
                required
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Message</label>
            <textarea
              rows={6}
              id="message"
              name="message"
              placeholder="How can we help you?"
              onChange={updateData}
              required
              className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm resize-none"
            />
          </div>

          <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div
              style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
              className='relative flex justify-center items-center my-2 h-12 w-[110px] bg-[url("https://orbansprings.com/1662869457.png-2.jpeg")] bg-center rounded overflow-hidden shadow-inner'
            >
              <p className="flex justify-center items-center text-center bg-slate-950/80 text-white w-full h-full font-mono font-bold text-xl tracking-widest">
                {randomChars?.toUpperCase()}
              </p>
            </div>
            <label
              className="mb-2 mt-4 block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              htmlFor="textchar"
            >
              Enter the characters shown above
            </label>
            <input
              className="peer block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              id="textchar"
              type="text"
              name="textchar"
              required
              onChange={updateData}
              minLength={5}
              maxLength={5}
              placeholder="Verification code"
            />
          </div>

          <button
            className="w-full py-4 px-8 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            type="submit"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          <p aria-live="polite" className="sr-only">
            {state?.message}
          </p>
        </form>
      </div>
    </>
  );
}
