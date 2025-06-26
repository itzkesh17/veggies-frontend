import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import './checkoutCss.scss';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ORDER_API } from '../../register-page/API';
import { UserContext } from '../Context/UserContext';

const Checkout = () => {
  const { cartItems,clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext)

  const [step, setStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', email: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', holder: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [errors, setErrors] = useState({});

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const navigate = useNavigate()

  const backToCart = () => {
    navigate('/cart')
  }

  const nextStep = () => {
    if (step === 1) {
      const err = {};

      if (!deliveryInfo.name.trim()) err.name = 'Name is required';

      const emailTrimmed = deliveryInfo.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailTrimmed) {
        err.email = 'Email is required';
      } else if (!emailRegex.test(emailTrimmed)) {
        err.email = 'Enter a valid email address';
      }

      const phoneTrimmed = deliveryInfo.phone.trim();
      if (!phoneTrimmed) {
        err.phone = 'Phone is required';
      } else if (!/^\d{10}$/.test(phoneTrimmed)) {
        err.phone = 'Phone must be exactly 10 digits';
      }

      const addressTrimmed = deliveryInfo.address.trim();
      if (!addressTrimmed) {
        err.address = 'Address is required';
      } else if (addressTrimmed.length < 10) {
        err.address = 'Address must be at least 10 characters';
      }

      setErrors(err);
      setTimeout(()=>{
        setErrors({});
      },2000)
      
      if (Object.keys(err).length === 0) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleDeliveryChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
  const err = {};

  if (!paymentMethod) err.payment = 'Select a payment method';
  if (paymentMethod === 'method') err.payment = 'Select a payment method';

  if (paymentMethod === 'card') {
    if (!cardDetails.number) err.cardNumber = 'Card number is required';
    if (!cardDetails.holder) err.holder = 'Card holder name is required';
    if (!cardDetails.expiry) err.expiry = 'Expiry is required';
    if (!cardDetails.cvv) err.cvv = 'CVV is required';
  }

  if (paymentMethod === 'upi' && !upiId) err.upi = 'UPI ID is required';
  if (paymentMethod === 'netbanking' && !bankName) err.bank = 'Bank name is required';

  setErrors(err);
  setTimeout(() => setErrors({}), 2000);
  if (Object.keys(err).length > 0) return;

  const orderData = {
    userId: user._id,
    deliveryInfo,
    cartItems,
    totalAmount,
    paymentMethod,
    paymentDetails: {
      cardDetails: paymentMethod === 'card' ? cardDetails : {},
      upiId: paymentMethod === 'upi' ? upiId : '',
      bankName: paymentMethod === 'netbanking' ? bankName : ''
    }
  };

  try {
    await axios.post(ORDER_API, orderData); 
    Swal.fire({
      title: '🎉 Order Placed!',
      text: 'Your order has been placed successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      clearCart();
      navigate('/');
    });
  } catch (error) {
    console.error("Order submission failed", error);
    Swal.fire("Error", "Failed to place order. Try again.", "error");
  }
};


  return (
    <>
    <div className="checkout-container">
        <div className="checkout-head">
            <h2>Checkout</h2>
            <span 
            style={
                {fontSize:'1.3rem',
                padding:'.2rem .3rem',
                borderRadius:'1rem',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                cursor:'pointer'}}
            onClick={backToCart}   
                >
                <TiArrowBack />
            </span>
        </div>
      
      <div className="step-progress">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="circle">{step > 1 ? '✔' : '1'}</div>
          <p className='step-title'>Delivery Info</p>
        </div>
        <div className={`line ${step >= 2 ? 'active' : ''}`}></div>

        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="circle">{step > 2 ? '✔' : '2'}</div>
          <p className='step-title'>Summary</p>
        </div>
        <div className={`line ${step >= 3 ? 'active' : ''}`}></div>

        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <div className="circle">{step === 3 ? '3' : ''}</div>
          <p className='step-title'>Payment</p>
        </div>
      </div>

      {step === 1 && (
        <form className="delivery-info" autoComplete='off' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <input type="text" name="name" placeholder="Full Name" value={deliveryInfo.name} onChange={handleDeliveryChange} />
          <span className="error">{errors.name}</span>

          <input type="text" name="email" placeholder="Email" value={deliveryInfo.email} onChange={handleDeliveryChange} />
          <span className="error">{errors.email}</span>

          <input type="number" name="phone" placeholder="Phone Number" value={deliveryInfo.phone} onChange={handleDeliveryChange} />
          <span className="error">{errors.phone}</span>

          <textarea name="address" placeholder="Address" value={deliveryInfo.address} onChange={handleDeliveryChange} />
          <span className="error">{errors.address}</span>

          <button type="submit">Continue</button>
        </form>
      )}

      {step === 2 && (
        <div className="order-summary">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
          <div className="summary-btn">
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Proceed to Payment</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="payment-section" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
          
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="method" style={{width:'80%'}}>Select Payment Method</option>
            <option value="card" style={{width:'80%'}}>Credit/Debit Card</option>
            <option value="upi" style={{width:'80%'}}>UPI</option>
            <option value="netbanking" style={{width:'80%'}}>Net Banking</option>
            <option value="cod" style={{width:'80%'}}>Cash on Delivery</option>
          </select>
          
          <span className="error">{errors.payment}</span>

          {paymentMethod === 'method' && (
            <div className="method-form" style={{width:'100%'}}>
              <img src="/assets/payment-method.png" alt="methods" style={{width:'100%'}}/>
            </div>
          )}


          {paymentMethod === 'card' && (
            <div className="card-form">
              <img src="/assets/card.png" alt="card" />
              <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
              <span className="error">{errors.cardNumber}</span>

              <input type="text" placeholder="Card Holder Name" value={cardDetails.holder} onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })} />
              <span className="error">{errors.holder}</span>

              <input type="text" placeholder="Expiry Date (MM/YY)" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
              <span className="error">{errors.expiry}</span>

              <input type="password" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
              <span className="error">{errors.cvv}</span>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="upi-form">
              <img src='/assets/UPI-Logo.png' alt="logo" />
              <input type="text" placeholder="Enter your UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
              <span className="error">{errors.upi}</span>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="bank-form">
              <img src="assets/net banking.jpg" alt="netbanking" />
              <input type="text" placeholder="Enter your Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
              <span className="error">{errors.bank}</span>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="cod-form">
              <img src="assets/cash.webp" alt="cod" />
            </div>
          )}

          <div className="payment-btn">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit" >
             Place Order
            </button>
          </div>
          
        </form>
      )}
    </div>
    <Footer />
    </>
  );
};


export default Checkout;
