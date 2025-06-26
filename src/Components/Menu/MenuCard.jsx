import React from 'react'
import './menuCardCss.scss'


const MenuCard = ({image,title}) => {
  return (
    <div className="card">
        <img className='card-img' src={image} alt="image1" />
        <div className="card-title">
            <h1 className='veg-name'>{title}</h1>
        </div>
    </div>
  )
}

export default MenuCard