"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createProductPrices, updateProductPrice } from "../utils/actions";
import { areas } from "../utils/data";
import { useActionState } from "react";

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="p-2 bg-blue-300 rounded"
    >
      Add
    </button>
  );
}

function GeneratePricesButton( {label}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="p-2 bg-blue-300 my-2 rounded"
    >
      {pending ? `Generating ${label}` : `Generate ${label}`} 
    </button>
  );
}

function EditButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="p-2 bg-blue-300 rounded"
    >
      {pending ? `Updating...` : `Update`} 
    </button>
  );
}

export function UpdateProductPriceForm({ productid, ppriceid, amount }) {
  const updateProductPriceWithId = updateProductPrice.bind(null, ppriceid);
  const [state, formAction] = useActionState(updateProductPriceWithId, initialState);

  return (
    <>
      <div className="flex flex-col justify-center py-2 px-3">
       
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction}>
          <div className="w-full flex justofy-between items-center">
            <input
                    id="productid"
                    name="productid"
                    type="hidden"
                    value={productid}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
             
        
                <input
                  type="text"
                  id="amount"
                  defaultValue={amount}
                  name="amount"
                  required
                  className="block w-[60px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />


            <EditButton />
            <p aria-live="polite" className="sr-only">
              {state?.message}
            </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export function ProductPricesGenerateForm({productid, subscriptiontype}) {
  const [state, formAction] = useFormState(createProductPrices, initialState);

  return (
    <>
      <div className="flex justify-center px-4">
       

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction}>
            <div className="w-full flex">
            <input
                    id="productid"
                    name="productid"
                    type="hidden"
                    value={productid}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
             

            <input
                    id="subscriptiontype"
                    name="subscriptiontype"
                    type="hidden"
                    value={subscriptiontype}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />

            </div>

            <GeneratePricesButton label={subscriptiontype} />
            <p aria-live="polite" className="sr-only">
              {state?.message}
            </p>
          </form>
        </div>
      </div>
    </>
  );
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
