import React from 'react'
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6"
import './FooterCss.scss'
const Footer = () => {
  return (
    <section id='contact'>
    <div className="og-container">
    <div className="footer-container">
        <div className="footer-left">
            <h4>About Us</h4>
            <p>
                VegeaoN is your trusted destination for farm-fresh, organic vegetables delivered straight to your doorstep.  
                We connect local farmers with conscious consumers to promote a healthier lifestyle.  
                From soil to your plate, we promise freshness, quality, and care in every bite.
            </p>
            <h4>Follow Us On</h4>
            <div className="icons-port">
                 <PiInstagramLogoFill className='icons'/>
                 <FaFacebook className='icons'/>
                 <FaXTwitter className='icons'/>
            </div>
        </div>
        <div className="footer-right">
            <h4>Tabs</h4>
            <nav>
                <ul>
                        <li>
                            <a href="#hero">Menu</a>
                        </li>
                        <li>
                            <a href="#products">Products</a>
                        </li>
                        <li>
                            <a href="#reviews">Reviews</a>
                        </li>
                        <li>
                            <a href="#subscribers">Subscribe</a>
                        </li>
                </ul>
            </nav>
        </div>
    </div>
    <div className="one-last-line">
       <hr className='right-line'/>
       <p>Copyrights &copy; 2025. vegean.com. All Rights Reserved</p>
    </div>
    </div>
    </section>
  )
}

export default Footer