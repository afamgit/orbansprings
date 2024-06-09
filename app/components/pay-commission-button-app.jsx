'use client'

import React, {useState, useRef} from 'react';
import PaystackButton from './paystack-button';

export function PayCommissionButtonApp ({name, email, phone, userid, paymentref, outstanding, redirecturl}) {

    let btnref = useRef();

const payref = paymentref;

const [order, setOrder] = useState(null)
const [msg, setMsg] = useState('')
const [errorMsg, setErrorMsg] = useState('')

const publicKey = "pk_live_24315e9e44f2aef9c009d799e937bbfb8f463fb0";

const componentProps = {
    email: email,
    amount: outstanding * 100,
    reference: paymentref,
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

  const doCardPaymentUpdate = () => {

    let formData = new FormData();

    formData.append('user', userid);
    formData.append('action', 'cardupdatecommission');

    fetch(`https://support.orbansprings.com/api/orders.php`, {
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
                    {user && user.commissions_outstanding > 0 && <div className='w-[90px] rounded justofy-center content-center bg-sky-500 text-white px-4 py-2'><PaystackButton {...componentProps} /></div>}

                    {/* <p className='py-1 my-1'>{statusMsg}</p> */}
        {msg === 'ok' && btnref.current.click()}

        <p className='bg-light my-2 p-2'><a ref={btnref} href={redirecturl === 'exp' ? `exp://192.168.1.4:19000/--/order-details/${payref}` : `orban://order-details/${payref}`}>Exit window</a></p>

        </div>
    )
}
