import React from 'react'
import './heroCss.scss'
import image from '../../assets/women-hold-veggies.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section id='hero'>
    <div className="big-container">

        <div className="left-container">
            <h1>Rooted In Quality, Grown With Love.</h1>
            <p>Freshness You Can Taste & <br /> Quality You Can Trust & Elevate Your Meals with the Best Veggies Nature Has to Offer.</p>
            <button
            onClick={()=> navigate('/products')}
            >Purchase</button>
        </div>

        <div className="right-container">
           <img 
           src={image} 
           alt="women holds veggies" 
           />
        </div>
    </div>
    </section>
  )
}

export default Hero