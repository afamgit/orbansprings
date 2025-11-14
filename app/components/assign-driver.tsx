"use client";

import { useFormStatus } from "react-dom";
import { updateRequest } from "../utils/actions";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: '',
};

function AssignButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      // onClick={() => alert('about to send ooo')}
      className="p-1 bg-blue-300 my-2 rounded"
    >
      {pending ? "Assigning" : "Assign"}
    </button>
  );
}

export function AssignDriverForm({
  req,
  drivers,
  fleet,
  transid,
  status,
  customer,
  commission,
}: {
  req: string;
  drivers: any;
  fleet: string;
  transid: string;
  status: string;
  customer: string;
  commission: number;
}) {
  const router = useRouter();
  const updateRequestWithId = updateRequest.bind(null, req);
  const [state, formAction] = useActionState(updateRequestWithId, initialState);
  const [driver, setDriver] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const sendNotification = async (
    token: string,
    title: string,
    message: string,
    ord: string,
    type: string
  ) => {
    const redirectUrl =
      type === "exp"
        ? `exp://192.168.1.4:19000/--/order-details/${ord}`
        : `orban://order-details/${ord}`;

    let data = {
      url: redirectUrl,
    };

    let pushMsgBody = {
      to: token,
      title: `${title}`,
      body: `${message}`,
      data: data,
    };

    fetch("https://exp.host/--/api/v2/push/send?useFcmV1=true", {
      method: "post",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(pushMsgBody),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doSubmit = async () => {
    if (driver === "") {
      alert(
        "You must select a driver before you can assign one to this request"
      );
      return;
    }

    try {
      setLoading(true);

      const result = await fetch("/api/orders/request-assign", {
        method: "POST",
        body: JSON.stringify({
          id: req,
          driver: driver,
          fleet: fleet,
          transid: transid,
          status: status,
          customer: customer,
          commission: commission,
        }),
      });

      const resultResponse = await result.json();
      setLoading(false);

      if (resultResponse?.status === 200) {
        setMsg(resultResponse?.message);
        
        router.push(`/account/vendor-merchants/requests/${transid}/request-detail?showMessage=y`)
        sendNotification(
          resultResponse?.token,
          resultResponse?.pushTitle,
          resultResponse?.pushMessage,
          resultResponse?.pushOrd,
          "web"
        );
      } else if (resultResponse?.status === 400) {
        setMsg(resultResponse?.message);
      }
    } catch (err) {
      setLoading(false);
      alert(JSON.stringify(err));
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p>{state?.message}</p>

          <select
            id="selectdriver"
            name="selectdriver"
            value={driver}
            required
            onChange={(e) => setDriver(e?.target?.value)}
            className="block w-[150px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select driver...</option>

            {drivers?.length > 0 &&
              drivers.map((item: any, i: number) => {
                return (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="ml-1">
          <button
            onClick={() => doSubmit()}
            aria-disabled={loading}
            className="p-1 bg-blue-300 my-2 rounded"
          >
            {loading ? "Assigning" : "Assign"}
          </button>

          {state?.message && (
            <div className="my-3 py-3">
              <span className="bg-sky-200 text-gray-900 rounded-lg px-4 py-3 text-xl">
                {state?.message}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
