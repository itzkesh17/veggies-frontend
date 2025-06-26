import React from 'react'
import './FeedbackCardCss.scss'
import { TiTick } from "react-icons/ti";



const FeedbackCards = ({img,name,desc}) => {
    
  return (
    <div className="feedback-card">
        <img src={img} alt="customer1" />
        <h5>{name}</h5>
        <p>{desc}</p>
        <TiTick className='star-icon'/>
    </div>
  )
}

export default FeedbackCards