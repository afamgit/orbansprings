'use client'

import React, {useState, useRef} from 'react';
import { PaystackButton } from 'react-paystack';

export function PayCommissionButtonApp (user, redirecturl) {

    let btnref = useRef();

const userid = user.id;

const [msg, setMsg] = useState('')
const [errorMsg, setErrorMsg] = useState('')

const publicKey = "pk_live_24315e9e44f2aef9c009d799e937bbfb8f463fb0";

const componentProps = {
    email: user.email,
    amount: user.commissions_outstanding * 100,
    reference: user.commission_payment_ref,
    metadata: {
      name: user.name,
      phone: user.phone,
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

  const doCardPaymentUpdate = () => {

    let formData = new FormData();

    formData.append('user', userid);
    formData.append('action', 'cardupdatecommission');

    fetch(`${apiUrl}/api/orders.php`, {
      method:'post',
      body: formData
    }).then((res) => {
        return res.json()
    }).then((res) => {
      if(res.status === 200) {
        setUser(res.userdetail);
        setMsg(res.msg);
        setTimeout(() => {
          setMsg('')
        },6000)  
      } else if (res.status === 400) {
        setErrorMsg(res.msg)
        setTimeout(() => {
          setErrorMsg('')
        },5000)  
      }
    }).catch((err) => {
        console.log(err)
    })
  }


    return (
        <div className='p-2 bg-light'>
                    {user && user.commissions_outstanding > 0 && <PaystackButton {...componentProps} />}

                    <p className='py-1 my-1'>{statusMsg}</p>
        {msg === 'ok' && btnref.current.click()}

        <p className='bg-light my-2 p-2'><a ref={btnref} href={redirecturl === 'exp' ? `exp://192.168.1.4:19000/--/Home?paymentref=${payref}` : `orban://Home?paymentref=${payref}`}>Exit window</a></p>

        </div>
    )
}