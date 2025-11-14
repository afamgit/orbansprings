"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { updateRequest } from "../utils/actions";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: '',
};

function SubmitButton() {
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

export function CompleteOrderForm({
  req,
  driver,
  fleet,
  transid,
  status,
  customer,
  drivername
}: {
  req: any;
  driver: string;
  fleet: string;
  transid: string;
  status: string;
  customer: string;
  drivername: string;
}) {
  const router = useRouter()
  const updateRequestWithId = updateRequest.bind(null, req.id);
  const [state, formAction] = useActionState(updateRequestWithId, initialState);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null)

  const sendNotification = async ( token: string, title: string, message: string, ord: string, type:string) => {
    const redirectUrl = type === 'exp' ? `exp://192.168.1.4:19000/--/order-details/${ord}` : `orban://order-details/${ord}`

    let data = {
      url: redirectUrl,
    };

    let pushMsgBody = {
            to: token,
            title: `${title}`,
            body: `${message}`,
            data: data,
          }
        

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

    try {

    const postData = {
      "fleet": fleet,
      "transid": transid,
      "driver": driver,
      "drivername": drivername,
      "customer": customer,
    };

    // alert(JSON.stringify(postData));
    // return

    setLoading(true);

    const result = await fetch("/api/orders/order-complete", {
      method: "POST",
      body: JSON.stringify(postData)
    });

    const resultResponse = await result.json();


    setLoading(false);
    if(resultResponse?.status === 200) {
      setMsg(resultResponse?.message)
      router.push(`/account/vendor-merchants/orders/${req}/order-detail?showMessage=y`)

      sendNotification(resultResponse?.token, resultResponse?.pushTitle, resultResponse?.pushMessage, resultResponse?.pushOrd, 'web')
          } else if (resultResponse?.status === 400) {
            setMsg(resultResponse?.message)
      
          }

  } catch(err) {
    setLoading(false)
    alert(JSON.stringify(err))
      console.log(err)
  }
  };

  return (
    <>
      <div className="flex justify-start items-center">
                <button
            type="button"
            onClick={() => doSubmit()}
            aria-disabled={loading}
            className="p-1 bg-blue-300 my-2 rounded"
          >
            {loading ? "Submitting..." : "Order Complete"}
          </button>
      </div>
    </>
  );
}
