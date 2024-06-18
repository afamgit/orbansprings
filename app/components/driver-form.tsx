"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { updateDriver, createDriver } from "../utils/actions";
import { useRef, useState } from "react";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="p-2 bg-blue-300 rounded"
    >
      {pending ? 'Saving...' : 'Save New Driver'}
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
      {pending ? 'Updating...' : 'Update Driver'}
    </button>
  );
}


export function AddDriverForm({
  areagroup,
  fleet
}: {
  areagroup: any;
  fleet:number
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const [state, formAction] = useFormState(createDriver, initialState);


  return (
    <>
      <div className="w-full flex-col justify-start px-4 bg-white">
      <div className="flex justify-start items-center">
              <Link className="text-gray-900 mr-2" href="/account/vendor-merchants/drivers">
                <FaChevronLeft size={24} className="outline-0" />
              </Link>

        <h2 className="text-3xl">Add New Driver</h2>
        </div>

        {state?.message && (
          <div className="my-3 py-3">
            <span className="bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl">
              {state?.message}
            </span>
          </div>
        )}

        <div className="w-full md:w-[1000px] mt-6 mx-auto rounded-lg border-2 border-gray-200 shadow-lg p-5">
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              if (!inputFileRef.current?.files) {
                throw new Error("No file selected");
              }

              const file = inputFileRef.current.files[0];

              const formData = new FormData();

              formData.append("file", file);
              formData.append("action", "upload");

              const response = await fetch(
                "https://support.orbansprings.com/api/upload_file.php",
                {
                  method: "POST",
                  body: formData,
                }
              );

              // const newBlob = (await response.json()) as PutBlobResult;
              const newBlob = await response.json();

              setBlob(newBlob);
            }}
          >
            {blob && (
              <Image
                height={200}
                width={200}
                src={`${blob?.url}`}
                alt={''}
                className="rounded-full h-[100px] w-[100px] mb-4"
              />
            )}

            <input name="file" ref={inputFileRef} type="file" />
            <button
              className="mt-3 bg-gray-600 text-white rounded px-3 py-1"
              type="submit"
            >
              Upload
            </button>
          </form>


          <div className="my-4">
            <h2 className="text-2xl">Basic Details</h2>
          </div>
          

          <form action={formAction}>
            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">First Name *</legend>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Last Name *</legend>

                <input
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Email *</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Phone *</legend>

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Address *</legend>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Area Group *</legend>

                <select
                  id="areagroup"
                  name="areagroup"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {areagroup.length > 0 &&
                    areagroup.map((item: any, i: number) => {
                      return (
                        <option key={i} value={item.agname}>
                          {item.agname}
                        </option>
                      );
                    })}
                </select>
                </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Truck No *</legend>
                <input
                  type="text"
                  id="truckno"
                  name="truckno"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Truck Volume *</legend>

                <input
                  type="text"
                  id="truckvol"
                  name="truckvol"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <input
              type="hidden"
              id="photourl"
              name="photourl"
              defaultValue={blob?.url}
            />

            <input
              type="hidden"
              id="fleet"
              name="fleet"
              defaultValue={fleet}
            />

<div className="flex justify-end items-center">
  <Link
  href={`/account/vendor-merchants/drivers`}
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


export function UpdateDriverForm({
  driver,
  areagroup,
  fleet
}: {
  driver: any;
  areagroup: any;
  fleet:number;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const updateDriverWithId = updateDriver.bind(null, driver?.id);
  const [state, formAction] = useFormState(updateDriverWithId, initialState);

  const driverImg = driver?.photo?.includes("https")
    ? driver.photo
    : `https://support.orbansprings.com/${driver.photo}`;

  return (
    <>
      <div className="w-full flex-col justify-start px-4 bg-white">
      <div className="flex justify-start items-center">
              <Link className="text-gray-900 mr-2" href="/account/vendor-merchants/drivers">
                <FaChevronLeft size={24} className="outline-0" />
              </Link>

        <h2 className="text-3xl">Update Driver</h2>
        </div>

        {state?.message && (
          <div className="my-3 py-3">
            <span className="bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl">
              {state?.message}
            </span>
          </div>
        )}

        <div className="w-full md:w-[1000px] mt-6 mx-auto rounded-lg border-2 border-gray-200 shadow-lg p-5">
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              if (!inputFileRef.current?.files) {
                throw new Error("No file selected");
              }

              const file = inputFileRef.current.files[0];

              const formData = new FormData();

              formData.append("file", file);
              formData.append("action", "upload");

              const response = await fetch(
                "https://support.orbansprings.com/api/upload_file.php",
                {
                  method: "POST",
                  body: formData,
                }
              );

              // const newBlob = (await response.json()) as PutBlobResult;
              const newBlob = await response.json();

              setBlob(newBlob);
            }}
          >
            {blob && (
              <Image
                height={200}
                width={200}
                src={`${blob?.url}`}
                alt={driver?.name}
                className="rounded-full h-[100px] w-[100px] mb-4"
              />
            )}

            <input name="file" ref={inputFileRef} type="file" />
            <button
              className="mt-3 bg-gray-600 text-white rounded px-3 py-1"
              type="submit"
            >
              Upload
            </button>
          </form>

          <Image
            height={300}
            width={300}
            src={`${driverImg}`}
            alt={driver?.title}
            className="rounded-full h-[200px] w-[200px] mt-6"
          />

          <div className="my-4">
            <h2 className="text-2xl">Basic Details</h2>
            <p>Input basic details of the driver you would like to add</p>
          </div>
          

          <form action={formAction}>
            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">First Name *</legend>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  defaultValue={driver?.first_name}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Last Name *</legend>

                <input
                  type="text"
                  id="lname"
                  name="lname"
                  defaultValue={driver?.last_name}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Email *</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={driver?.email}
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Phone *</legend>

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={driver?.phone}
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Address *</legend>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={driver?.address}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Area Group *</legend>

                <select
                  id="areagroup"
                  name="areagroup"
                  defaultValue={driver?.areagroup}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {areagroup.length > 0 &&
                    areagroup.map((item: any, i: number) => {
                      return (
                        <option key={i} value={item.agname}>
                          {item.agname}
                        </option>
                      );
                    })}
                </select>
                </fieldset>
            </div>

            <div className="w-full md:flex justify-between items-between my-5">
            <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Truck No *</legend>
                <input
                  type="text"
                  id="truckno"
                  name="truckno"
                  defaultValue={driver?.drv_vehicle_license_plate_no}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </fieldset>
              <fieldset className="mt-5 w-[100%] md:w-[48%] relative">
            <legend className="mt-[-15px] ml-5 px-2 bg-white z-20 absolute">Truck Volume *</legend>

                <input
                  type="text"
                  id="truckvol"
                  name="truckvol"
                  defaultValue={driver?.drv_vehicle_capacity}
                  required
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

            <input
              type="hidden"
              id="uploadedpic"
              name="uploadedpic"
              defaultValue={blob?.url}
            />
            <input
              type="hidden"
              id="photourl"
              name="photourl"
              defaultValue={blob?.url || driver?.photo}
            />

<div className="flex justify-end items-center">
  <Link
  href={`/account/vendor-merchants/drivers`}
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
