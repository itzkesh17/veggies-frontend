import React, { useState } from 'react'
import './SubscribeCss.scss'
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subscribe = () => {

  const [mainInput, setMainInput] = useState('');
  const emailCondition = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const emailInput = (e) => {
    e.preventDefault();

    if(mainInput.trim === ''){
      toast.error("Email is required",  { transition: Zoom })
    }
    else if(!emailCondition.test(mainInput)){
      toast.error("Enter a valid email", { transition: Zoom })
    }
    else{
      toast.success(`Thanks for Subscribing!`, { transition: Zoom });
      setMainInput('')
    }
  }

  return (
    <section id='subscribers'>
    <div className="subscribe-container">
        <h4>Special offer for Subscribers</h4>
        <h2>Ten Percent Member Discount</h2>
        <p>Subscribe to our newsletters now and stay up to date with new exclusive offers.</p>
        <div className="input-container">
          <form onSubmit={emailInput}>
           <input 
            type="text" 
            placeholder='Email Address'
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            />
            <button>Subscribe</button>
          </form>
        </div>
    </div>
    </section>
  )
}

export default Subscribe