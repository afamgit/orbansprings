'use client'

import React, {useState, useRef} from 'react';
import PaystackButton from './paystack-button';

export function PayOrderButtonApp ({name, email, phone, orderid, orderref, amount, redirecturl}) {

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
      name: name,
      phone: phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
        setMsg("Thanks for doing business with us! Come back soon!!");
        setTimeout(() => {
            setMsg('');
        },4000);
        doCardPaymentUpdate();
    },
    onClose: () => alert("Wait! You are yet to complete your payment!"),
  }

  const handleCardPaymentUpdate = (reference) => {
      doCardPaymentUpdate();
  }

  const updateOrder = async () => {

    let formData = new FormData();

    formData.append('order', orderref);

    const response = await fetch('/api/orders/paystack-order.php', {
      method:'post',
      body: formData
    })
    const data = await response.json()

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

  const doCardPaymentUpdate = async () => {

    let formData = new FormData();

    formData.append('order', orderref);
    formData.append('action', 'verifypayment');

    const response = await fetch('https://support.orbansprings.com/api/paystack.php', {
      method:'post',
      body: formData
    })
    const data = await response.json()

    if(data.status === 200) {
      setMsg(res.msg);
      updateOrder(orderref)
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
                    <p className='py-1 my-1'>Message {msg}</p>
                    <p className='py-1 my-1'>Error message: {errorMsg}</p>

        <p className='bg-light my-2 p-2'><a ref={btnref} href={redirecturl === 'exp' ? `exp://192.168.1.4:19000/--/order-details/${payref}` : `orban://order-details/${payref}`}>Exit window</a></p>

        </div>
    )
}
