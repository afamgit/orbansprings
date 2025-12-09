"use client";

import { useFormStatus } from "react-dom";
import { updateTruck, createTruck } from "../utils/actions";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
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
      {pending ? 'Saving...' : 'Save New Truck'}
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
      {pending ? 'Updating...' : 'Update Truck'}
    </button>
  );
}


export function AddTruckForm({
  fleet
}: {
  fleet:number
}) {

  const [state, formAction] = useActionState(createTruck, initialState);


  return (
    <>
      <div className="w-full flex-col justify-start px-4 bg-white">
      <div className="flex justify-start items-center">
              <Link className="text-gray-900 mr-2" href="/account/vendor-merchants/fleet">
                <FaChevronLeft size={24} className="outline-0" />
              </Link>

        <h2 className="text-3xl">Add New Truck</h2>
        </div>

        {state?.message && (
          <div className="my-3 py-3">
            <span className="bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl">
              {state?.message}
            </span>
          </div>
        )}

        <div className="w-full md:w-[1000px] mt-6 mx-auto rounded-lg border-2 border-gray-200 shadow-lg p-5">
          <div className="my-4">
            <h2 className="text-2xl">Basic Details</h2>
            <p>Input basic details of the truck you would like to add</p>
          </div>
          

          <form action={formAction}>
          <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Truck Brand *</legend>
                <input
                  type="text"
                  id="truckbrand"
                  name="truckbrand"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Plate Number *</legend>

                <input
                  type="text"
                  id="plateno"
                  name="plateno"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Meter ID *</legend>
                <input
                  type="text"
                  id="meter"
                  name="meter"
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Assigned Driver *</legend>

                <input
                  type="text"
                  id="driver"
                  name="driver"
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <input
              type="hidden"
              id="fleet"
              name="fleet"
              defaultValue={fleet}
            />

<div className="flex justify-end items-center">
  <Link
  href={`/account/vendor-merchants/fleet`}
      type="button"
      className="p-2 border-2 border-red-500 rounded-lg text-red-500 mr-3"
    >
      Cancel
    </Link>
<SubmitButton />
</div>
            <p aria-live="polite" className="sr-only">
              {state?.message}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}


export function UpdateTruckForm({
  truck,
  fleet
}: {
  truck: any;
  fleet:number;
}) {

  const updateTruckWithId = updateTruck.bind(null, truck?.truckid);
  const [state, formAction] = useActionState(updateTruckWithId, initialState);

  
  return (
    <>
      <div className="w-full flex-col justify-start px-4 bg-white">
      <div className="flex justify-start items-center">
              <Link className="text-gray-900 mr-2" href="/account/vendor-merchants/fleet">
                <FaChevronLeft size={24} className="outline-0" />
              </Link>

        <h2 className="text-3xl">Update Truck</h2>
        </div>

        {state?.message && (
          <div className="my-3 py-3">
            <span className="bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl">
              {state?.message}
            </span>
          </div>
        )}

        <div className="w-full md:w-[1000px] mt-6 mx-auto rounded-lg border-2 border-gray-200 shadow-lg p-5">

          <div className="my-4">
            <h2 className="text-2xl">Basic Details</h2>
            <p>Input basic details of the truck you would like to update</p>
          </div>
          

          <form action={formAction}>
            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Truck Brand *</legend>
                <input
                  type="text"
                  id="truckbrand"
                  name="truckbrand"
                  defaultValue={truck?.truck_make}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Plate Number *</legend>

                <input
                  type="text"
                  id="plateno"
                  name="plateno"
                  defaultValue={truck?.truck_plateno}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Meter ID *</legend>
                <input
                  type="text"
                  id="meter"
                  name="meter"
                  defaultValue={truck?.truck_meterid}
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Assigned Driver *</legend>

                <input
                  type="text"
                  id="driver"
                  name="driver"
                  defaultValue={truck?.truck_driver}
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Status *</legend>
                <select
                  id="status"
                  name="status"
                  defaultValue={truck?.truck_status}
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                  </select>
                </fieldset>
            </div>

            <input
              type="hidden"
              id="fleet"
              name="fleet"
              defaultValue={fleet}
            />


<div className="flex justify-end items-center">
  <Link
  href={`/account/vendor-merchants/fleet`}
      type="button"
      className="p-2 border-2 border-red-500 rounded-lg text-red-500 mr-3"
    >
      Cancel
    </Link>
<EditButton />
</div>
            <p aria-live="polite" className="sr-only">
              {state?.message}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
