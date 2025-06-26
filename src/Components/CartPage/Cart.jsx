import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import './cartCss.scss';
import { BsCartCheck } from "react-icons/bs";
import Footer from '../Footer/Footer';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, increment, decrement, removeItem } = useContext(CartContext);
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate()

  const backToHome = () => {
    navigate('/')
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='cart-content'>
      <div className="cart-head">
        <h2>Your Cart <span style={{fontSize:'1.3rem'}}><BsCartCheck/></span></h2>
        <span 
        style={
          {fontSize:'1.3rem',
           padding:'.2rem .3rem',
           borderRadius:'1rem',
           boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
           cursor:'pointer'}}
        onClick={backToHome}   
           >
            <TiArrowBack />
        </span>
      </div>
      
      {cartItems.length === 0 ? (
        <p className='no-items'>No items in cart.</p>
      ) : (
        <>
        <div className="cart-parent">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='cart-items-content'
            >
              <div className="left-cart-item">
                <img src={item.image} alt={item.title} width="100" />
              </div>

              <div className="right-cart-item">
                <h4>{item.title}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              
              <div className='btn-cart-item'>
                  <button onClick={() => decrement(item.id)}>
                    -
                  </button>
                  <button onClick={() => increment(item.id)}>
                    +
                  </button>
                  <button onClick={() => removeItem(item.id)}>
                    remove
                  </button>
              </div>
            </div>
          ))}
          </div> 

          {openPopup ? (
            <div className={`popup-container ${openPopup ? 'show' : ''}`}>
              <div className={`popup-content ${openPopup ? 'show-popup' : ''}`}>
                <p>Are you sure to proceed checkout?</p>
                <button 
                style={{backgroundColor:"rgb(29, 199, 29)"}}
                onClick={()=> navigate('/checkout')}
                >Yes</button>
                <button 
                style={{backgroundColor:"crimson"}}
                onClick={() => {setOpenPopup(false)}}
                >cancel</button>
              </div>
            </div>
          ): null}

          <hr className='cart-hr-line'/>
          <div className='check-container'>
            <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
            <button
            onClick={()=>{setOpenPopup(true)}}
            >
              Checkout
            </button>
          </div>
         
        </>
      )}

      {
        cartItems.length === 0 ? '' : <Footer/>
      }
    </div>
  );
};

export default Cart;
