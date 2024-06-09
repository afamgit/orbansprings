'use client'

import React, {useState, useRef} from 'react';
import PaystackButton from './paystack-button';
import { useRouter } from 'next/navigation';

export function PayOrderButtonApp ({name, email, phone, orderid, orderref, amount, redirecturl}) {

  const router = useRouter()
    let btnref = useRef();

const payref = orderref;

const [msg, setMsg] = useState('')
const [errorMsg, setErrorMsg] = useState('')

const publicKey = "pk_live_24315e9e44f2aef9c009d799e937bbfb8f463fb0";

const componentProps = {
    email: email,
    amount: amount * 100,
    reference: orderref,
    metadata: {
      custom_fields: [
        {
            display_name: 'name',
            variable_name: 'name',
            value: name
        },
        {
          display_name: 'phone',
          variable_name: 'phone',
          value: phone
      },
      {
        display_name: 'type',
        variable_name: 'type',
        value: 'Order'
    }
        // To pass extra metadata, add an object with the same fields as above
    ]
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
        setMsg("Payment successful!");
        setTimeout(() => {
            setMsg('');
            router.push(`https://orbansprings.com/${reference}/exp1`)
          },4000);
        // doCardPaymentUpdate(reference);
    },
    onClose: () => alert("Wait! You are yet to complete your payment!"),
  }

  const handleCardPaymentUpdate = (reference) => {
    
  }

  const updateOrder = async (reference) => {

    let formData = new FormData();

    formData.append('order', reference);

    const response = await fetch('/api/orders/paystack-order.php', {
      method:'post',
      body: formData
    })
    const data = await response.json()
    alert(`from update: ${JSON.stringify(data)}`)

    if(data.status === 200) {
      setMsg(res.msg);
      setTimeout(() => {
        setMsg('')
      },6000) 
    } else if(data.status === 400){
      setErrorMsg(res.msg)
        setTimeout(() => {
          setErrorMsg('')
        },5000) 
    }

  }

  const doCardPaymentUpdate = async (reference) => {

    let formData = new FormData();

    formData.append('order', reference);
    formData.append('action', 'verifypayment');

    const response = await fetch('https://support.orbansprings.com/api/paystack.php', {
      method:'post',
      body: formData
    })
    const data = await response.json()
    alert(`from verification: ${JSON.stringify(data)}`)

    if(data.status === 200) {
      setMsg(res.msg);
      updateOrder(reference)
      setTimeout(() => {
        setMsg('')
      },3000) 
    } else if(data.status === 400){
      setErrorMsg(res.msg)
        setTimeout(() => {
          setErrorMsg('')
        },3000) 
    }

  }


    return (
        <div className='p-2 bg-light'>
                    {amount > 0 && <div className='w-[90px] rounded justofy-center content-center bg-sky-500 text-white px-4 py-2'><PaystackButton {...componentProps} /></div>}

                    {/* <p className='py-1 my-1'>{statusMsg}</p> */}
        {/* {msg === 'ok' && btnref.current.click()} */}

        <p className='bg-light my-2 p-2'><a ref={btnref} href={redirecturl === 'exp' ? `exp://192.168.1.4:19000/--/order-details/${payref}` : `orban://order-details/${payref}`}>Exit window</a></p>

        </div>
    )
}
